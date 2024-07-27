/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import * as R from 'ramda';
// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = ({ star, square, triangle, circle }) => {
  if (triangle !== 'white' || circle !== 'white') {
    return false;
  }

  return star === 'red' && square === 'green';
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = ({ star, square, triangle, circle }) => {
  const colors = [star, square, triangle, circle];
  return colors.filter((color) => color === 'green').length >= 2;
};

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = ({ star, square, triangle, circle }) => {
  const colors = [star, square, triangle, circle];
  const blueCount = colors.filter((color) => color === 'blue').length;
  if (blueCount > 2) {
    return false;
  }
  const redCount = colors.filter((color) => color === 'red').length;
  console.log(blueCount === redCount);
  return blueCount === redCount;
};

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = ({ star, square, triangle, circle }) => {
  return circle === 'blue' && square === 'orange' && star === 'red';
};

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = ({ star, square, triangle, circle }) => {
  const shapeColors = [star, square, triangle, circle];
  const colorCounts = R.countBy(R.identity, shapeColors);
  const hasThreeSameColor = R.any(
    (count) => count >= 3,
    R.values(R.omit(['white'], colorCounts))
  );

  return hasThreeSameColor;
};

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = ({ star, square, triangle, circle }) => {
  const shapeColors = { star, square, triangle, circle };
  if (triangle !== 'green') {
    return false;
  }
  const greenCount = R.values(shapeColors).filter(
    (color) => color === 'green'
  ).length;
  if (greenCount !== 2) {
    return false;
  }
  const redCount = R.values(shapeColors).filter(
    (color) => color === 'red'
  ).length;

  if (redCount !== 1) {
    return false;
  }
  return true;
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (shapes) => {
    return isAllSameColor('orange', shapes)
};

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = ({ star, square, triangle, circle }) => {
  console.log(star);
  return star !== 'red' && star !== 'white';
};

// 9. Все фигуры зеленые.
export const validateFieldN9 = (shapes) => {
  return isAllSameColor('green', shapes)
};

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = ({ star, square, triangle, circle }) => {
  if (square === 'white' || triangle === 'white') {
    return false;
  }
  return triangle === square;
};

function isAllSameColor(color, shapes){
    const colorsOfShapes = Object.values(shapes);
  return [...colorsOfShapes].every((shape) => shape === color);
}