import express from 'express';
import {calculateBmi} from './calculateBmi';
import { exerciseCalculator } from './exerciseCalculator';
// import { Request, Response } from 'express';

const app = express();
app.use(express.json());
app.get('/hello', (_req , res ) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  console.log(height, weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send({ error: 'malformatted parameters' });
    return;
  }

  const result = calculateBmi(height, weight);
  console.log(result);
  res.send({
    result: result,
  });

});
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || target === undefined) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (!Array.isArray(daily_exercises) || typeof target !== 'number') {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = exerciseCalculator(daily_exercises, target);
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});