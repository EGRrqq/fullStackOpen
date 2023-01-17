interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    targetHours: number,
    average: number
}

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
    }

    return result
}

console.log(calculateExercises([2, 2.5, 3, 3, 2, 2, 3], 2))