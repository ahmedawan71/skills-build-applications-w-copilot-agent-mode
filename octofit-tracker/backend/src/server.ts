import express from 'express';
import mongoose from 'mongoose';

import { Activity, LeaderboardEntry, Team, User, Workout } from './models.js';
import { getApiBaseUrl, getMongooseConnection, port } from './config/database.js';

const app = express();
const apiBaseUrl = getApiBaseUrl();
// CODESPACE_NAME drives the Codespaces URL when the backend runs remotely.
// Example codespace URL: https://$CODESPACE_NAME-8000.app.github.dev

app.use(express.json());

app.get('/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/config', (_request, response) => {
  response.json({ apiBaseUrl, port });
});

function registerCollectionRoute(
  path: string,
  collectionName: string,
  collectionModel:
    | typeof User
    | typeof Team
    | typeof Activity
    | typeof LeaderboardEntry
    | typeof Workout,
) {
  app.get(path, async (_request, response) => {
    const documents = await collectionModel.find({}).sort({ createdAt: -1 }).lean();

    response.json({
      apiBaseUrl,
      collectionName,
      count: documents.length,
      documents,
      message: `${collectionName} route is ready`,
    });
  });

  app.post(path, async (request, response) => {
    const createdDocument = await collectionModel.create(request.body ?? {});

    response.status(201).json({
      apiBaseUrl,
      collectionName,
      createdDocument,
      message: `${collectionName} record created`,
    });
  });
}

registerCollectionRoute('/api/users/', 'users', User);
registerCollectionRoute('/api/teams/', 'teams', Team);
registerCollectionRoute('/api/activities/', 'activities', Activity);
registerCollectionRoute('/api/leaderboard/', 'leaderboard', LeaderboardEntry);
registerCollectionRoute('/api/workouts/', 'workouts', Workout);

async function start() {
  await getMongooseConnection();

  app.listen(port, () => {
    console.log(`OctoFit Tracker backend listening on port ${port}`);
  });
}

start().catch((error) => {
  console.error('Failed to start backend', error);
  process.exit(1);
});