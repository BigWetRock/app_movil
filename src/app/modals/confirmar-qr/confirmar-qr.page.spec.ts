import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmarQrPage } from './confirmar-qr.page';

describe('ConfirmarQrPage', () => {
  let component: ConfirmarQrPage;
  let fixture: ComponentFixture<ConfirmarQrPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConfirmarQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
