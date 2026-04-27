import React, {
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ITEMS, fetchItemDetails, type ItemDetails } from './types';
import { ItemDetailsLayout } from './ItemDetailsLayout';

export const DeferredValueExample: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const deferredSelectedId = useDeferredValue(selectedId);

  const [details, setDetails] = useState<ItemDetails | null>(null);
  const [loading, setLoading] = useState(false);

  const requestIdRef = useRef(0);

  useEffect(() => {
    if (deferredSelectedId == null) {
      setDetails(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    requestIdRef.current += 1;
    const currentRequestId = requestIdRef.current;

    fetchItemDetails(deferredSelectedId).then((data) => {
      if (currentRequestId !== requestIdRef.current) {
        return;
      }
      setDetails(data);
      setLoading(false);
    });
  }, [deferredSelectedId]);

  return (
    <ItemDetailsLayout
      items={ITEMS}
      selectedId={selectedId}
      onSelect={setSelectedId}
      isLoading={loading}
      details={
        details && (
          <div>
            <div
              style={{
                marginBottom: 8,
                fontSize: 12,
                opacity: 0.7,
              }}
            >
              Selected: {selectedId ?? 'none'} | Deferred:{' '}
              {deferredSelectedId ?? 'none'}
            </div>
            <h3>{details.title}</h3>
            <p>{details.description}</p>
          </div>
        )
      }
    />
  );
};

