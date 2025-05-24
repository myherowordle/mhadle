import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Student } from '../../models/student';
import { StudentList } from '../../models/student-list';
import { GridMangaComponent } from '../grid-element/grid-manga/grid-manga.component';
import { GridOccupationComponent } from '../grid-element/grid-occupation/grid-occupation.component';
import { GridAgeComponent } from '../grid-element/grid-age/grid-age.component';
import { GridAliasComponent } from '../grid-element/grid-alias/grid-alias.component';
import { GridGenderComponent } from '../grid-element/grid-gender/grid-gender.component';
import { GridHairColor } from '../grid-element/grid-hairColor/grid-hairColor.component';
import { GridEyeColor } from '../grid-element/grid-eyeColor/grid-eyeColor.component';
import { GridHeightComponent } from '../grid-element/grid-height/grid-height.component';
import { GridQuirkComponent } from '../grid-element/grid-quirk/grid-quirk.component';
import { GridAffiliationComponent } from '../grid-element/grid-affiliation/grid-affiliation.component';
import { GridStudentComponent } from '../grid-element/grid-student/grid-student.component';
import { GridWeaponTypeComponent } from "../grid-element/grid-quirk-type/grid-quirk-type.component";


@Component({
  selector: 'ba-grid-row',
  imports: [
    GridStudentComponent,
    GridAliasComponent,
    GridGenderComponent,
    GridAgeComponent,
    GridHairColor,
    GridEyeColor,
    GridHeightComponent,
    GridQuirkComponent,
    GridAffiliationComponent,
    GridOccupationComponent,
    GridMangaComponent,
    GridWeaponTypeComponent
],
  templateUrl: './grid-row.component.html',
  styleUrl: './grid-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridRowComponent {
  @Input() guess: Student | null = null;
  @Input() answer: Student | null = null;
  @Input() list: StudentList | undefined = undefined;
}
