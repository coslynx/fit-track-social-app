/**
 * Validates if the given email string is in a valid format.
 *
 * @param {string} email The email string to validate.
 * @returns {boolean} True if the email is valid, false otherwise.
 * @throws {Error} If the email is not a string.
 */
const isValidEmail = (email) => {
    if (typeof email !== 'string') {
        throw new Error('Email must be a string.');
    }
    const emailRegex = new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'i'
    );

    return emailRegex.test(email.trim());
};

/**
 * Formats a date string into 'YYYY-MM-DD' format.
 *
 * @param {string} dateString The date string to format.
 * @returns {string | null} The formatted date string or null if the input is invalid.
 */
const formatDate = (dateString) => {
    if (!dateString) {
        return null;
    }
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return null;
        }
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    } catch (error) {
        console.error('Error formatting date:', error);
        return null;
    }
};

/**
 * Calculates the Basal Metabolic Rate using the Mifflin-St Jeor equation.
 *
 * @param {number} weightKg The weight in kilograms.
 * @param {number} heightCm The height in centimeters.
 * @param {number} age The age in years.
 * @param {'male' | 'female'} gender The gender of the person.
 * @returns {number | null} The calculated BMR or null if inputs are invalid.
 */
const calculateBMR = (weightKg, heightCm, age, gender) => {
    if (typeof weightKg !== 'number' || typeof heightCm !== 'number' || typeof age !== 'number') {
        console.error('Invalid numeric input for BMR calculation.');
        return null;
    }

    if (weightKg <= 0 || heightCm <= 0 || age <= 0) {
        console.error('Invalid positive numeric input for BMR calculation.');
        return null;
    }

    if (gender !== 'male' && gender !== 'female') {
        console.error('Invalid gender input for BMR calculation.');
        return null;
    }

    const weightInKg = parseFloat(weightKg.toFixed(2));
    const heightInCm = parseFloat(heightCm.toFixed(2));
    const ageInYears = parseFloat(age.toFixed(0));


    let bmr;
    if (gender === 'male') {
        bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * ageInYears + 5;
    } else {
        bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * ageInYears - 161;
    }
    
    return Math.round(bmr);
};

/**
 * Object containing default error messages for different API response statuses.
 */
const API_ERROR_MESSAGES = {
    400: 'Bad Request',
    401: 'Unauthorized',
    404: 'Not Found',
    500: 'Internal Server Error',
};

export { isValidEmail, formatDate, calculateBMR, API_ERROR_MESSAGES };