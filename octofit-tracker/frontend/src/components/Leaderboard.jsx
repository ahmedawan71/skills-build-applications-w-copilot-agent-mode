import { CollectionPage } from './CollectionPage.jsx';

// API endpoint reference:
// https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/
export function Leaderboard() {
  return (
    <CollectionPage
      collectionName="leaderboard"
      description="Leaderboard collection"
      title="Leaderboard"
    />
  );
}