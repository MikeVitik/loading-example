import type { Preview } from '@storybook/react';
import {
  enableNetworkSimulator,
  disableNetworkSimulator,
} from 'fetch-network-simulator';

type NetworkScenario = 'normal' | 'race-demo';

let currentScenario: NetworkScenario | null = null;

function applyNetworkScenario(scenario: NetworkScenario) {
  if (typeof window === 'undefined') {
    return;
  }

  if (currentScenario === scenario) {
    return;
  }

  // Перезапускаем симулятор с новой конфигурацией.
  disableNetworkSimulator();

  if (scenario === 'normal') {
    enableNetworkSimulator({
      debug: true,
      latency: { enabled: true, delayMs: 300 },
      packetLoss: { enabled: false, lossRate: 0 },
      retry: { enabled: false, maxAttempts: 1, retryDelayMs: 0 },
      staleResponse: { enabled: false, staleProbability: 0 },
      burstControl: { enabled: false, maxConcurrent: 4 },
      networkSpeed: { enabled: false, kbps: 1000 },
    });
  } else {
    // «Хаотичная» сеть для демонстрации гонок и нестабильности.
    enableNetworkSimulator({
      debug: true,
      latency: { enabled: true, delayMs: 1500 },
      packetLoss: { enabled: true, lossRate: 0.1 },
      retry: { enabled: true, maxAttempts: 2, retryDelayMs: 200 },
      staleResponse: { enabled: true, staleProbability: 0.7 },
      burstControl: { enabled: true, maxConcurrent: 1 },
      networkSpeed: { enabled: true, kbps: 200 },
    });
  }

  currentScenario = scenario;
}

export const decorators = [
  (Story, context) => {
    const scenarioName =
      (context.globals.networkScenario as NetworkScenario) ??
      ((context.parameters as any).networkScenario as NetworkScenario) ??
      'race-demo';

    applyNetworkScenario(scenarioName);

    return Story();
  },
];

export const globalTypes = {
  networkScenario: {
    name: 'Network',
    description: 'Network behavior for fetch-network-simulator',
    defaultValue: 'race-demo',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'normal', title: 'Normal latency' },
        { value: 'race-demo', title: 'Race / unstable' },
      ],
    },
  },
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

