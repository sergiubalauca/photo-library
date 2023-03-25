import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridGalleryItemComponent } from './grid-gallery-item.component';

describe('GridGalleryItemComponent', () => {
  let component: GridGalleryItemComponent;
  let fixture: ComponentFixture<GridGalleryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridGalleryItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridGalleryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
