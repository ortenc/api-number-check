import app from '../app';
import supertest from 'supertest';
import { isPalindrome, isPrime } from '../app';
let server: any;

describe('API Endpoint Testing', () => {
    test('POST /api/numbers with valid input', async () => {
        const response = await supertest(app).post('/api/numbers').send({
            minNumber: 1,
            maxNumber: 10,
            feature: ['palindrome', 'prime']
        });
        expect(response.status).toBe(200);
        // Additional assertions...
    });

    test('POST /api/numbers without required fields', async () => {
        const response = await supertest(app).post('/api/numbers').send({
            // Missing required fields
        });
        expect(response.status).toBe(400);
        // Additional assertions...
    });
});

describe('isPalindrome Function Testing', () => {
    test('should return true for a palindrome number', () => {
        expect(isPalindrome(121)).toBeTruthy();
    });

    test('should return false for a non-palindrome number', () => {
        expect(isPalindrome(123)).toBeFalsy();
    });
});

describe('isPrime Function Testing', () => {
    test('should return true for a prime number', () => {
        expect(isPrime(11)).toBeTruthy();
    });

    test('should return false for a non-prime number', () => {
        expect(isPrime(4)).toBeFalsy();
    });
});

beforeAll(() => {
    server = app.listen(3001); // Use a different port for testing
});
  
afterAll((done) => {
    server.close(done); // Close the server after tests
});
