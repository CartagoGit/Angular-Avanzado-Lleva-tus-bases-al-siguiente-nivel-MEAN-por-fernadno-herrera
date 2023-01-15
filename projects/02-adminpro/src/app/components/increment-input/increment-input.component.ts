import { Component } from '@angular/core';

@Component({
  selector: 'app-increment-input',
  templateUrl: './increment-input.component.html',
  styles: [
    `
      input {
        border-right: 0;
      }

      .input-group-addon {
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0) 0%,
          rgba(221, 221, 221, 1) 100%
        );
      }

      .btn {
        height: 100%;
        display: flex;
        align-items: center;
      }
    `,
  ],
})
export class IncrementInputComponent {
  private _progress: number = 0;

  get getProgress(): number {
    return this._progress;
  }
  get getProgressPercent(): string {
    return `${this._progress}%`;
  }

  public changeProgress(value: number): void {
    this._progress += value;
    this._checkAndSetProgressInRange();
  }

  public changeInputProgress(value: number, element: HTMLInputElement) {
    if (isNaN(value) || value === null) value = 0;

    this._progress = value;
    this._checkAndSetProgressInRange();
    element.value = this._progress.toString();
  }

  private _checkAndSetProgressInRange(): void {
    this._progress < 0 && (this._progress = 0);
    this._progress > 100 && (this._progress = 100);
  }
}
