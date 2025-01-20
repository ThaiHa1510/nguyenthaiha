import { generateToken, verifyToken } from './token.utils';
import { JsonWebTokenError } from 'jsonwebtoken';
import { JWT_MESSAGES } from './constants';
import { describe, it, expect, beforeAll } from '@jest/globals';
import User from '../models/user.model';

describe('generateToken', () => {
  beforeAll(() => {
    process.env.SECRET_KEY = 'secret-key';
 });

  it('should generate a token with a valid user object', async () => {
    const user = new User({ _id: '123', email: 'test@example.com' });
    const token = await generateToken(user);
    expect(token).toBeDefined();
    expect(token).not.toBeNull();
  });

  it('should generate a token with a user object missing _id and email properties', async () => {
    const user = new User({});
    expect(() => generateToken(user)).toThrowError();
  });

  it('should throw an error if SECRET_KEY environment variable is not set', async () => {
    delete process.env.SECRET_KEY;
    const user = new User({ _id: '123', email: 'test@example.com' });
    expect(() => generateToken(user)).toThrowError(JWT_MESSAGES.SECRET_KEY_NOT_DEFINED);
  });

  it('should generate a token with SECRET_KEY environment variable set', async () => {
    process.env.SECRET_KEY = 'secret-key';
    const user = new User({ _id: '123', email: 'test@example.com' });
    const token = await generateToken(user);
    expect(token).toBeDefined();
    expect(token).not.toBeInstanceOf(String);
  });
});

describe('verifyToken', () => {
    beforeAll(() => {
        process.env.SECRET_KEY = 'secret-key';
    });
    it('should verify a token and return the user', async () => {
        const user = new User({ _id: '1', email: 'john@example.com' });
        const token = await generateToken(user);
        const verifiedUser = await verifyToken(token);
        expect(verifiedUser).toBeDefined();
        expect(verifiedUser).toHaveProperty('userId');
        expect(verifiedUser).toHaveProperty('email');
    });

    it('should throw an error if the token is invalid', async () => {
        process.env.SECRET_KEY = 'secret-key';
        await expect(() => verifyToken('invalid-token')).toThrowError(JsonWebTokenError);
    });
});