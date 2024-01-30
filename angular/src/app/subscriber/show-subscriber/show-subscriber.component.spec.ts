import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSubscriberComponent } from './show-subscriber.component';

describe('ShowSubscriberComponent', () => {
  let component: ShowSubscriberComponent;
  let fixture: ComponentFixture<ShowSubscriberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowSubscriberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowSubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
