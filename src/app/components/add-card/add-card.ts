import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardService } from '../../services/card-service';
import { Card } from '../../interfaces/card';

@Component({
  selector: 'app-add-card',
  imports: [ReactiveFormsModule],
  templateUrl: './add-card.html',
  styleUrl: './add-card.css',
})
export class AddCard {

  deckId = input.required<number>();


  private fb = inject(NonNullableFormBuilder);
  private cardService = inject(CardService);

  loading     = signal(false);
  error       = signal<string | null>(null);
  createdCard = signal<Card | null>(null);

  form = this.fb.group({
    //deckId:      ['' , [Validators.required, Validators.pattern(/^\d+$/)]],
    word:        ['', [Validators.required, Validators.maxLength(200)]],
    translation: ['', [Validators.required, Validators.maxLength(200)]],
  });

  //get deckId()      { return this.form.controls.deckId; }
  get word()        { return this.form.controls.word; }
  get translation() { return this.form.controls.translation; }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
 
    this.loading.set(true);
    this.error.set(null);
    this.createdCard.set(null);
 
    //const { deckId, word, translation } = this.form.getRawValue();
    const { word, translation } = this.form.getRawValue();

 
    this.cardService
      //.addCard(Number(deckId), { word, translation })
      .addCard(this.deckId(), { word, translation })
      .subscribe({
        next: (card) => {
          this.loading.set(false);
          this.createdCard.set(card);
          this.form.reset();
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set(err?.error?.message ?? 'Une erreur est survenue.');
        },
      });
  }
}
