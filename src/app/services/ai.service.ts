import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface AskAiAssistantDto {
  text: string;
}

export interface AiResponseDto {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/ai/ask`;

  sendMessage(message: string): Observable<AiResponseDto> {
    const body: AskAiAssistantDto = { text: message };
    return this.http.post<AiResponseDto>(this.apiUrl, body);
  }
}
