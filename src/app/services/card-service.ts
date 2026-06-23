import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card, CreateCardDto } from '../interfaces/card';

@Injectable({
  providedIn: 'root',
})
export class CardService {
    private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080'

  addCard(deckId: number, dto: CreateCardDto): Observable<Card> {
    return this.http.post<Card>(
      `${this.apiUrl}/decks/${deckId}/cards`,
      dto
    );
  }
}
