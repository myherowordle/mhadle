import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GridElementComponent } from '../grid-element.component';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';

@Component({
  selector: 'ba-grid-manga',
  imports: [GridElementContainerComponent, NgClass],
  templateUrl: './grid-manga.component.html',
  styleUrl: './grid-manga.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridMangaComponent extends GridElementComponent {
  override correctGuess() {
    return this.answer?.manga === this.guess?.manga;
  }

  get manga() {
    if (this.guess?.manga == -1) {
      return "Other";
    }
    return this.guess?.manga;
  }
}
