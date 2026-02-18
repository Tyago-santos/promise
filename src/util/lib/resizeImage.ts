import imageCompression, { type Options } from "browser-image-compression";

export default async function useCompressio(file: File): Promise<File> {
  const options: Options = {
    maxSizeMB: 3, // Tamanho máximo em MB
    maxWidthOrHeight: 1024, // Dimensão máxima (largura ou altura)
    useWebWorker: true, // Usa Web Worker para performance
    fileType: "image/",
  };

  const compressedFile = await imageCompression(file, options);

  return compressedFile;
}
