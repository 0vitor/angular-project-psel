import { Injectable, inject } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private toastr = inject(ToastrService);

  success(message: string, title = 'Sucesso') {
    this.toastr.success(message, title);
  }

  error(message: string, title = 'Erro') {
    this.toastr.error(message, title);
  }

  info(message: string, title = 'Info') {
    this.toastr.info(message, title);
  }

  warning(message: string, title = 'Atenção') {
    this.toastr.warning(message, title);
  }
}
