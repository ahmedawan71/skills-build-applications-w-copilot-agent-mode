const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

export { codespaceName };

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://127.0.0.1:8000/api';

export const codespaceNote = codespaceName
  ? 'Codespaces URL mode is active.'
  : 'VITE_CODESPACE_NAME is unset, so the app uses the localhost API fallback.';

export function getCollectionUrl(collectionName) {
  return `${apiBaseUrl}/${collectionName}/`;
}

export function normalizeCollectionResponse(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.data?.results)) {
    return payload.data.results;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  return [];
}