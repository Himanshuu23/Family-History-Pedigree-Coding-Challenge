import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://localhost:6379", // Change this if using a cloud Redis service
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis ✅");
  } catch (error) {
    console.error("Redis connection error ❌", error);
  }
};

export { redisClient, connectRedis };
