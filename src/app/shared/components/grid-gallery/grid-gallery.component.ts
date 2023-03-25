import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
  EventEmitter,
  Output,
} from '@angular/core';

import { Photo } from '@shared';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-grid-gallery',
  templateUrl: './grid-gallery.component.html',
})
export class GridGalleryComponent implements OnInit, OnDestroy {
  @Input() images!: Photo[];
  @Input() images$: Observable<Photo[]> | undefined;
  @Input() cols: number = 4;
  @Input() rowHeight: number = 1;
  @Input() gutterSize: number = 1;
  @Input() isFavorite: boolean = false;

  @Output() imageClicked: EventEmitter<Photo> = new EventEmitter();
  @Output() loadMore: EventEmitter<boolean> = new EventEmitter();
  @Output() removeFromFavorites: EventEmitter<Photo> = new EventEmitter();

  @ViewChild('itemsContainer', { read: ViewContainerRef })
  public container!: ViewContainerRef;
  @ViewChild('item', { read: TemplateRef }) template!: TemplateRef<any>;

  @ViewChild('gridEndContainer', { read: ViewContainerRef })
  public gridEndContainer!: ViewContainerRef;
  @ViewChild('gridEndItem', { read: TemplateRef })
  gridEndItem!: TemplateRef<any>;

  gridByBreakpoint = {
    xl: 3,
    lg: 3,
    md: 3,
    sm: 2,
    xs: 1,
  };
  public breakpoint: number = 0;

  private subscription: Subscription = new Subscription();

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.buildData(this.images);

    this.breakpoint = window.innerWidth <= 400 ? 1 : 6;
    this.subscription = this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (result.matches) {
          if (result.breakpoints[Breakpoints.XSmall]) {
            this.cols = this.gridByBreakpoint.xs;
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.cols = this.gridByBreakpoint.sm;
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.cols = this.gridByBreakpoint.md;
          }
          if (result.breakpoints[Breakpoints.Large]) {
            this.cols = this.gridByBreakpoint.lg;
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            this.cols = this.gridByBreakpoint.xl;
          }
        }
      });
  }

  // onResize(event: any) {
  //   this.breakpoint = event.target.innerWidth <= 400 ? 1 : 6;
  // }

  public trackById(index: any, item: Photo) {
    return item.id;
  }

  private buildData(imagesAppended: Photo[]) {
    const ITEMS_RENDERED_AT_ONCE = 20;
    const INTERVAL_IN_MS = 1000;
    let item: Photo;
    let currentIndex = 0;

    const interval = setInterval(() => {
      const nextIndex = currentIndex + ITEMS_RENDERED_AT_ONCE;

      for (let n = currentIndex; n < nextIndex; n++) {
        if (n >= imagesAppended.length) {
          if (this.gridEndContainer) {
            this.gridEndContainer.createEmbeddedView(this.gridEndItem);
          }
          clearInterval(interval);
          break;
        }
        item = {
          author: imagesAppended[n].author,
          download_url: imagesAppended[n].download_url,
          height: imagesAppended[n].height,
          id: imagesAppended[n].id,
          url: imagesAppended[n].url,
          width: imagesAppended[n].width,
          alt: imagesAppended[n].alt,
        };
        const context = {
          item,
        };
        if (this.container) {
          // append views to the container
          // if (n === imagesAppended.length - 1) {
          //   this.gridEndContainer.createEmbeddedView(this.gridEndItem);
          // }

          this.container.createEmbeddedView(this.template, context);
        }
      }

      currentIndex += ITEMS_RENDERED_AT_ONCE;
    }, INTERVAL_IN_MS);
  }

  public loadMoreEntries() {
    console.log('load more entries');
    this.loadMore.emit(true);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
