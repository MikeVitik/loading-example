import React, { useRef, useState, useTransition } from 'react';
import { ITEMS, fetchItemDetails, type ItemDetails } from './types';
import { ItemDetailsLayout } from './ItemDetailsLayout';

export const TransitionExample: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [details, setDetails] = useState<ItemDetails | null>(null);

  const [isPending, startTransition] = useTransition();
  const requestIdRef = useRef(0);

  const handleSelect = (id: number) => {
    startTransition(() => {
      setSelectedId(id);
    });

    requestIdRef.current += 1;
    const currentRequestId = requestIdRef.current;

    fetchItemDetails(id).then((data) => {
      if (currentRequestId !== requestIdRef.current) {
        return;
      }
      setDetails(data);
    });
  };

  const loading = isPending || (selectedId != null && !details);

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

