export interface Cache {
    get<T>(key: string): T | undefined;
    set<T>(key: string, value: T, ttl: number): void;
    exists(key: string): boolean;
    del(key: string): void;
}

export class InMemoryCache implements Cache {
    public constructor(readonly store: Record<string, any> = {}) {}

    public get<T>(key: string): T | undefined {
        return this.store[key];
    }

    public set<T>(key: string, value: T, ttl?: number): void {
        this.store[key] = value;

        if (ttl) {
            setTimeout(() => {
                this.del(key);
            }, ttl);
        }
    }

    public del(key: string): void {
        delete this.store[key];
    }

    public exists(key: string): boolean {
        return !!this.get(key);
    }
}

let cache;

export const getCache = () => {
    if (!cache) {
        cache = new InMemoryCache();
        return cache;
    }

    return cache;
};
