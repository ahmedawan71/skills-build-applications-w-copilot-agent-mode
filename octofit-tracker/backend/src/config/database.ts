import mongoose from 'mongoose';

export const port = Number(process.env.PORT ?? 8000);

export const mongoUri =
  process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

export function getApiBaseUrl() {
  const codespaceName = process.env.CODESPACE_NAME;

  // Prefer the Codespaces URL when available, otherwise use local development.
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
}

export function getMongooseConnection() {
  return mongoose.connect(mongoUri);
}