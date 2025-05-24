import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { By } from '@angular/platform-browser';
import { GiveUpComponent } from './give-up.component';

describe('GiveUpComponent', () => {
  let component: GiveUpComponent;
  let fixture: ComponentFixture<GiveUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCheckboxModule, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiveUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the checkbox unchecked by default', () => {
    const checkbox = fixture.debugElement.query(By.css('mat-checkbox'));
    expect(checkbox.componentInstance.checked).toBeFalse();
  });

  it('should emit the correct value when the checkbox is checked', () => {
    spyOn(component.giveUp, 'emit');

    const checkbox = fixture.debugElement.query(By.css('mat-checkbox input'));
    checkbox.nativeElement.click();
    fixture.detectChanges();

    expect(component.giveUp.emit).toHaveBeenCalledWith(true);
  });
});
