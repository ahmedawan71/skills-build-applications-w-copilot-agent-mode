import { CollectionPage } from './CollectionPage.jsx';

// API endpoint reference:
// https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/
export function Teams() {
  return (
    <CollectionPage
      collectionName="teams"
      description="Teams collection"
      title="Teams"
    />
  );
}