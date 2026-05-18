import type { RequestOptions, UsemotionClientOptions } from './types.js';

const DEFAULT_BASE_URL = 'https://api.usemotion.com/v1';

const buildQuery = (query: RequestOptions['query']): string => {
  if (!query) {
    return '';
  }

  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined) {
      continue;
    }

    params.set(key, String(value));
  }

  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
};

export class UsemotionClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly fetchImpl: typeof fetch;

  constructor(options: UsemotionClientOptions) {
    this.apiKey = options.apiKey;
    this.baseUrl = options.baseUrl ?? DEFAULT_BASE_URL;
    this.fetchImpl = options.fetch ?? globalThis.fetch;

    if (!this.apiKey) {
      throw new Error('apiKey is required');
    }

    if (!this.fetchImpl) {
      throw new Error('fetch implementation is required');
    }
  }

  request(path: string, options: RequestOptions = {}): Promise<Response> {
    const url = `${this.baseUrl}${path}${buildQuery(options.query)}`;

    return this.fetchImpl(url, {
      method: options.body ? 'POST' : 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey,
        ...options.headers,
      },
      ...(options.body ? { body: JSON.stringify(options.body) } : {}),
    });
  }
}

export const createUsemotionClient = (options: UsemotionClientOptions): UsemotionClient =>
  new UsemotionClient(options);
