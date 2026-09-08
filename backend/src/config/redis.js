import { createClient } from 'redis';
import dotenv from 'dotenv';
import { logger } from './logger.js';

dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('error', (err) => logger.error(`Redis error: ${err}`));
redisClient.on('connect', () => logger.info('Redis connected'));

await redisClient.connect();

export const setCache = async (key, value, expiry = 3600) => {
  try {
    await redisClient.setEx(key, expiry, JSON.stringify(value));
  } catch (error) {
    logger.error(`Cache set error: ${error}`);
  }
};

export const getCache = async (key) => {
  try {
    const value = await redisClient.get(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    logger.error(`Cache get error: ${error}`);
    return null;
  }
};

export const deleteCache = async (key) => {
  try {
    await redisClient.del(key);
  } catch (error) {
    logger.error(`Cache delete error: ${error}`);
  }
};

export default redisClient;
