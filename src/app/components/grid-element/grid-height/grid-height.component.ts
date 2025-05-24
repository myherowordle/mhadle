import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GridElementComponent } from '../grid-element.component';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';

@Component({
  selector: 'ba-grid-height',
  imports: [GridElementContainerComponent, NgClass],
  templateUrl: './grid-height.component.html',
  styleUrl: './grid-height.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridHeightComponent extends GridElementComponent {
  override correctGuess() {
    return this.answer?.height === this.guess?.height;
  }

  get height() {
    if (this.guess?.height == -1) {
      return "Unknown";
    }
    return this.guess?.height;
  }
}
