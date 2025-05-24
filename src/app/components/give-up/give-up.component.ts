import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'ba-give-up',
  imports: [MatCheckboxModule, FormsModule],
  templateUrl: './give-up.component.html',
  styleUrl: './give-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GiveUpComponent {
  isGiveUp = false;

  @Output() giveUp: EventEmitter<boolean> = new EventEmitter<boolean>();

  onGiveUpChange() {
    this.giveUp.emit(this.isGiveUp);
  }
}
