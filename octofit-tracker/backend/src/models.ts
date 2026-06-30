import { Schema, model } from 'mongoose';

type NamedDocument = {
  name?: string;
};

const namedDocumentSchema = new Schema<NamedDocument>(
  {
    name: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<NamedDocument>('User', namedDocumentSchema, 'users');
export const Team = model<NamedDocument>('Team', namedDocumentSchema, 'teams');
export const Activity = model<NamedDocument>('Activity', namedDocumentSchema, 'activities');
export const LeaderboardEntry = model<NamedDocument>(
  'LeaderboardEntry',
  namedDocumentSchema,
  'leaderboard_entries',
);
export const Workout = model<NamedDocument>('Workout', namedDocumentSchema, 'workouts');