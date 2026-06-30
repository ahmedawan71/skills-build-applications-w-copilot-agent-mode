import { Schema, model, type InferSchemaType } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, lowercase: true, required: true },
    role: { type: String, trim: true, default: 'athlete' },
    weeklyGoalMinutes: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const teamSchema = new Schema(
  {
    name: { type: String, trim: true, required: true },
    coach: { type: String, trim: true, required: true },
    members: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

const activitySchema = new Schema(
  {
    userName: { type: String, trim: true, required: true },
    activityType: { type: String, trim: true, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
  },
  { timestamps: true },
);

const leaderboardSchema = new Schema(
  {
    userName: { type: String, trim: true, required: true },
    teamName: { type: String, trim: true, required: true },
    points: { type: Number, required: true },
  },
  { timestamps: true },
);

const workoutSchema = new Schema(
  {
    title: { type: String, trim: true, required: true },
    category: { type: String, trim: true, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, trim: true, required: true },
  },
  { timestamps: true },
);

export type UserDocument = InferSchemaType<typeof userSchema>;
export type TeamDocument = InferSchemaType<typeof teamSchema>;
export type ActivityDocument = InferSchemaType<typeof activitySchema>;
export type LeaderboardDocument = InferSchemaType<typeof leaderboardSchema>;
export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;

export const User = model<UserDocument>('User', userSchema, 'users');
export const Team = model<TeamDocument>('Team', teamSchema, 'teams');
export const Activity = model<ActivityDocument>('Activity', activitySchema, 'activities');
export const LeaderboardEntry = model<LeaderboardDocument>(
  'LeaderboardEntry',
  leaderboardSchema,
  'leaderboard',
);
export const Workout = model<WorkoutDocument>('Workout', workoutSchema, 'workouts');