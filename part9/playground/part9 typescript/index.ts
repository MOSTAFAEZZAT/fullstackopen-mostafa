import express from 'express';
import calculator from './calculator';
const app = express();

app.get('/hello', (_req , res ) => {
  res.send('Hello Full Stack!');
});

app.use(express.json());

 
app.post('/calculate', (req, res) => {
  const { value1, value2, op } = req.body;
  const result = calculator(value1, value2, op);
  res.send({ result });
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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});