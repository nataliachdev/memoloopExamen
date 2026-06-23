import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
})
export class Accueil {}
