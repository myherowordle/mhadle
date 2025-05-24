import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { GridElementComponent } from '../grid-element.component';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';

@Component({
  selector: 'ba-grid-quirk-type',
  imports: [GridElementContainerComponent, NgClass],
  templateUrl: './grid-quirk-type.component.html',
  styleUrl: './grid-quirk-type.component.scss',
})
export class GridWeaponTypeComponent extends GridElementComponent {
  override correctGuess() {
    return this.answer?.quirkType === this.guess?.quirkType;
  }

  get quirkType() {
    if (this.guess?.quirkType == 'null') {
      return 'Unknown';
    }
    return this.guess?.quirkType;
  }
}
