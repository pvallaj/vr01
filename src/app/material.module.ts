import { NgModule } from '@angular/core';

// MAterial
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatList, MatListModule } from "@angular/material/list";
import { MatTabsModule } from "@angular/material/tabs";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatChipsModule} from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from "@angular/material/card";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTreeModule } from "@angular/material/tree";
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [],
  imports: [
     //Material
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
     MatCheckboxModule
  ],
  exports:[
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
    MatCheckboxModule    
  ]
})
export class MaterialModule { }
