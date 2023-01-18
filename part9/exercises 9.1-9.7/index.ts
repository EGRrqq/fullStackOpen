import express from 'express';
const app = express();

import { calculateBmi } from "./bmiCalculator";

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

const PORT = 3003;

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;

    if (!height || !weight) {
        res.status(400).json({ error: 'missing parameters' });
    }

    try {
        const bmi = calculateBmi(Number(height), Number(weight));
        const resultObj = { height, weight, bmi };
        res.status(200).json(resultObj);
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
        res.status(400).json({ error: errorMessage });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});