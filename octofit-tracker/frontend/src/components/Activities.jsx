import { CollectionPage } from './CollectionPage.jsx';

// API endpoint reference:
// https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/
export function Activities() {
  return (
    <CollectionPage
      collectionName="activities"
      description="Activities collection"
      title="Activities"
    />
  );
}