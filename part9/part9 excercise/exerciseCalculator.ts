interface ExcerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
};
export const exerciseCalculator = (excercise: number[], target:number): ExcerciseResult => {

  const periodLength = excercise.length;
  const trainingDays = excercise.filter(day => day > 0).length;
  const average = excercise.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'Great job! You met your target.';
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = 'Not too bad, but could be better.';
  } else {
    rating = 1;
    ratingDescription = 'You need to work harder.';
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
}
 