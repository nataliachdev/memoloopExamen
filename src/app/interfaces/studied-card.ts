import { Card } from "./card";

export interface StudiedCard {
  id: number;
  card: Card;
  knowledgeLevel: number;
  views: number;
  lastStudiedAt?: string;
}