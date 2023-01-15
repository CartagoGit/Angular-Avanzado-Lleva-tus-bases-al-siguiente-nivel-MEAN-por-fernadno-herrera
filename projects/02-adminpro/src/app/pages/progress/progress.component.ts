import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent {
  public progress: number = 0;

  get getProgressPercent() {
    return `${this.progress}%`;
  }

  public changeProgress(value: number): void {
    this.progress += value;
    this._checkAndSetProgressInRange();
  }

  public changeInputProgress(value: number, element: HTMLInputElement) {
    if (isNaN(value) || value === null) value = 0;

    this.progress = value;
    this._checkAndSetProgressInRange();
    element.value = this.progress.toString();
  }

  private _checkAndSetProgressInRange(): void {
    this.progress < 0 && (this.progress = 0);
    this.progress > 100 && (this.progress = 100);
  }
}
