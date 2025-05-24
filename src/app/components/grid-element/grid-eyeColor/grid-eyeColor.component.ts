import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashCasePipe } from '../../../pipes/dash-case.pipe';
import { GridElementComponent } from '../grid-element.component';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';

@Component({
  selector: 'ba-grid-eyeColor',
  imports: [GridElementContainerComponent, NgClass, DashCasePipe],
  templateUrl: './grid-eyeColor.component.html',
  styleUrl: './grid-eyeColor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridEyeColor extends GridElementComponent {
  override correctGuess() {
    return this.answer?.eyeColor === this.guess?.eyeColor;
  }

  get eyeColor() {
    if (this.guess?.eyeColor == 'null') {
      return 'Unknown';
    }
    return this.guess?.eyeColor;
  }
}
