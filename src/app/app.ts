import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PrimeNG } from 'primeng/config';

import { FooterComponent } from '@components/footer/footer';
import { HeaderComponent } from '@components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
})
export class App {
  constructor(private primengConfig: PrimeNG) {}
  title: string = 'sergipetec-front';

  ngOnInit() {
    this.primengConfig.setTranslation({
      startsWith: 'Começa com',
      contains: 'Contém',
      notContains: 'Não contém',
      endsWith: 'Termina com',
      equals: 'Igual a',
      notEquals: 'Diferente de',
      noFilter: 'Sem filtro',

      lt: 'Menor que',
      lte: 'Menor ou igual a',
      gt: 'Maior que',
      gte: 'Maior ou igual a',

      is: 'É',
      isNot: 'Não é',
      before: 'Antes',
      after: 'Depois',
      dateIs: 'Data é',
      dateIsNot: 'Data não é',

      clear: 'Limpar',
      apply: 'Aplicar',
      matchAll: 'Corresponder todos',
      matchAny: 'Corresponder qualquer',

      addRule: 'Adicionar regra',
      removeRule: 'Remover regra',

      // empty
      emptyMessage: 'Nenhum resultado encontrado',
    });
  }
}
