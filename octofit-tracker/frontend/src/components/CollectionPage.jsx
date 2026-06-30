import { useEffect, useState } from 'react';

import { getCollectionUrl, normalizeCollectionResponse } from '../lib/api.js';

function formatValue(value) {
  if (Array.isArray(value)) {
    return value.join(', ');
  }

  if (value && typeof value === 'object') {
    return JSON.stringify(value);
  }

  return value?.toString?.() ?? '';
}

export function CollectionPage({ collectionName, title, description }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadItems() {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(getCollectionUrl(collectionName));

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const records = normalizeCollectionResponse(payload);

        if (isMounted) {
          setItems(records);
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError instanceof Error ? requestError.message : 'Unable to load data.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadItems();

    return () => {
      isMounted = false;
    };
  }, [collectionName]);

  const columns = items.length > 0 ? Object.keys(items[0]) : [];

  return (
    <section className="card shadow-sm border-0 rounded-4">
      <div className="card-body p-4 p-lg-5">
        <div className="d-flex flex-column flex-md-row gap-3 justify-content-between align-items-md-end mb-4">
          <div>
            <p className="text-uppercase text-secondary fw-semibold mb-2">{title}</p>
            <h2 className="h1 mb-2">{description}</h2>
            <p className="text-secondary mb-0">Fetching from <code>{getCollectionUrl(collectionName)}</code></p>
          </div>
          <div className="badge text-bg-primary rounded-pill px-3 py-2 align-self-start align-self-md-auto">
            {loading ? 'Loading...' : `${items.length} records`}
          </div>
        </div>

        {error ? <div className="alert alert-danger mb-0">{error}</div> : null}

        {!error && !loading && items.length === 0 ? (
          <div className="alert alert-warning mb-0">No records returned from the API.</div>
        ) : null}

        {!error && items.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped align-middle mb-0">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column} scope="col">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item, rowIndex) => (
                  <tr key={item._id ?? rowIndex}>
                    {columns.map((column) => (
                      <td key={column}>{formatValue(item[column])}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </section>
  );
}