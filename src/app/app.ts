import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateDeck } from "./components/create-deck/create-deck";
import { AddCard } from "./components/add-card/add-card";
import { Menubar } from './components/menubar/menubar';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    CreateDeck, 
    AddCard,
    Menubar
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('memoloop-ui');
}
