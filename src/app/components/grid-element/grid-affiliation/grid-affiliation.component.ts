import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashCasePipe } from '../../../pipes/dash-case.pipe';
import { GridElementComponent } from '../grid-element.component';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';

@Component({
  selector: 'ba-grid-affiliation',
  imports: [GridElementContainerComponent, NgClass, DashCasePipe],
  templateUrl: './grid-affiliation.component.html',
  styleUrl: './grid-affiliation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridAffiliationComponent extends GridElementComponent {
  override correctGuess() {
    return this.answer?.affiliation === this.guess?.affiliation;
  }

  get affiliation() {
    if (this.guess?.affiliation == 'null') {
      return 'Unknown';
    }
    return this.guess?.affiliation;
  }
}
