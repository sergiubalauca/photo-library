import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { Photo } from '@shared';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-grid-gallery-item',
  templateUrl: './grid-gallery-item.component.html',
  styleUrls: ['./grid-gallery-item.component.scss'],
})
export class GridGalleryItemComponent implements OnDestroy {
  @Input() image!: Photo;
  @Input() rowHeight: number = 1;
  @Input() gutterSize: number = 1;
  @Input() isFavorite: boolean = false;

  @Output() imageClicked: EventEmitter<Photo> = new EventEmitter();
  @Output() removeFromFavorites: EventEmitter<Photo> = new EventEmitter();

  @ViewChild('img') img!: ElementRef;

  public rows: number = 0;
  public dialogSubscription: Subscription = new Subscription();
  @HostListener('window:resize')
  calculateRows() {
    this.rows = Math.floor(
      this.img.nativeElement.offsetHeight /
        (this.rowHeight + this.gutterSize) /
        10
    );
  }

  constructor(public dialog: MatDialog) {}

  public onImageClicked(): void {
    if (this.isFavorite) {
      console.log(
        'GSB: GridGalleryItemComponent -> onImageClicked -> this.image',
        this.image
      );
      this.openDialog();
    }
    this.imageClicked.emit(this.image);
  }
  public openDialog() {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      data: { image: this.image },
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe((result) => {
      if (result) this.removeFromFavorites.emit(this.image);
    });
  }
  ngOnDestroy() {
    this.dialogSubscription.unsubscribe();
  }
}
