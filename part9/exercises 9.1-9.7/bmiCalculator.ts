export const calculateBmi = (height: number, mass: number): string => {
    if (isNaN(Number(height)) || isNaN(Number(mass))) {
        throw new Error('Provided values were not numbers!');
    }

    if (height <= 0 || mass <= 0) {
        throw new Error('Please provide height and mass as positive numbers.');
    }

    const bmi = mass/((height/100)**2);

    switch (true) {
        case bmi < 16:
            return 'Underweight (Severe thinness)';
        case bmi <= 16.9:
            return 'Underweight (Moderate thinness)';
        case bmi <= 18.4:
            return 'Underweight (Mild thinness)';
        case bmi <= 24.9:
            return 'Normal range';
        case bmi <= 29.9:
            return 'Overweight (Pre-obese)';
        case bmi <= 34.9:
            return 'Obese (Class I)';
        case bmi <= 39.9:
            return 'Obese (Class II)';
        case bmi >= 40:
            return 'Obese (Class III)';
        default:
            return 'Something went wrong.';
    }
}