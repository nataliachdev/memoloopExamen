import { Component, inject, effect } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../services/game-service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GameAnswer } from '../../interfaces/game-answer';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './game.html',
  styleUrl: './game.css',
})

export class Game {

  answerControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/.*\S.*/)
  ]);

  result: any = null;
  gameFinished = false; 
  scoreGood = 0;
  scoreBad = 0;

  private gameService = inject(GameService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private gameId = toSignal(
      this.route.params.pipe(map(p => Number(p['id']))),
      { initialValue: 0 }
  );

  constructor() {
     effect(() => {
      const data = this.gameAnswer.value();

      if (data === null) {
        this.router.navigate(['/resume-game', this.gameId()]);
      }
    });
  }

  gameAnswer = rxResource<GameAnswer,number>({
      params: () => this.gameId(),
      stream: ({ params: gameId }) => this.gameService.getNext(gameId),
  })


  submit() {
  if (!this.gameAnswer.hasValue()) return;

  const cleanAnswer = this.answerControl.value?.trim();
  if (!cleanAnswer) return;

  const current = this.gameAnswer.value();

  const payload = {
     id: this.gameAnswer.value()?.id,
      card: this.gameAnswer.value()?.card,
      answer: cleanAnswer,
      correctAnswer: false
  };

  this.gameService.answer(payload).subscribe({
    next: (res) => {

      this.result = res;

      if (res.correctAnswer) this.scoreGood++;
      else this.scoreBad++;

      this.answerControl.reset();
      this.gameAnswer.reload();
    },

    error: (err) => {
      if (err.status === 404) {
        // FIN DU QUIZ
        this.router.navigate(['/resume-game', this.gameId()]);
      }
    }
  });
}

  finishGame() {
    this.router.navigate(['/resume-game', this.gameId()]);
  }
}