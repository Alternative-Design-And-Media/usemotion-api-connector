import { describe, expect, it, vi } from 'vitest';

import { createUsemotionClient } from '../client.js';

describe('createUsemotionClient', () => {
  it('adds API key and query parameters to requests', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));

    const client = createUsemotionClient({
      apiKey: 'test-key',
      baseUrl: 'https://api.usemotion.com/v1',
      fetch: fetchMock,
    });

    await client.request('/tasks', {
      query: {
        cursor: 'abc',
        limit: 25,
      },
    });

    expect(fetchMock).toHaveBeenCalledWith('https://api.usemotion.com/v1/tasks?cursor=abc&limit=25', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 'test-key',
      },
      body: undefined,
    });
  });

  it('sends JSON body as POST when body is provided', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 201 }));

    const client = createUsemotionClient({
      apiKey: 'test-key',
      fetch: fetchMock,
    });

    await client.request('/tasks', {
      body: {
        name: 'Example',
      },
    });

    expect(fetchMock).toHaveBeenCalledWith('https://api.usemotion.com/v1/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 'test-key',
      },
      body: '{"name":"Example"}',
    });
  });
});
