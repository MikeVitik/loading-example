export type Item = {
  id: number;
  title: string;
};

export type ItemDetails = {
  id: number;
  title: string;
  description: string;
};

export const ITEMS: Item[] = [
  { id: 1, title: 'Item 1' },
  { id: 2, title: 'Item 2' },
  { id: 3, title: 'Item 3' },
  { id: 4, title: 'Item 4' },
];

// Базовая функция, через которую ходят все примеры.
// В реальном Storybook она должна использовать fetch, обёрнутый fetch-network-simulator.
export async function fetchItemDetails(id: number): Promise<ItemDetails> {
  // Заглушка без реального API, чтобы примеры были самодостаточными.
  // Здесь имитируется небольшая рандомная задержка.
  const delay = 300 + Math.random() * 700;

  await new Promise((resolve) => setTimeout(resolve, delay));

  return {
    id,
    title: `Item ${id}`,
    description: `Details for item ${id} (delay: ${Math.round(delay)}ms)`,
  };
}

