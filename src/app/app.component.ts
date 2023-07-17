import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'b2bbroker-test';
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
        this.data = data;
      };
      this.worker.postMessage({ timerValue: this.timerValue, arraySize: this.arraySize });
    }
  }

  ngOnDestroy() {
    if (this.worker) {
      this.worker.terminate();
    }
  }

  updateWorkerConfig(timerValue: number, arraySize: number) {
    this.timerValue = timerValue;
    this.arraySize = arraySize;
    this.worker.postMessage({ timerValue, arraySize });
  }

  updateIds(additionalIds: string) {
    this.additionalIds = additionalIds;
    // logic for overwriting the ids of the data
  }
}
