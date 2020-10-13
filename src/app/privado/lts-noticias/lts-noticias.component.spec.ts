import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LtsNoticiasComponent } from './lts-noticias.component';

describe('LtsNoticiasComponent', () => {
  let component: LtsNoticiasComponent;
  let fixture: ComponentFixture<LtsNoticiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LtsNoticiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LtsNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
