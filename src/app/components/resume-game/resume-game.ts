import { Component, computed, inject } from '@angular/core';
import { GameInterface } from '../../interfaces/game-interface';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { GameService } from '../../services/game-service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-resume-game',
  standalone: true,
  imports: [],
  templateUrl: './resume-game.html',
  styleUrl: './resume-game.css',
})

export class ResumeGame {
  
  private gameService = inject(GameService);
  private route = inject(ActivatedRoute);

  private gameId = toSignal(
      this.route.params.pipe(map(p => Number(p['id']))),
      { initialValue: 0 }
  );

  game = rxResource<GameInterface,number>({
    params: () => this.gameId(),
    stream: ({ params: gameId }) => this.gameService.getGame(gameId),
  })

  stats = computed(() => {
  const answers = this.game.value()?.answers ?? [];

  return {
    total: answers.length,
    correct: answers.filter(a => a.correctAnswer).length,
    incorrect: answers.filter(a => !a.correctAnswer).length,
  };
});

}
