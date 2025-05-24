import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { DashCasePipe } from '../../../pipes/dash-case.pipe';
import { GridElementComponent } from '../grid-element.component';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'ba-grid-alias',
  imports: [GridElementContainerComponent, NgClass, DashCasePipe],
  templateUrl: './grid-alias.component.html',
  styleUrl: './grid-alias.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridAliasComponent extends GridElementComponent {

  override correctGuess() {
    return this.answer?.alias === this.guess?.alias;
  }

  get alias() {
    if (this.guess?.alias == 'null') {
      return 'None';
    }
    return this.guess?.alias;
  }  
}
