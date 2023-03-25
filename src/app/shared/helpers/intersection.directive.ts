// Import the core angular services.
import { Directive, EventEmitter, Output } from '@angular/core';
import { ElementRef } from '@angular/core';

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Directive({
  selector: '[bnIntersectionObserver]',
  exportAs: 'intersection',
})
export class IntersectionObserverDirective {
  @Output() isIntersectingEvent: EventEmitter<boolean> = new EventEmitter();

  public isIntersecting: boolean;
  public IS_INTERSECTING: boolean = true;
  public IS_NOT_INTERSECTING: boolean = false;

  private elementRef: ElementRef;
  private observer: IntersectionObserver | null;

  constructor(elementRef: ElementRef) {
    this.elementRef = elementRef;
    this.observer = null;
    this.isIntersecting = false;
  }
  public ngOnDestroy(): void {
    this.observer?.disconnect();
    this.observer = null;
  }

  public ngOnInit(): void {
    this.observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        console.log('GSB entrie123s', entries);
        entries.forEach((entry) => {
          // console.log('GSB entry', entry);
          if (entry.isIntersecting) {
            this.isIntersectingEvent.emit(entry.isIntersecting);
            this.observer?.unobserve(entry.target);
          }
        });
        this.isIntersecting = entries[0].isIntersecting;
      },
      {
        rootMargin: '300px 0px 300px 0px',
      }
    );
    this.observer.observe(this.elementRef.nativeElement);
  }
}
