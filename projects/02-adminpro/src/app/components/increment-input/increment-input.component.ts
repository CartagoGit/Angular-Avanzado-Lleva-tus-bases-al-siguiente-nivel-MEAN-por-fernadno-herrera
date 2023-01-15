import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColorBootstrap } from '../../interfaces/color.interface';

@Component({
  selector: 'app-increment-input',
  templateUrl: './increment-input.component.html',
  styleUrls: ['./increment-input.component.css'],
})
export class IncrementInputComponent {
  // ANCHOR : Variables
  @Output() returnValueNumber = new EventEmitter<number>();
  @Output() returnValueWithType = new EventEmitter<string>();

  @Input() colorType: ColorBootstrap = 'light';
  @Input() numberType: 'euro' | 'perceint' | 'dolar' | 'none' = 'none';
  @Input() max: number | undefined = undefined;
  @Input() min: number | undefined = undefined;
  @Input() range: number = 5;

  private _value: number = 0;
  @Input('value') set setValue(value: number) {
    this._value = value;
  }
  get getValue(): number {
    return this._value;
  }
  get getValueWithType(): string {
    return `${this._value}${this.getSymbolType}`;
  }
  get getSymbolType(): string {
    const symbols: { [key in typeof this.numberType]: string } = {
      dolar: '$',
      euro: '€',
      perceint: '%',
      none: '',
    };
    return symbols[this.numberType];
  }

  // ANCHOR : Constructor

  ngAfterViewInit(): void {
    if (this.numberType === 'perceint') {
      this.max = 100;
      this.min = 0;
    }
  }

  // ANCHOR : Metodos

  public clickChangeValue(value: number): void {
    this._value += value;
    this._checkAndSetValueInRange();
    this._returnValue();
  }

  public changeInputValue(value: number, element: HTMLInputElement) {
    if (isNaN(value) || value === null) value = 0;
    this._value = value;
    this._checkAndSetValueInRange();
    element.value = this._value.toString();
    this._returnValue();
  }

  private _checkAndSetValueInRange(): void {
    if (this.min !== undefined && this._value < this.min)
      this._value = this.min;
    if (this.max !== undefined && this._value > this.max)
      this._value = this.max;
  }

  private _returnValue(): void {
    this.returnValueNumber.emit(this.getValue);
    this.returnValueWithType.emit(this.getValueWithType);
  }
}
