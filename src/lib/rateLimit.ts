const requests = new Map<string, { count: number, timestamp: number }>();

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 10;

export function rateLimit(ip: string): boolean {
    const now = Date.now();
    const record = requests.get(ip);

    if (!record) {
        requests.set(ip, { count: 1, timestamp: now });
        return true;
    }

    if (now - record.timestamp > WINDOW_MS) {
        requests.set(ip, { count: 1, timestamp: now });
        return true;
    }

    if (record.count >= MAX_REQUESTS) {
        return false;
    }

    record.count++;
    return true;
}

