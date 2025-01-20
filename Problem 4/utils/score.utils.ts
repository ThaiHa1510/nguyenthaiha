import Redis from 'ioredis';

const redis = new Redis();

const SCOREBOARD_KEY = 'scoreboard';

// Function to update the user score and maintain the top 10
export async function updateScoreToRedis(userId: string, scoreIncrease: number): Promise<void> {
    await redis.zincrby(SCOREBOARD_KEY, scoreIncrease, userId);

    const totalUsers = await redis.zcard(SCOREBOARD_KEY);

    if (totalUsers > 10) {
        await redis.zremrangebyrank(SCOREBOARD_KEY, 0, totalUsers - 11);
    }
}

// Function to get the top 10 scores
export async function getTopScoresFromRedis(): Promise<{ userId: string; score: number }[]> {
    const topScores = await redis.zrevrange(SCOREBOARD_KEY, 0, 9, 'WITHSCORES');
    
    const result: { userId: string; score: number }[] = [];
    for (let i = 0; i < topScores.length; i += 2) {
        result.push({
            userId: topScores[i],
            score: parseFloat(topScores[i + 1]),
        });
    }
    return result;
}
