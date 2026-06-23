import { Deck } from "./deck";
import { GameAnswer } from "./game-answer";

export interface GameInterface {
  id: number;
  deck: Deck;
  answers:GameAnswer[];
}