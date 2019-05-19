import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineFurnitureComponent } from './mine-furniture.component';

describe('MineFurnitureComponent', () => {
  let component: MineFurnitureComponent;
  let fixture: ComponentFixture<MineFurnitureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineFurnitureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineFurnitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
