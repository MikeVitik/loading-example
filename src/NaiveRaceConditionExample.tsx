import React, { useState } from 'react';
import { ITEMS, fetchItemDetails, type ItemDetails } from './types';
import { ItemDetailsLayout } from './ItemDetailsLayout';

export const NaiveRaceConditionExample: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [details, setDetails] = useState<ItemDetails | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = (id: number) => {
    setSelectedId(id);
    setLoading(true);

    // Наивный вариант: никак не защищаемся от гонок ответов
    fetchItemDetails(id).then((data) => {
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

