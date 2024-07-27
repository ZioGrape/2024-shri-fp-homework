/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from '../tools/api';
import * as R from 'ramda';

const api = new Api();

const urlNumbers = 'https://api.tech/numbers/base';
const urlAnimals = 'https://animals.tech/';

const validateString = (value, handleError) => {
  const isNumeric = R.test(/^[0-9]+(\.[0-9]+)?$/);
  const isPositive = R.compose(R.lt(0), parseFloat);
  const lengthInRange = R.allPass([
    R.compose(R.gt(R.__, 2), R.length),
    R.compose(R.lt(R.__, 10), R.length),
  ]);

  if (!isNumeric(value) || !isPositive(value) || !lengthInRange(value)) {
    handleError('ValidationError');
    return false;
  }
  return true;
};

const roundNumber = R.compose(Math.round, parseFloat);

const convertToBinary = (number) =>
  api.get(urlNumbers)({ from: 10, to: 2, number });

const logResult = (writeLog) => R.tap(writeLog);

const square = (number) => Math.pow(number, 2);

const remainderOfThree = (number) => number % 3;

const getAnimalById = (id) => api.get(`${urlAnimals}${id}`)();

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
  writeLog(value);

  if (!validateString(value, handleError)) return;

  const processPipeline = R.pipe(
    roundNumber,
    logResult(writeLog),
    convertToBinary,
    R.andThen(({ result: binaryResult }) => {
      writeLog(binaryResult);

      const binaryLength = binaryResult.length;
      writeLog(binaryLength);

      const squared = square(binaryLength);
      writeLog(squared);

      const remainder = remainderOfThree(squared);
      writeLog(remainder);

      return getAnimalById(remainder);
    }),
    R.andThen(({ result: animal }) => handleSuccess(animal)),
    R.otherwise(handleError)
  );

  processPipeline(value);
};

export default processSequence;
