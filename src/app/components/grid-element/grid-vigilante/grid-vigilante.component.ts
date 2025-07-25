import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GridElementComponent } from '../grid-element.component';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';

@Component({
  selector: 'ba-grid-vigilante',
  imports: [GridElementContainerComponent, NgClass],
  templateUrl: './grid-vigilante.component.html',
  styleUrl: './grid-vigilante.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridVigilanteComponent extends GridElementComponent {
  override correctGuess() {
    return this.answer?.vigilante === this.guess?.vigilante;
  }

  get vigilante() {
    if (this.guess?.vigilante == -1) {
      return "None";
    }
    return this.guess?.vigilante;
  }
}
