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
import { GridAgeComponent } from './grid-age.component';

describe('GridAgeComponent', () => {
  let component: GridAgeComponent;
  let fixture: ComponentFixture<GridAgeComponent>;

  const mockStudentAru: Student = {
    ...getStudentListTestData()[StudentList.GLOBAL]['Aru'],
    age: 4,
  };
  const mockStudentHina: Student = {
    ...getStudentListTestData()[StudentList.GLOBAL]['Hina'],
    age: 3,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(GridAgeComponent);
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

  it('should apply "arrow-up" class when guessed EX Skill cost is lower', fakeAsync(() => {
    component.guess = mockStudentHina; // Lower EX Skill cost
    component.answer = mockStudentAru; // Higher EX Skill cost
    fixture.detectChanges();
    fixture.whenStable();
    tick(420);

    const divElement = fixture.debugElement.query(By.css('div > div > div'));
    expect(divElement.nativeElement.classList).toContain('arrow-up');
  }));

  it('should apply "arrow-down" class when guessed EX Skill cost is higher', fakeAsync(() => {
    component.guess = mockStudentAru; // Higher EX Skill cost
    component.answer = mockStudentHina; // Lower EX Skill cost
    fixture.detectChanges();
    fixture.whenStable();
    tick(420);

    const divElement = fixture.debugElement.query(By.css('div > div > div'));
    expect(divElement.nativeElement.classList).toContain('arrow-down');
  }));

  it('should render the guessed EX Skill cost correctly', fakeAsync(() => {
    component.guess = mockStudentAru;
    component.answer = mockStudentAru;
    fixture.detectChanges();
    fixture.whenStable();
    tick(420);

    const spanElement = fixture.debugElement.query(By.css('span'));
    expect(spanElement.nativeElement.textContent.trim()).toBe(
      String(mockStudentAru.age)
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
