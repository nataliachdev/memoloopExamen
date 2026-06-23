import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GameService {

  private apiUrl = 'http://localhost:8080/games';

  constructor(private http: HttpClient) {}



createGame(deck: { id: number }) {
  return this.http.post<any>('http://localhost:8080/games', deck);
}

getNext(id: number) {
  return this.http.get<any>(`http://localhost:8080/games/${id}/next`);
}

answer(payload: any) {
  return this.http.post<any>('http://localhost:8080/games/answer', payload);
}


getGame(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/${id}`);
}

}