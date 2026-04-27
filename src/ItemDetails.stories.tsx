import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { NaiveRaceConditionExample } from './NaiveRaceConditionExample';
import { RequestIdGuardExample } from './RequestIdGuardExample';
import { AbortControllerExample } from './AbortControllerExample';
import { TransitionExample } from './TransitionExample';
import { DeferredValueExample } from './DeferredValueExample';
import { DebounceExample } from './DebounceExample';

const meta: Meta = {
  title: 'LoadingPatterns/ItemDetails',
};

export default meta;

type Story = StoryObj;

export const Naive: Story = {
  name: '1. Naive (race condition)',
  parameters: {
    networkScenario: 'race-demo',
    docs: {
      description: {
        story:
          'Наивный подход без защиты от гонок. При кликах 1→2→3 и хаотичной сети можно увидеть, ' +
          'как в панель деталей попадает устаревший ответ.',
      },
    },
  },
  render: () => <NaiveRaceConditionExample />,
};

export const RequestIdGuard: Story = {
  name: '2. RequestId guard',
  parameters: {
    networkScenario: 'race-demo',
    docs: {
      description: {
        story:
          'Использует счётчик requestId, чтобы игнорировать устаревшие ответы. ' +
          'Даже если ответы приходят не по порядку, отображаются данные только для последнего выбора.',
      },
    },
  },
  render: () => <RequestIdGuardExample />,
};

export const AbortControllerGuard: Story = {
  name: '3. AbortController',
  parameters: {
    networkScenario: 'race-demo',
    docs: {
      description: {
        story:
          'Демонстрация отмены HTTP-запросов с помощью AbortController. ' +
          'При новом выборе прошлый запрос абортируется и не обновляет состояние.',
      },
    },
  },
  render: () => <AbortControllerExample />,
};

export const WithTransitionAndGuard: Story = {
  name: '4. useTransition + guard',
  parameters: {
    networkScenario: 'race-demo',
    docs: {
      description: {
        story:
          'Использует React 18 useTransition для мягкого переключения выбора, ' +
          'при этом защита от гонок по-прежнему реализована через requestId.',
      },
    },
  },
  render: () => <TransitionExample />,
};

export const WithDeferredValueAndGuard: Story = {
  name: '5. useDeferredValue + guard',
  parameters: {
    networkScenario: 'race-demo',
    docs: {
      description: {
        story:
          'Использует useDeferredValue: выбранный элемент подсвечивается сразу, ' +
          'но загрузка деталей привязана к отложенному значению. ' +
          'Защита от гонок реализована через requestId.',
      },
    },
  },
  render: () => <DeferredValueExample />,
};

export const WithDebounceAndGuard: Story = {
  name: '6. debounce + guard',
  parameters: {
    networkScenario: 'race-demo',
    docs: {
      description: {
        story:
          'Добавляет debounce к выбору элемента, чтобы уменьшить количество запросов при быстрых кликах, ' +
          'но по-прежнему использует requestId для игнорирования устаревших ответов.',
      },
    },
  },
  render: () => <DebounceExample />,
};

