import React from 'react';
import type { Item } from './types';

type ItemDetailsLayoutProps = {
  items: Item[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  isLoading: boolean;
  details: React.ReactNode;
};

export const ItemDetailsLayout: React.FC<ItemDetailsLayoutProps> = ({
  items,
  selectedId,
  onSelect,
  isLoading,
  details,
}) => {
  return (
    <div style={{ display: 'flex', gap: 16, width: 640 }}>
      <ul style={{ width: 200, listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item) => {
          const isActive = item.id === selectedId;
          return (
            <li key={item.id}>
              <button
                type="button"
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 12px',
                  marginBottom: 4,
                  borderRadius: 4,
                  border: isActive ? '2px solid #0070f3' : '1px solid #ccc',
                  background: isActive ? '#e6f0ff' : '#fff',
                  cursor: 'pointer',
                }}
                onClick={() => onSelect(item.id)}
              >
                {item.title}
              </button>
            </li>
          );
        })}
      </ul>
      <div
        style={{
          flex: 1,
          minHeight: 140,
          borderRadius: 4,
          border: '1px solid #ccc',
          padding: 12,
        }}
      >
        {isLoading ? (
          <div style={{ opacity: 0.6 }}>
            <div
              style={{
                width: '60%',
                height: 20,
                borderRadius: 4,
                background:
                  'linear-gradient(90deg, #f2f2f2 0%, #e0e0e0 50%, #f2f2f2 100%)',
                marginBottom: 8,
              }}
            />
            <div
              style={{
                width: '90%',
                height: 14,
                borderRadius: 4,
                background:
                  'linear-gradient(90deg, #f2f2f2 0%, #e0e0e0 50%, #f2f2f2 100%)',
                marginBottom: 4,
              }}
            />
            <div
              style={{
                width: '80%',
                height: 14,
                borderRadius: 4,
                background:
                  'linear-gradient(90deg, #f2f2f2 0%, #e0e0e0 50%, #f2f2f2 100%)',
              }}
            />
          </div>
        ) : (
          details ?? <div>Ничего не выбрано</div>
        )}
      </div>
    </div>
  );
};

