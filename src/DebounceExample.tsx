import React, { useEffect, useRef, useState } from "react";
import { ItemDetailsLayout } from "./ItemDetailsLayout";
import { ITEMS, fetchItemDetails, type ItemDetails } from "./types";

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handle);
    };
  }, [value, delay]);

  return debouncedValue;
}

export const DebounceExample: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const debouncedSelectedId = useDebouncedValue(selectedId, 1300);

  const [details, setDetails] = useState<ItemDetails | null>(null);
  const [loading, setLoading] = useState(false);

  const requestIdRef = useRef(0);

  useEffect(() => {
    if (debouncedSelectedId == null) {
      setDetails(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    requestIdRef.current += 1;
    const currentRequestId = requestIdRef.current;

    fetchItemDetails(debouncedSelectedId).then((data) => {
      if (currentRequestId !== requestIdRef.current) {
        return;
      }
      setDetails(data);
      setLoading(false);
    });
  }, [debouncedSelectedId]);

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
              Selected (raw): {selectedId ?? "none"} | Debounced:{" "}
              {debouncedSelectedId ?? "none"}
            </div>
            <h3>{details.title}</h3>
            <p>{details.description}</p>
          </div>
        )
      }
    />
  );
};
