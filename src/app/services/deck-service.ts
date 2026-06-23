import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deck } from '../interfaces/deck';

export interface DeckResponse {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})

export class DeckService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080'


  getDeck(id: number): Observable<Deck> {
    return this.http.get<Deck>(`${this.apiUrl}/decks/${id}`);
  }

  //Récupérer tous les decks
  getAll() {
    return this.http.get<DeckResponse[]>(
      'http://localhost:8080/decks/all'
    );
  }

  create(name: string) {
    return this.http.post<DeckResponse>(`${this.apiUrl}/decks`, { name });
  }

}
