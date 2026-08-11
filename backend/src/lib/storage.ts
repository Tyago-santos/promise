import crypto from "node:crypto";
import sharp from "sharp";
import { supabaseAdmin } from "@/lib/supabase.js";
import { env } from "@/config/env.js";
import { ApiError } from "@/lib/ApiError.js";

const bucket = env.SUPABASE_STORAGE_BUCKET;
const publicUrlMarker = `/storage/v1/object/public/${bucket}/`;

const MAX_BYTES = 500 * 1024;
// Cada passo tenta uma combinacao mais agressiva ate caber no limite.
const LARGEST_EDGE_STEPS = [1600, 1200, 900];
const QUALITY_STEPS = [80, 65, 50, 35];

// Converte tudo para webp: comprime melhor que jpeg/png e preserva
// transparencia e animacao, entao serve para os 4 formatos aceitos.
async function compressToLimit(file: Express.Multer.File): Promise<Buffer> {
  const animated = file.mimetype === "image/gif";
  let smallest: Buffer | undefined;

  for (const largestEdge of LARGEST_EDGE_STEPS) {
    // .rotate() sem argumento aplica a orientacao do EXIF antes do resize.
    const resized = sharp(file.buffer, { animated })
      .rotate()
      .resize({ width: largestEdge, height: largestEdge, fit: "inside", withoutEnlargement: true });

    for (const quality of QUALITY_STEPS) {
      const output = await resized.clone().webp({ quality }).toBuffer();
      if (output.byteLength <= MAX_BYTES) return output;
      if (!smallest || output.byteLength < smallest.byteLength) smallest = output;
    }
  }

  throw ApiError.badRequest(
    `Nao foi possivel comprimir a imagem para ${MAX_BYTES / 1024}KB. Envie uma imagem menor.`,
    { menorTamanhoObtidoKB: Math.round((smallest?.byteLength ?? 0) / 1024) },
  );
}

export async function uploadImage(file: Express.Multer.File): Promise<string> {
  let compressed: Buffer;
  try {
    compressed = await compressToLimit(file);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw ApiError.badRequest("Imagem invalida ou corrompida");
  }

  const objectPath = `${crypto.randomUUID()}.webp`;

  const { error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(objectPath, compressed, { contentType: "image/webp" });

  if (error) {
    throw new ApiError(502, "Falha ao enviar a imagem para o storage", error.message);
  }

  return supabaseAdmin.storage.from(bucket).getPublicUrl(objectPath).data.publicUrl;
}

// Remove o objeto correspondente a uma URL publica. Ignora URLs de outro
// formato (ex: fotos antigas salvas em disco) para nao travar a exclusao.
export async function removeImage(url: string): Promise<void> {
  const objectPath = url.split(publicUrlMarker)[1];
  if (!objectPath) return;

  await supabaseAdmin.storage.from(bucket).remove([decodeURIComponent(objectPath)]);
}
