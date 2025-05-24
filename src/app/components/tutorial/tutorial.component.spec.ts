/* eslint-disable quotes */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TutorialComponent } from './tutorial.component';

describe('TutorialComponent', () => {
  let component: TutorialComponent;
  let fixture: ComponentFixture<TutorialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(TutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Update view
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title "My Hero Academia Wordle"', () => {
    const titleElement = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(titleElement.textContent).toContain('My Hero Academia Wordle');
  });

  it('should contain tutorial instructions', () => {
    const textElements = fixture.debugElement.queryAll(
      By.css('p.text-xl.text-white')
    );
    const texts = textElements.map((el) => el.nativeElement.textContent.trim());

    expect(texts).toContain("Guess today's My Hero Academia student!");
    expect(texts).toContain("Type any student's name to begin.");
    expect(texts).toContain('Press content_copy to copy your score!');
  });

  it('should display the refresh button if displayed', () => {
    component.displayRefreshButton = true;
    fixture.detectChanges();

    const textElements = fixture.debugElement.queryAll(
      By.css('p.text-xl.text-white')
    );
    const texts = textElements.map((el) => el.nativeElement.textContent.trim());
    expect(texts).toContain('Press refresh to guess a new student!');
  });

  it('should display color explanations', () => {
    const correctText = fixture.debugElement
      .query(By.css('.correct-text'))
      .nativeElement.textContent.trim();
    const incorrectText = fixture.debugElement
      .query(By.css('.incorrect-text'))
      .nativeElement.textContent.trim();

    expect(correctText).toBe('Green');
    expect(incorrectText).toBe('Grey');
  });
});
