import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GridElementComponent } from '../grid-element.component';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';

@Component({
  selector: 'ba-grid-age',
  imports: [GridElementContainerComponent, NgClass],
  templateUrl: './grid-age.component.html',
  styleUrl: './grid-age.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridAgeComponent extends GridElementComponent {
  override correctGuess() {
    return this.answer?.age === this.guess?.age;
  }

  get age() {
    if (this.guess?.age == -1) {
      return "Unknown";
    }
    return this.guess?.age;
  }
}
