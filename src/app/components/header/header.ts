import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, ButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
  menuItems: MenuItem[];

  constructor() {
    this.menuItems = [
      {
        label: 'Funcionários',
        routerLink: '/employees',
        styleClass: 'p-button p-button-outlined p-button-light',
      },
      {
        label: 'Novo Funcionário',
        routerLink: '/employees/new',
        styleClass: 'p-button p-button-success',
      },
    ];
  }
}
