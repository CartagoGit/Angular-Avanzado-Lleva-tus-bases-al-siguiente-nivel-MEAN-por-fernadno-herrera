import { ChartConfiguration, ChartDataset, ChartType, Plugin } from 'chart.js';

/**
 * ? Propiedades que recibiran las graficas para mostrar los datos con ng2-charts
 */
export interface GraphicProps {
  title: string;
  type: ChartType;
  labels: string[];
  datasets: ChartDataset[];
  options?: ChartConfiguration['options'];
  plugins?: Plugin[];
}
