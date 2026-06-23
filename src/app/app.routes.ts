import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { DeckDetail } from './components/deck-detail/deck-detail';
import { Game } from './components/game/game';
import { ResumeGame } from './components/resume-game/resume-game';
import { CreateDeck } from './components/create-deck/create-deck';
import { Accueil } from './components/accueil/accueil';
import { AddCard } from './components/add-card/add-card';

export const routes: Routes = [
    { path: '', component: Accueil },
    { path: 'quiz', component: Home },
    { path: 'game/:id', component: Game },
    { path: 'create-deck', component: CreateDeck },
    { path: 'decks/:id', component: DeckDetail },
    { path: 'resume-game/:id', component: ResumeGame },
    { path: 'add-card', component: AddCard }
];
