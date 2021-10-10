import { RedisClient } from 'redis';
import {AsyncClient} from './redis';

type RedisKeyType = 'none' | 'string' | 'list' | 'set' | 'zset' | 'hash';


export interface ISessionStore {

	set(key: string, value: any, ttl?: number): Promise<any>;

	setJson(key: string, value: any, ttl?: number): Promise<any>;

	get(key: string): Promise<any>;

	// get from json, not json
	getJson(key: string): Promise<any>;

	delete(key: string): Promise<any>;

	keys(keyPattern: string): Promise<any>;

	hget(key: string, field: string): Promise<any>;

	type(key: string): Promise<RedisKeyType>;
}

export class RedisSessionStore implements ISessionStore {
	public static redisSessionStore: ISessionStore;

	public static getInstance(redis: RedisClient) {
		if (this.redisSessionStore) {
			return this.redisSessionStore;
		}
		this.redisSessionStore = new RedisSessionStore(redis);

		return this.redisSessionStore;
	}
	private redis: RedisClient;
	private ttl: number = 60 * 60; // 1 hour
	private asyncClient: AsyncClient;

	constructor(redis: RedisClient) {
		this.redis = redis;
		this.asyncClient = new AsyncClient(redis);
	}

	public set(key: string, value: any, ttl?: number) {
		return new Promise((resolve, reject) => {
			this.redis
				.multi()
				.hmset(key, value)
				.expire(key, ttl || this.ttl)
				.exec((err, replies) => {
					if (err) {
						return reject(err);
					}
					resolve(replies);
				});
		});
	}

	public setJson(key: string, value: object | string, ttl?: number) {
		return new Promise((resolve, reject) => {
			this.redis
				.multi()
				.set(key, typeof value === 'string' ? value : JSON.stringify(value))
				.expire(key, ttl || this.ttl)
				.exec((err, replies) => {
					if (err) {
						reject(err);
					}
					resolve(replies);
				});
		});
	}

	public get(key: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.redis.hgetall(key, (err, reply) => {
				if (err) {
					return reject(err);
				}
				resolve(reply);
			});
		});
	}

	public getJson(key: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.redis.get(key, (err, reply) => {
				if (err) {
					reject(err);
				}
				resolve(typeof reply === 'string' ? JSON.parse(reply) : reply);
			});
		});
	}

	public delete(key: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.redis.del(key, (err, reply) => {
				if (err) {
					return reject(err);
				} else {
					resolve(reply);
				}
			});
		});
	}

	public keys(keyPattern: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.redis.keys(keyPattern, (err, reply) => {
				if (err) return reject(err);

				resolve(reply);
			});
		});
	}

	public hget(key: string, field: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.redis.hget(key, field, (err, reply) => {
				if (err) {
					reject(err);
				} else {
					resolve(reply);
				}
			});
		});
	}

	public type(key: string): Promise<RedisKeyType> {
		return new Promise((resolve, reject) => {
			this.redis.type(key, (err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res as RedisKeyType);
				}
			});
		});
	}
}
