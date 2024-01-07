import express from 'express';
import bodyParser from 'body-parser';

const app = express();
export default app;
app.use(bodyParser.json());

// Helper functions
export function isPalindrome(number: { toString: () => any; }) {
    // Convert the number to a string
    const str = number.toString();

    // Compare the string with its reverse
    return str === str.split('').reverse().join('');
}

export function isPrime(number: number) {
    // Negative numbers, 0 and 1 are not prime numbers
    if (number < 2) {
        return false;
    }

    // Check from 2 to the square root of the number
    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) {
            return false;
        }
    }

    return true;
}

// POST endpoint
app.post('/api/numbers', (req, res) => {
    const { minNumber, maxNumber, feature } = req.body;

    // Input Validation
    if (!minNumber || !maxNumber || minNumber <= 0 || maxNumber <= minNumber || !Array.isArray(feature) || feature.length === 0) {
        return res.status(400).send({ error: 'Invalid input' });
    }

    const startTime = process.hrtime.bigint();

    function findNumbers(minNumber: any, maxNumber: number, features: any) {
        const result = [];
    
        for (let number = minNumber; number <= maxNumber; number++) {
            let isNumberValid = true;
    
            // Check each feature
            for (let feature of features) {
                if (feature === 'palindrome' && !isPalindrome(number)) {
                    isNumberValid = false;
                    break;
                }
                if (feature === 'prime' && !isPrime(number)) {
                    isNumberValid = false;
                    break;
                }
            }
    
            // If the number satisfies all the features, add it to the result
            if (isNumberValid) {
                result.push(number);
            }
        }
    
        return result;
    }
    const result: never[] = [];

    // Send response
    const endTime = process.hrtime.bigint();
    const timeOfExecution = Number(endTime - startTime) / 1e6; // convert nanoseconds to milliseconds
    res.send({ data: result, timeOfExecution });
});
