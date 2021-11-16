/******************************************************************************************
DESCRIPCIÓN:

  Este archivo lista todos los elementos de MATERIAL utilizados en este proyecto.
******************************************************************************************/
import { NgModule } from '@angular/core';

// MAterial
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule} from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';

import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatDateFormats } from '@angular/material/core';

export const PERSONALIZADO_DATE_FORMATS: MatDateFormats = {
  ...MAT_NATIVE_DATE_FORMATS,
  display: {
    ...MAT_NATIVE_DATE_FORMATS.display,
    dateInput: {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    } as Intl.DateTimeFormatOptions,
  },
};

@NgModule({
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-MX'},
    { provide: MAT_DATE_FORMATS, useValue: PERSONALIZADO_DATE_FORMATS },
  ],
  declarations: [],
  imports: [
     // Material
     MatSliderModule,
     MatChipsModule,
     MatToolbarModule,
     MatIconModule,
     MatButtonModule,
     MatButtonToggleModule,
     MatSidenavModule,
     MatListModule,
     MatTabsModule,
     MatExpansionModule,
     MatTableModule,
     MatDialogModule,
     MatPaginatorModule,
     MatInputModule,
     MatCardModule,
     MatAutocompleteModule,
     MatProgressBarModule,
     MatProgressSpinnerModule,
     MatSelectModule,
     MatTooltipModule,
     MatTreeModule,
     MatDividerModule,
     MatCheckboxModule,
     MatDatepickerModule,
     MatNativeDateModule,
     MatRadioModule,
     MatSortModule,
  ],
  exports: [
    MatSliderModule,
    MatChipsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatExpansionModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatInputModule,
    MatCardModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTooltipModule,
    MatTreeModule,
    MatDividerModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSortModule,
  ],
})
export class MaterialModule { }
