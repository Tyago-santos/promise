import { apiFetch } from "@/shared/lib/httpClient";
import type { Photo } from "@/features/profile/api/profile";

export type UserProfile = {
  id: number;
  name: string;
  age: number | null;
  sex: string | null;
  city: string | null;
  place: string | null;
  bio: string | null;
  interests: string[];
  coverUrl?: string | null;
  photos: Photo[];
};

export type SwipeResult =
  | { matched: false }
  | { matched: true; match: { id: number; userAId: number; userBId: number; createdAt: string } };

export function listDiscoverable(): Promise<UserProfile[]> {
  return apiFetch<UserProfile[]>("/api/matches/discover");
}

export function swipe(targetId: number, liked: boolean): Promise<SwipeResult> {
  return apiFetch<SwipeResult>("/api/matches/swipe", { method: "POST", body: { targetId, liked } });
}
