import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashCasePipe } from '../../../pipes/dash-case.pipe';
import { GridElementComponent } from '../grid-element.component';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';

@Component({
  selector: 'ba-grid-occupation',
  imports: [GridElementContainerComponent, NgClass, DashCasePipe],
  templateUrl: './grid-occupation.component.html',
  styleUrl: './grid-occupation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridOccupationComponent extends GridElementComponent {
  override correctGuess() {
    return this.answer?.occupation === this.guess?.occupation;
  }

  get occupation() {
    if (this.guess?.occupation == 'null') {
      return 'Unknown';
    }
    return this.guess?.occupation;
  }
}
