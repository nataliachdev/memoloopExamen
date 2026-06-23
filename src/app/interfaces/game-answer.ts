import { Card } from "./card";

export interface GameAnswer {
  id: number;
  card: Card;
  answer: string | null;
  correctAnswer: boolean;
}