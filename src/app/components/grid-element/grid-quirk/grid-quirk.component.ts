import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashCasePipe } from '../../../pipes/dash-case.pipe';
import { GridElementComponent } from '../grid-element.component';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';

@Component({
  selector: 'ba-grid-quirk',
  imports: [GridElementContainerComponent, NgClass, DashCasePipe],
  templateUrl: './grid-quirk.component.html',
  styleUrl: './grid-quirk.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridQuirkComponent extends GridElementComponent {
  override correctGuess() {
    return this.answer?.quirk === this.guess?.quirk;
  }

  get quirk() {
    if (this.guess?.quirk == 'null') {
      return 'Unknown';
    }
    return this.guess?.quirk;
  }
}
