import express from 'express';
import mongoose from 'mongoose';

import { Activity, LeaderboardEntry, Team, User, Workout } from './models.js';
import { getApiBaseUrl, mongoUri, port } from './config.js';

const app = express();
const apiBaseUrl = getApiBaseUrl();

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
    const count = await collectionModel.countDocuments();

    response.json({
      apiBaseUrl,
      collectionName,
      count,
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
  await mongoose.connect(mongoUri);

  app.listen(port, () => {
    console.log(`OctoFit Tracker backend listening on port ${port}`);
  });
}

start().catch((error) => {
  console.error('Failed to start backend', error);
  process.exit(1);
});