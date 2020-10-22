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
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatChipsModule} from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from "@angular/material/card";

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
     MatCardModule
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
    MatCardModule
  ]
})
export class MaterialModule { }
