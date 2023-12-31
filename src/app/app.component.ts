import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChildModel } from './models/child.model';
import { DataModel } from './models/data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  timerValue: number = 1000;
  arraySize: number = 10;
  additionalIds: string = '';
  data: any[] = [];
  private worker!: Worker;

  ngOnInit() {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(new URL('./app.worker', import.meta.url));
      this.worker.onmessage = ({ data }) => {
        console.log('page got message:', data);
        this.data = data
          .slice(-10)
          .map(
            (item: any) =>
              new DataModel(
                item.id,
                item.int,
                item.float,
                item.color,
                new ChildModel(item.child.id, item.child.color)
              )
          );
        this.overwriteIds();
      };
      this.worker.postMessage({
        timerValue: this.timerValue,
        arraySize: this.arraySize,
      });
    }
  }

  ngOnDestroy() {
    if (this.worker) {
      this.worker.terminate();
    }
  }

  updateWorkerConfig(timerValue: number, arraySize: number) {
    this.timerValue = timerValue;
    this.arraySize = arraySize > 0 ? arraySize : 10;
    this.worker.postMessage({ timerValue, arraySize: this.arraySize });
  }

  updateIds(additionalIds: string) {
    this.additionalIds = additionalIds;
    this.overwriteIds();
  }

  private overwriteIds(): void {
    // Split the additionalIds string into an array and overwrite the IDs of the first n elements
    const ids = this.additionalIds.split(',').map((id) => id.trim());
    if (ids[0]) {
      for (let i = 0; i < ids.length; i++) {
        if (this.data[i]) {
          this.data[i].id = ids[i];
        }
      }
    }
  }
}
