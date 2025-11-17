import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreDelete } from './store-delete';

describe('StoreDelete', () => {
  let component: StoreDelete;
  let fixture: ComponentFixture<StoreDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreDelete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreDelete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
