import { Component, inject, input } from '@angular/core';
import { DeckService } from '../../services/deck-service';
import { Deck } from '../../interfaces/deck';
import { filter, lastValueFrom, map } from 'rxjs';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { AddCard } from "../add-card/add-card";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-deck-detail',
  imports: [AddCard],
  templateUrl: './deck-detail.html',
  styleUrl: './deck-detail.css',
})

export class DeckDetail {

  private deckService = inject(DeckService);
  private route = inject(ActivatedRoute);

  
  private id = toSignal(
    this.route.params.pipe(map(p => Number(p['id']))),
    { initialValue: 0 }
  );


  deckResource = rxResource<Deck, number>({
    params: () => this.id(),
    stream: ({ params: id }) => this.deckService.getDeck(id),
  });

}

    