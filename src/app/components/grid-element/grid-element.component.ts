import { ChangeDetectionStrategy, Component, Input, ElementRef } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Student } from '../../models/student';
import { StudentList } from '../../models/student-list';
@Component({
  selector: 'ba-grid-element',
  templateUrl: './grid-element.component.html',
  styleUrls: ['./grid-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridElementComponent {
  @Input() guess: Student | null = null;
  @Input() answer: Student | null = null;
  // used for change detection to retrigger the animation on list change
  @Input() list: StudentList | undefined = undefined;
  @Input() animationDelayMs = 0;

  constructor(private elRef: ElementRef, private cdr: ChangeDetectorRef) {}

  correctGuess(): boolean {
    return this.guess === this.answer;
  }

  getFlipString() {
    return this.guess ? this.guess.id + this.list : '';
  }
  
  ngAfterViewInit() {
    this.cdr.detectChanges();
    setTimeout(() => {
      this.adjustFontSize();
    }, 1500);
  }

  private adjustFontSize(): void {
    const span = this.elRef.nativeElement.querySelector('.block');
    const parent = span?.parentElement;
  
    if (span && parent) {
      const parentWidth = parent.offsetWidth;
      const parentHeight = parent.offsetHeight;
  
      span.style.fontSize = '1rem'; // Start with a base font size
      span.style.whiteSpace = 'normal'; // Allow text wrapping
  
      const resize = () => {
        const currentFontSize = parseFloat(span.style.fontSize);
  
        if (
          (span.scrollWidth > parentWidth || span.scrollHeight > parentHeight) &&
          currentFontSize > 0.5
        ) {
          span.style.fontSize = `${currentFontSize - 0.1}rem`;
          setTimeout(resize, 10); // Add a delay for smooth resizing
        }
      };
  
      resize();
    } else {
      console.warn('The .block element or its parent was not found.');
    }
  }
}
