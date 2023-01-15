import { ColorBootstrap } from './color.interface';
import { TypeNumber } from './type-numbers';
/**
 * ? Propiedades para el componente de barra de progreso
 */
export interface ProgressProps {
  value: number;
  valueWithType?: string;
  title?: string;
  colorBootstrap?: ColorBootstrap;
  percent?: number;
  percentWithSymbol?: string;
  typeNumber?: TypeNumber;
  max?: number;
  min?: number;
  range?: number;
}
