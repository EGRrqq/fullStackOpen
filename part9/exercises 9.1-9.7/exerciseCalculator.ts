interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export const calculateExercises = (days: Array<number>, target: number): Result => {
    const average = days.reduce((amount, hours) => amount + hours, 0) / days.length;

    let rating = 0;
    const maxRating = 5;

    if (average > target) {
        rating = maxRating;
    } else {
        rating = (average * maxRating)/(target*2);
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
        case rating <= maxRating :
            ratingDescription = 'you are on a roll today';
            break;
        default:
            ratingDescription = 'you are getting closer to your goal even faster';
    }

    const result = {
        periodLength: days.length,
        trainingDays: days.filter(h => h != 0 ).length,
        success: average >= target,
        rating,
        ratingDescription,
        target,
        average,
    };

    return result;
};