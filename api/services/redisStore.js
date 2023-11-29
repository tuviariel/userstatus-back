const RedisStore = require("connect-redis").default;
const Redis = require('redis');

const redisClient = Redis.createClient({
    password: process.env.REDIS_CLIENT_PW,
    socket: {
        host: 'redis-16001.c322.us-east-1-2.ec2.cloud.redislabs.com',
        port: 16001
    }
});
redisClient.connect();
redisClient.on('error', err => console.log('Redis Client Error:', err));
redisClient.on('connect', () => console.log('Connected to redis successfully'));

const redisStore = new RedisStore({ client: redisClient });
module.exports = redisStore;