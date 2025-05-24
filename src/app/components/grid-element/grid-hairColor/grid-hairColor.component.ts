import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashCasePipe } from '../../../pipes/dash-case.pipe';
import { GridElementComponent } from '../grid-element.component';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';

@Component({
  selector: 'ba-grid-hairColor',
  imports: [GridElementContainerComponent, NgClass, DashCasePipe],
  templateUrl: './grid-hairColor.component.html',
  styleUrl: './grid-hairColor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridHairColor extends GridElementComponent {
  override correctGuess() {
    return this.answer?.hairColor === this.guess?.hairColor;
  }

  get hairColor() {
    if (this.guess?.hairColor == 'null') {
      return 'Unknown';
    }
    return this.guess?.hairColor;
  }
}
