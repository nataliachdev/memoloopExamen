import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeckResponse, DeckService } from '../../services/deck-service';

@Component({
  selector: 'app-create-deck',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-deck.html',
  styleUrl: './create-deck.css',
})
export class CreateDeck {
  
  private deckService = inject(DeckService)

  private fb = inject(FormBuilder);

  result = signal<DeckResponse | null>(null);
  error = signal<string | null>(null);
 
  
  form = this.fb.group({
    id: [0],
    name: ['', [Validators.required, Validators.minLength(2)]]
  });
 
  get name() { return this.form.controls.name; }
 
  submit() {
    if (this.form.invalid) return;
    
    this.deckService.create(this.name.value!).subscribe({
      next: (res) => {  this.result.set(res); 
                        this.error.set(null); },
      error: (err) => { this.error.set("Errror"); }
    });
  }


}
