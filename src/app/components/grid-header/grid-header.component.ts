/* eslint-disable @typescript-eslint/class-literal-property-style */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GridHeaderElementComponent } from './grid-header-element/grid-header-element.component';

@Component({
  selector: 'ba-grid-header',
  imports: [GridHeaderElementComponent],
  templateUrl: './grid-header.component.html',
  styleUrl: './grid-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridHeaderComponent {
  get student() {
    return 'Character'
    return $localize`:Student|Header for student grid@@StudentGrid:Student`;
  }

  get alias() {
    return 'Alias'
    return $localize`:Student|Header for student grid@@StudentGrid:Student`;
  }

  get affiliation() {
    return 'Affiliation'
    return $localize`:School|Header for school grid@@SchoolGrid:School`;
  }

  get occupation() {
    return 'Occupation'
    return $localize`:Role|Header for role grid@@RoleGrid:Role`;
  }

  get age() {
    return 'Age'
    return $localize`:Damage Type|Header for damage type grid@@DamageTypeGrid:Damage Type`;
  }

  get gender() {
    return 'Gender'
    return $localize`:Armor Type|Header for armor type grid@@ArmorTypeGrid:Armor Type`;
  }

  get quirkType() {
    return 'Quirk Type'
    return $localize`:Ex Skill Cost|Header for ex skill cost grid@@ExSkillCostGrid:Ex Skill Cost`;
  }

  get eyeColor() {
    return 'Eye Color'
    return $localize`:Birthday|Header for birthday grid@@BirthdayGrid:Birthday`;
  }

  get quirk() {
    return 'Quirk'
    return $localize`:Birthday|Header for birthday grid@@BirthdayGrid:Birthday`;
  }

  get manga() {
    return 'First Chapter Appearance'
    return $localize`:Release Date|Header for release date grid@@ReleaseDateGrid:Release Date`;
  }

  get hairColor() {
    return 'Hair Color'
    return $localize`:Weapon Type|Header for weapon type grid@@WeaponTypeGrid:Weapon Type`;
  }

  get height() {
    return 'Height'
    return $localize`:Weapon Type|Header for weapon type grid@@WeaponTypeGrid:Weapon Type`;
  }

  get mangaClass() {
    return 'text-[0.7rem] md:text-sm'
  }
}
