import { Component, EventEmitter, Input, Output } from '@angular/core';
import { getPercent } from '../../helpers/get-percent';
import { ColorBootstrap } from '../../interfaces/color.interface';
import { TypeNumber } from '../../interfaces/type-numbers';


@Component({
  selector: 'app-increment-input',
  templateUrl: './increment-input.component.html',
  styleUrls: ['./increment-input.component.css'],
})
export class IncrementInputComponent {
  // ANCHOR : Variables
  @Output() returnValueNumber = new EventEmitter<number>();
  @Output() returnValueWithType = new EventEmitter<string>();
  @Output() returnPercent = new EventEmitter<number>();
  @Output() returnPercentWithSymbol = new EventEmitter<string>();
  @Output() returnSymbol = new EventEmitter<string>();

  @Input() colorType: ColorBootstrap = 'light';
  @Input() numberType: TypeNumber = 'none';
  @Input() showNumberType: boolean = true;
  @Input() max: number = 100;
  @Input() min: number = 0;
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
  get getPercent(): number {
    return this._getPercentCalculated();
  }
  get getPercentWithSymbol(): string {
    return `${this._getPercentCalculated()}%`;
  }
  get getSymbolType(): string {
    const symbols: { [key in typeof this.numberType]: string } = {
      dolar: '$',
      euro: '€',
      percent: '%',
      pixel: 'px',
      none: '',
    };
    return symbols[this.numberType];
  }

  // ANCHOR : Constructor

  ngAfterViewInit(): void {
    this._returnValue();
  }

  // ANCHOR : Metodos

  /**
   * ? Al hacer click recibe el valor a incrementar o decrementar
   * @param value
   */
  public clickChangeValue(value: number): void {
    this._value += value;
    this._checkAndSetValueInRange();
    this._returnValue();
  }

  /**
   * ? Recibe el valor del input y el elemento html del input al que se le asignara el valor
   * @param value
   * @param element
   */
  public onChangeInput(value: number, element: HTMLInputElement) {
    console.log(1);
    if (isNaN(value) || value === null) value = 0;
    this._value = value;
    this._checkAndSetValueInRange();
    element.value = this._value.toString();
    this._returnValue();
  }

  /**
   * ? Comprueba que el valor se encuentra entre el minimo y el maximo permitido
   */
  private _checkAndSetValueInRange(): void {
    if (this._value < this.min) this._value = this.min;
    if (this._value > this.max) this._value = this.max;
  }

  /**
   * ? Emite los cambios en el valor
   */
  private _returnValue(): void {
    this.returnValueNumber.emit(this.getValue);
    this.returnValueWithType.emit(this.getValueWithType);
    this.returnPercent.emit(this.getPercent);
    this.returnPercentWithSymbol.emit(this.getPercentWithSymbol);
    this.returnSymbol.emit(this.getSymbolType);
  }

  /**
   * ? Devuelve el porcentage calculado del valor entre el maximo y el minimo
   * @returns
   */
  private _getPercentCalculated(): number {
    return getPercent({ value: this._value, max: this.max, min: this.min });
  }
}
