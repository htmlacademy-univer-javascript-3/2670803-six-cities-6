import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { MemoizedSortOptions } from '../memoized-component/memoized-component';
import { SortType } from '../types/types';

const meta: Meta<typeof MemoizedSortOptions> = {
  title: 'Components/SortOptions',
  component: MemoizedSortOptions,
  tags: ['autodocs'],
  argTypes: {
    currentSort: {
      control: 'select',
      options: ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'] as SortType[],
      description: 'Текущий выбранный тип сортировки',
    },
    onSortChange: {
      action: 'sort changed',
      description: 'Callback при изменении сортировки',
    },
  },
  args: {
    currentSort: 'Popular',
    onSortChange: fn(),
  },
} satisfies Meta<typeof MemoizedSortOptions>;

export default meta;
type Story = StoryObj<typeof MemoizedSortOptions>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Компонент сортировки в закрытом состоянии',
      },
    },
  },
};

export const Opened: Story = {
  render: (args) => (
    <div style={{ position: 'relative', padding: '50px' }}>
      <MemoizedSortOptions {...args} />
      <style>
        {`
          .places__options {
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
          }
        `}
      </style>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Компонент сортировки в открытом состоянии (демонстрация)',
      },
    },
  },
};

export const AllSortTypes: Story = {
  render: () => {
    const sorts: SortType[] = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
        {sorts.map((sort) => (
          <div key={sort}>
            <p style={{ marginBottom: '5px', fontSize: '12px', color: '#666' }}>Current: {sort}</p>
            <MemoizedSortOptions
              currentSort={sort}
              onSortChange={fn()}
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Все возможные состояния выбранной сортировки',
      },
    },
  },
};

export const ActiveOptionHighlighted: Story = {
  render: () => (
    <div style={{ position: 'relative', padding: '50px' }}>
      <MemoizedSortOptions
        currentSort="Price: high to low"
        onSortChange={fn()}
      />
      <style>
        {`
          .places__options {
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
          }
          .places__option--active {
            background-color: #e6e6e6 !important;
          }
        `}
      </style>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация выделения активного варианта сортировки',
      },
    },
  },
};

export const InContext: Story = {
  decorators: [
    (Story) => (
      <div style={{
        backgroundColor: '#f5f5f5',
        padding: '20px',
        maxWidth: '400px'
      }}
      >
        <header className="cities__places-wrapper" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 className="cities__places-title" style={{ margin: 0 }}>
              312 places to stay in Amsterdam
            </h2>
          </div>
          <Story />
        </header>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Компонент в контексте заголовка страницы',
      },
    },
  },
};
