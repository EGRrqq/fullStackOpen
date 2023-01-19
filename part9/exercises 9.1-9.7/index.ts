import express from 'express';
const app = express();

import { calculateBmi } from "./bmiCalculator";
import {calculateExercises} from "./exerciseCalculator";

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

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


const valueChecker = (arr: Array<number>) : boolean => {
    const checkArr: boolean = Array.isArray(arr);
    const checkNum: boolean = arr.reduce((acc : boolean, h: number) => {
        return acc && !isNaN(Number(h));
    }, true);

    return checkArr && checkNum;
};

app.post('/exercises', (req, res) => {
    if (!req.body || !req.body.daily_exercises || !req.body.target) {//eslint-disable-line
        res.status(401).json( { error: "parameters missing" }).end();
    }
    else if (isNaN(req.body.target) || !valueChecker(req.body.daily_exercises)) {//eslint-disable-line
        res.status(401).json({ error: "malformatted parameters" }).end();
    }
    else {
        const daily_exercises : Array<number> = req.body.daily_exercises // eslint-disable-line
        const target : number = req.body.target // eslint-disable-line
        res.status(200).json(calculateExercises(daily_exercises, target));
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});