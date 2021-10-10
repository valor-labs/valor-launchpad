import * as redis from 'redis';
import { promisify } from 'util';

export class AsyncClient {
	private client: redis.RedisClient;

	constructor(redisClient?: redis.RedisClient) {
		this.client = redisClient;
	}

	public async get(key): Promise<string | undefined> {
		return await promisify(this.client.get).bind(this.client)(key);
	}

	public async set(key, value): Promise<void> {
		await promisify(this.client.set).bind(this.client)(key, value);
	}

	public async setex(key: string, value: string, ttl: number): Promise<void> {
		await promisify(this.client.setex).bind(this.client)(key, ttl, value);
	}

	public async del(...keys: string[]): Promise<void> {
		await promisify(this.client.del).bind(this.client)(...keys);
	}

	public async hget(key, field): Promise<string | undefined> {
		return await promisify(this.client.hget).bind(this.client)(key, field);
	}
}
