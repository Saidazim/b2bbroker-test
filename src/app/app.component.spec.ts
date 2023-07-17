import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('#updateWorkerConfig should update timerValue and arraySize', () => {
    component.updateWorkerConfig(2000, 20);
    expect(component.timerValue).toEqual(2000);
    expect(component.arraySize).toEqual(20);
  });

  it('#updateIds should update additionalIds and call overwriteIds', () => {
    spyOn(component as any, 'overwriteIds');
    component.updateIds('123,456');
    expect(component.additionalIds).toEqual('123,456');
    expect((component as any).overwriteIds).toHaveBeenCalled();
  });

  it('#overwriteIds should split additionalIds and overwrite data IDs', () => {
    component.additionalIds = '123,456';
    component.data = [{ id: '1' }, { id: '2' }];
    (component as any).overwriteIds();
    expect(component.data).toEqual([{ id: '123' }, { id: '456' }]);
  });

  it('should terminate worker on destroy', () => {
    const worker = { terminate: jasmine.createSpy('terminate') };
    component['worker'] = worker as any;
    component.ngOnDestroy();
    expect(worker.terminate).toHaveBeenCalled();
  });
});
