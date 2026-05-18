# usemotion-api-connector

Type-safe UseMotion REST API connector for Node.js and edge runtimes.

## Installation

```bash
npm install @alternative-design-and-media/usemotion-api-connector
```

## Usage

```ts
import { createUsemotionClient } from '@alternative-design-and-media/usemotion-api-connector';

const client = createUsemotionClient({ apiKey: process.env.USEMOTION_API_KEY! });

const response = await client.request('/tasks', {
  query: { limit: 10 },
});
```

## Development

```bash
npm install
npm run typecheck
npm test
npm run build
```
