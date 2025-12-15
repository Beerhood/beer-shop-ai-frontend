import { Component, ElementRef, inject, ViewChild, AfterViewChecked, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AiResponseDto, AiService } from '../services/ai.service';
import { SnackbarService } from '../services/snackbar.service';
import { finalize } from 'rxjs';

interface ChatMessage {
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isError?: boolean;
}

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    AvatarModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './ai-chat.component.html',
  styleUrl: './ai-chat.component.scss',
})
export class AIChatComponent implements AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  private aiService = inject(AiService);
  private snackbar = inject(SnackbarService);

  userInput = '';
  isLoading = signal(false);

  messages = signal<ChatMessage[]>([
    {
      content:
        'Hello! I am your personal beer assistant. Can I help you choose a drink or find a snack?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  sendMessage() {
    if (!this.userInput.trim() || this.isLoading()) return;

    const text = this.userInput.trim();
    this.userInput = '';

    this.addMessage(text, 'user');

    this.isLoading.set(true);

    this.aiService
      .sendMessage(text)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (response) => {
          let message: string;
          try {
            message = (JSON.parse(response.message) as AiResponseDto).message;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (e) {
            message = response.message;
          }
          this.addMessage(message, 'ai');
        },
        error: (err) => {
          console.error(err);
          this.snackbar.showError('Failed to get response from AI');
          this.addMessage(
            'Sorry, I am having trouble connecting to the server right now. Please try again later.',
            'ai',
            true,
          );
        },
      });
  }

  private addMessage(content: string, sender: 'user' | 'ai', isError: boolean = false) {
    this.messages.update((msgs) => [...msgs, { content, sender, timestamp: new Date(), isError }]);
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop =
        this.scrollContainer.nativeElement.scrollHeight;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {}
  }

  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
