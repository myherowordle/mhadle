import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Student } from '../../../models/student';
import { StudentList } from '../../../models/student-list';
import { getStudentListTestData } from '../../../utils/test-data-utils';
import { GridElementContainerComponent } from '../grid-wrapper/grid-element-container.component';
import { GridGender } from './grid-gender.component';

describe('GridGender', () => {
  let component: GridGender;
  let fixture: ComponentFixture<GridGender>;

  const mockStudentAru: Student = {
    ...getStudentListTestData()[StudentList.GLOBAL]['Aru'],
    gender: 'Light',
  };
  const mockStudentHina: Student = {
    ...getStudentListTestData()[StudentList.GLOBAL]['Hina'],
    gender: 'Heavy',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(GridGender);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly determine a correct guess', () => {
    component.guess = mockStudentAru;
    component.answer = mockStudentAru;
    fixture.detectChanges();
    expect(component.correctGuess()).toBeTrue();
  });

  it('should correctly determine an incorrect guess', () => {
    component.guess = mockStudentAru;
    component.answer = mockStudentHina;
    fixture.detectChanges();
    expect(component.correctGuess()).toBeFalse();
  });

  it('should apply "correct-no-text" class when the guess is correct', fakeAsync(() => {
    component.guess = mockStudentAru;
    component.answer = mockStudentAru;
    fixture.detectChanges();
    fixture.whenStable();
    tick(420);

    const divElement = fixture.debugElement.query(By.css('div > div > div'));
    expect(divElement.nativeElement.classList).toContain('correct-no-text');
  }));

  it('should apply "incorrect-no-text" class when the guess is incorrect', fakeAsync(() => {
    component.guess = mockStudentAru;
    component.answer = mockStudentHina;
    fixture.detectChanges();
    fixture.whenStable();
    tick(420);

    const divElement = fixture.debugElement.query(By.css('div > div > div'));
    expect(divElement.nativeElement.classList).toContain('incorrect-no-text');
  }));

  it('should render the correct armor type text', fakeAsync(() => {
    component.guess = mockStudentAru;
    fixture.detectChanges();
    fixture.whenStable();
    tick(420);

    const spanElement = fixture.debugElement.query(By.css('span'));
    expect(spanElement.nativeElement.textContent.trim()).toBe(
      mockStudentAru.gender
    );
  }));

  it('should correctly pass inputs to ba-grid-element-container', fakeAsync(() => {
    component.guess = mockStudentAru;
    component.answer = mockStudentAru;
    component.animationDelayMs = 300;
    fixture.detectChanges();
    fixture.whenStable();
    tick(420);

    const gridElementContainer = fixture.debugElement.query(
      By.directive(GridElementContainerComponent)
    );
    expect(gridElementContainer).toBeTruthy();
    expect(gridElementContainer.componentInstance.isFlipped).toBe(
      component.getFlipString()
    );
    expect(gridElementContainer.componentInstance.animationDelayMs).toBe(300);
    expect(gridElementContainer.componentInstance.won).toBeTrue();
  }));
});
