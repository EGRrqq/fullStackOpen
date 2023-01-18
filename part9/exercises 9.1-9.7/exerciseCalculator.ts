interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    targetHours: number,
    average: number
}

interface ExerciseValues {
    dailyExerciseHours: Array<number>,
    targetHours: number
}

const parseArgumentsExercise = (args: Array<string>): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    for (let i = 2; i < args.length; i++) {
        if (isNaN(Number(args[i]))) {
            throw new Error('Provided values were not numbers!');
        }
    }

    return {
        dailyExerciseHours: args.slice(3).map((el) => Number(el)),
        targetHours: Number(args[2]),
    };
};

const calculateExercises = (dailyExerciseHours: Array<number>, targetHours: number) : Result => {
    const average = dailyExerciseHours.reduce((amount, hours) => amount + hours, 0) / dailyExerciseHours.length;

    let rating = 0;
    const maxRating = 5;

    if (average > targetHours) {
        rating = maxRating;
    } else {
        rating = (average * maxRating)/(targetHours * 2);
    }

    let ratingDescription = '';

    switch (true) {
        case rating < maxRating * 0.2:
            ratingDescription = 'the main thing is to develop a habit';
            break;
        case rating < maxRating * 0.4:
            ratingDescription = 'there is room to grow here';
            break;
        case rating < maxRating * 0.6:
            ratingDescription = 'solid middle';
            break;
        case rating < maxRating * 0.8:
            ratingDescription = 'good job';
            break;
        case rating < maxRating:
            ratingDescription = 'you are on a roll today';
            break;
        default:
            ratingDescription = 'you are getting closer to your goal even faster';
    }

    const result = {
        periodLength: dailyExerciseHours.length,
        trainingDays: dailyExerciseHours.filter(h => h != 0 ).length,
        success: average >= targetHours,
        rating,
        ratingDescription,
        targetHours,
        average,
    };

    return result;
};

try {
    const { dailyExerciseHours, targetHours } = parseArgumentsExercise(process.argv);
    console.log(calculateExercises(dailyExerciseHours, targetHours));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}