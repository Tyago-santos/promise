import { apiFetch } from "@/shared/lib/httpClient";

export type Photo = {
  id: number;
  url: string;
  order: number;
};

export type Profile = {
  id: number;
  name: string;
  email: string;
  age: number | null;
  sex: string | null;
  city: string | null;
  place: string | null;
  bio: string | null;
  interests: string[];
  coverUrl: string | null;
  createdAt: string;
  photos: Photo[];
};

export type UpdateProfileInput = Partial<{
  name: string;
  age: number;
  sex: string;
  city: string;
  place: string;
  bio: string;
  interests: string[];
}>;

export function getMyProfile(): Promise<Profile> {
  return apiFetch<Profile>("/api/profiles/me");
}

export function getProfileById(id: number): Promise<Profile> {
  return apiFetch<Profile>(`/api/profiles/${id}`);
}

export function searchProfiles(query: string): Promise<Profile[]> {
  return apiFetch<Profile[]>(`/api/profiles/search?q=${encodeURIComponent(query)}`);
}

export function updateMyProfile(input: UpdateProfileInput): Promise<Profile> {
  return apiFetch<Profile>("/api/profiles/me", { method: "PATCH", body: input });
}

export function uploadMyCover(file: File): Promise<Profile> {
  const formData = new FormData();
  formData.append("cover", file);
  return apiFetch<Profile>("/api/profiles/me/cover", { method: "PATCH", body: formData });
}

export function uploadMyPhoto(file: File): Promise<Photo> {
  const formData = new FormData();
  formData.append("photo", file);
  return apiFetch<Photo>("/api/profiles/me/photos", { method: "POST", body: formData });
}

export function removeMyPhoto(photoId: number): Promise<void> {
  return apiFetch<void>(`/api/profiles/me/photos/${photoId}`, { method: "DELETE" });
}
