import { CollectionPage } from './CollectionPage.jsx';

// API endpoint reference:
// https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/
export function Users() {
  return (
    <CollectionPage
      collectionName="users"
      description="Users collection"
      title="Users"
    />
  );
}