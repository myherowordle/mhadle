import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridMangaComponent } from '../grid-element/grid-manga/grid-manga.component';
import { GridStudentComponent } from '../grid-element/grid-student/grid-student.component';
import { GridRowComponent } from './grid-row.component';

describe('GridRowComponent', () => {
  let component: GridRowComponent;
  let fixture: ComponentFixture<GridRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        GridStudentComponent,
        GridMangaComponent,
      ],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(GridRowComponent);
    component = fixture.componentInstance;
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
