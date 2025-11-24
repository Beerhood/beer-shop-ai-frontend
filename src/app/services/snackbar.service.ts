import {inject, Injectable} from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private readonly messages = inject(MessageService);

   showSuccess(message: string, life = 3000) {
    this.messages.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
      life
    });
  }

  showError(message: string, life = 3000) {
    this.messages.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life
    });
  }
}
