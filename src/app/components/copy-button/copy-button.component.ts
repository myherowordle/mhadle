import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { GuessResult } from '../../../models/guesses';

@Component({
  selector: 'ba-copy-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './copy-button.component.html',
  styleUrl: './copy-button.component.scss',
})
export class CopyButtonComponent {
  @Input() guesses: GuessResult[] = [];

  private readonly correctIcon = '🟩';
  private readonly incorrectIcon = '⬜';

  constructor(private clipboard: Clipboard, private snackbar: MatSnackBar) {}

  copyToClipboard() {
    const guessResults = this.guesses.map((guess) =>
      guess.isCorrect
        .map((isCorrect) => (isCorrect ? this.correctIcon : this.incorrectIcon))
        .join('')
    );
    const copyText = guessResults.join('\n');
    this.clipboard.copy(copyText);
    this.snackbar.open('Copied to clipboard', 'Dismiss', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
