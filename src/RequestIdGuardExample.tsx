import React, { useRef, useState } from 'react';
import { ITEMS, fetchItemDetails, type ItemDetails } from './types';
import { ItemDetailsLayout } from './ItemDetailsLayout';

export const RequestIdGuardExample: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [details, setDetails] = useState<ItemDetails | null>(null);
  const [loading, setLoading] = useState(false);

  const requestIdRef = useRef(0);

  const handleSelect = (id: number) => {
    setSelectedId(id);
    setLoading(true);

    requestIdRef.current += 1;
    const currentRequestId = requestIdRef.current;

    fetchItemDetails(id).then((data) => {
      if (currentRequestId !== requestIdRef.current) {
        // Устаревший ответ — игнорируем
        return;
      }
      setDetails(data);
      setLoading(false);
    });
  };

  return (
    <ItemDetailsLayout
      items={ITEMS}
      selectedId={selectedId}
      onSelect={handleSelect}
      isLoading={loading}
      details={
        details && (
          <div>
            <h3>{details.title}</h3>
            <p>{details.description}</p>
          </div>
        )
      }
    />
  );
};

