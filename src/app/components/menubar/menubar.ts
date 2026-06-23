import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';

@Component({
  template: `
        <div class="card">
            <p-menubar [model]="items" />
        </div>
    `,
  standalone: true,
  selector: 'app-menubar',
  imports: [ 
    MenubarModule,
    RouterModule
  ],
  templateUrl: './menubar.html',
  styleUrl: './menubar.css',
})

export class Menubar implements OnInit {

    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Accueil',
                icon: 'pi pi-home',
                command: () => {window.location.href = '';}
            },
            {
                label: 'Quiz',
                icon: 'pi pi-star',
                command: () => {window.location.href = 'quiz';}
            },
            {
                label: 'Decks',
                icon: 'pi pi-star',
                items: [
                    {
                        label: 'Ajouter',
                        icon: 'pi pi-star',
                        command: () => {window.location.href = 'create-deck';}
                    }
                ]
            }
        ];
    }
}