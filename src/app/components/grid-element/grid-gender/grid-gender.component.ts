import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashCasePipe } from '../../../pipes/dash-case.pipe';
import { GridElementComponent } from '../grid-element.component';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';

@Component({
  selector: 'ba-grid-gender',
  imports: [GridElementContainerComponent, NgClass, DashCasePipe],
  templateUrl: './grid-gender.component.html',
  styleUrl: './grid-gender.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridGenderComponent extends GridElementComponent {
  override correctGuess() {
    return this.answer?.gender === this.guess?.gender;
  }

  get gender() {
    return this.guess?.gender;
  }
}
