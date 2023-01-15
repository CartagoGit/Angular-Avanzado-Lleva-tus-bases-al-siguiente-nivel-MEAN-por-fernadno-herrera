/**
 * ? Devuelve el porcentaje dado un valor, un minimo y un maximo
 * @param {{
  value: number; 
  max?: number; default = 100
  min?: number; default = 0
}} data
 * @returns {number}
 */
export const getPercent = (data: {
  value: number;
  max?: number;
  min?: number;
}): number => {
  const { value, max = 100, min = 0 } = data;
  return ((value - min) / (max - min)) * 100;
};
