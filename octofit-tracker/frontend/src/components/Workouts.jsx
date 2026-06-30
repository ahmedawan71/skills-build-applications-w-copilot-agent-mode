import { CollectionPage } from './CollectionPage.jsx';

// API endpoint reference:
// https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/
export function Workouts() {
  return (
    <CollectionPage
      collectionName="workouts"
      description="Workouts collection"
      title="Workouts"
    />
  );
}