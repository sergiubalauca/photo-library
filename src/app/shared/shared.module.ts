import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MatTabsModule } from '@angular/material/tabs';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { GridGalleryComponent } from './components/grid-gallery/grid-gallery.component';
import { GridGalleryItemComponent } from './components/grid-gallery-item/grid-gallery-item.component';
import { MatCardModule } from '@angular/material/card';
import { IntersectionObserverDirective } from './helpers/intersection.directive';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DialogContentComponent } from './components/dialog-content/dialog-content.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    HeaderComponent,
    GridGalleryComponent,
    GridGalleryItemComponent,
    IntersectionObserverDirective,
    DialogContentComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatListModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    ScrollingModule,
    MatDialogModule,
  ],
  exports: [HeaderComponent, GridGalleryComponent, GridGalleryItemComponent],
  providers: [Document],
})
export class SharedModule {}
