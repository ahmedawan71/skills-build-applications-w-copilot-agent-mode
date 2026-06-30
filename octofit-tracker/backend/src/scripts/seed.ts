import mongoose from 'mongoose';

import {
  Activity,
  LeaderboardEntry,
  Team,
  User,
  Workout,
} from '../models.js';
import { mongoUri } from '../config.js';

/**
 * Seed the octofit_db database with test data.
 */
async function seed() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(mongoUri);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  await User.insertMany([
    { name: 'Ava Patel', email: 'ava.patel@example.com', role: 'captain', weeklyGoalMinutes: 240 },
    { name: 'Mateo Rivera', email: 'mateo.rivera@example.com', role: 'athlete', weeklyGoalMinutes: 180 },
    { name: 'Jordan Kim', email: 'jordan.kim@example.com', role: 'athlete', weeklyGoalMinutes: 210 },
  ]);

  await Team.insertMany([
    {
      name: 'Summit Striders',
      coach: 'Coach Elena',
      members: ['Ava Patel', 'Jordan Kim'],
    },
    {
      name: 'Pulse Pursuit',
      coach: 'Coach Marcus',
      members: ['Mateo Rivera'],
    },
  ]);

  await Activity.insertMany([
    {
      userName: 'Ava Patel',
      activityType: 'Strength Training',
      durationMinutes: 45,
      caloriesBurned: 320,
    },
    {
      userName: 'Mateo Rivera',
      activityType: 'Cycling',
      durationMinutes: 60,
      caloriesBurned: 540,
    },
    {
      userName: 'Jordan Kim',
      activityType: 'Yoga',
      durationMinutes: 30,
      caloriesBurned: 180,
    },
  ]);

  await LeaderboardEntry.insertMany([
    { userName: 'Mateo Rivera', teamName: 'Pulse Pursuit', points: 1280 },
    { userName: 'Ava Patel', teamName: 'Summit Striders', points: 1215 },
    { userName: 'Jordan Kim', teamName: 'Summit Striders', points: 1090 },
  ]);

  await Workout.insertMany([
    {
      title: 'Peak Cardio Intervals',
      category: 'Cardio',
      durationMinutes: 35,
      difficulty: 'Intermediate',
    },
    {
      title: 'Full Body Power Circuit',
      category: 'Strength',
      durationMinutes: 50,
      difficulty: 'Advanced',
    },
    {
      title: 'Recovery Mobility Flow',
      category: 'Mobility',
      durationMinutes: 25,
      difficulty: 'Beginner',
    },
  ]);

  console.log('Seed complete: users, teams, activities, leaderboard, and workouts inserted.');

  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Failed to seed octofit_db database with test data', error);
  process.exit(1);
});