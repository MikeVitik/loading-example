import React, { useRef, useState } from 'react';
import { ITEMS, type ItemDetails } from './types';
import { ItemDetailsLayout } from './ItemDetailsLayout';

async function realFetchItemDetails(
  id: number,
  signal?: AbortSignal,
): Promise<ItemDetails> {
  // В реальном проекте здесь будет реальный HTTP-запрос.
  // Для Storybook достаточно заглушки, чтобы показать форму кода.
  const response = await fetch(`/api/items/${id}`, { signal });
  if (!response.ok) {
    throw new Error('Network error');
  }
  return response.json() as Promise<ItemDetails>;
}

export const AbortControllerExample: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [details, setDetails] = useState<ItemDetails | null>(null);
  const [loading, setLoading] = useState(false);

  const abortRef = useRef<AbortController | null>(null);

  const handleSelect = (id: number) => {
    setSelectedId(id);
    setLoading(true);

    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    realFetchItemDetails(id, controller.signal)
      .then((data) => {
        if (controller.signal.aborted) {
          return;
        }
        // Дополнительная защита на случай изменения выбранного id
        if (data.id !== id) {
          return;
        }
        setDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        if (controller.signal.aborted) {
          return;
        }
        // В демонстрационных целях достаточно залогировать ошибку
        // eslint-disable-next-line no-console
        console.error(error);
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

