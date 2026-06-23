import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { DeckService, DeckResponse } from '../../services/deck-service';
import { GameService } from '../../services/game-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  private deckService = inject(DeckService);
  private gameService = inject(GameService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // ROUTE PARAM → SIGNAL
  readonly deckIdFromRoute = toSignal(
    this.route.params.pipe(
      map(({ id }) => {
        const value = Number(id);
        return Number.isFinite(value) ? value : null;
      })
    )
  );

  // DECKS → SIGNAL
  readonly decks = toSignal(
    this.deckService.getAll(),
    { initialValue: [] as DeckResponse[] }
  );

  readonly selectedDeckId = signal<number | null>(null);

  selectDeck(id: number) {
    this.selectedDeckId.set(id);
  }

  startGame() {
    const deckId = this.selectedDeckId();

    if (!deckId) return;

    this.gameService.createGame({ id: deckId }).subscribe({
      next: (game) => {
        this.router.navigate(['/game', game.id]);
      },
      error: (err) => console.error(err),
    });
  }
  
}