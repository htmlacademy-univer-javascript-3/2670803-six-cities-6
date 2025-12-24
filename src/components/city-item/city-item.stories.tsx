import type { Meta, StoryObj } from '@storybook/react';
import { fn, userEvent, within } from '@storybook/test';
import CityItem from './city-item';
import { MemoryRouter } from 'react-router-dom';
import { StoryFn } from '@storybook/react';

const withMemoryRouter = (Story: StoryFn) => (
  <MemoryRouter>
    <ul style={{
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      gap: '10px'
    }}
    >
      <Story />
    </ul>
  </MemoryRouter>
);

const meta = {
  title: 'Components/CityItem',
  component: CityItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Элемент города в списке городов для фильтрации. При клике вызывает onCityChange с названием города.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    city: {
      control: 'text',
      description: 'Название города для отображения',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    currentCity: {
      control: 'text',
      description: 'Текущий выбранный город (для подсветки активного элемента)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    onCityChange: {
      action: 'cityChanged',
      description: 'Обработчик изменения города',
      table: {
        type: { summary: '(city: string) => void' },
        category: 'Events',
      },
    },
  },
  args: {
    city: 'Paris',
    currentCity: 'Amsterdam',
    onCityChange: fn(),
  },
} satisfies Meta<typeof CityItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    city: 'Paris',
    currentCity: 'Amsterdam',
  },
  decorators: [withMemoryRouter],
  parameters: {
    docs: {
      description: {
        story: 'Обычное состояние - город не выбран',
      },
    },
  },
};

export const Active: Story = {
  args: {
    city: 'Paris',
    currentCity: 'Paris',
  },
  decorators: [withMemoryRouter],
  parameters: {
    docs: {
      description: {
        story: 'Активное состояние - город выбран (должен иметь класс tabs__item--active)',
      },
    },
  },
};

export const DifferentCity: Story = {
  args: {
    city: 'Cologne',
    currentCity: 'Paris',
  },
  decorators: [withMemoryRouter],
  name: 'Cologne (Not Selected)',
  parameters: {
    docs: {
      description: {
        story: 'Элемент с другим городом (Кёльн)',
      },
    },
  },
};

export const AmsterdamActive: Story = {
  args: {
    city: 'Amsterdam',
    currentCity: 'Amsterdam',
  },
  decorators: [withMemoryRouter],
  name: 'Amsterdam Selected',
  parameters: {
    docs: {
      description: {
        story: 'Амстердам выбран как текущий город',
      },
    },
  },
};

export const HamburgSelected: Story = {
  args: {
    city: 'Hamburg',
    currentCity: 'Hamburg',
  },
  decorators: [withMemoryRouter],
  name: 'Hamburg Selected',
  parameters: {
    docs: {
      description: {
        story: 'Гамбург выбран как текущий город',
      },
    },
  },
};

export const BrusselsSelected: Story = {
  args: {
    city: 'Brussels',
    currentCity: 'Brussels',
  },
  decorators: [withMemoryRouter],
  name: 'Brussels Selected',
  parameters: {
    docs: {
      description: {
        story: 'Брюссель выбран как текущий город',
      },
    },
  },
};

export const DusseldorfSelected: Story = {
  args: {
    city: 'Dusseldorf',
    currentCity: 'Dusseldorf',
  },
  decorators: [withMemoryRouter],
  name: 'Dusseldorf Selected',
  parameters: {
    docs: {
      description: {
        story: 'Дюссельдорф выбран как текущий город',
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    city: 'Amsterdam',
    currentCity: 'Paris',
    onCityChange: fn(),
  },
  decorators: [withMemoryRouter],
  parameters: {
    docs: {
      description: {
        story: 'Кликните на элемент чтобы увидеть вызов onCityChange в Actions panel',
      },
    },
    controls: {
      expanded: true,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link');
    await userEvent.click(link);
  },
};

export const AllStates: Story = {
  render: (args) => {
    const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

    return (
      <MemoryRouter>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          maxWidth: '600px'
        }}
        >
          {cities.map((city) => (
            <CityItem
              key={city}
              city={city}
              currentCity="Paris"
              onCityChange={args.onCityChange}
            />
          ))}
        </ul>
      </MemoryRouter>
    );
  },
  name: 'All Cities with Paris Selected',
  parameters: {
    docs: {
      description: {
        story: 'Пример всех городов с выделенным Paris. Обратите внимание что только Paris имеет активный класс.',
      },
    },
  },
};

export const AllStatesWithDifferentSelection: Story = {
  render: (args) => {
    const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

    return (
      <MemoryRouter>
        <div>
          <h4 style={{ marginBottom: '16px' }}>Каждый город по очереди выбран:</h4>
          {cities.map((selectedCity) => (
            <div key={selectedCity} style={{ marginBottom: '24px' }}>
              <h5 style={{ marginBottom: '8px' }}>Текущий город: {selectedCity}</h5>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
              }}
              >
                {cities.map((city) => (
                  <CityItem
                    key={`${selectedCity}-${city}`}
                    city={city}
                    currentCity={selectedCity}
                    onCityChange={args.onCityChange}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </MemoryRouter>
    );
  },
  name: 'All Selection States',
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация всех возможных состояний выбора для каждого города',
      },
    },
  },
};

export const ClickToSelect: Story = {
  args: {
    city: 'Paris',
    currentCity: 'Amsterdam',
    onCityChange: fn(),
  },
  decorators: [withMemoryRouter],
  name: 'Click to Select Demo',
  parameters: {
    docs: {
      description: {
        story: 'Кликните чтобы увидеть как меняется состояние выбора. В реальном приложении состояние будет меняться через пропс currentCity.',
      },
    },
  },
};

export const Playground: Story = {
  args: {
    city: 'Paris',
    currentCity: 'Paris',
    onCityChange: fn(),
  },
  decorators: [withMemoryRouter],
  parameters: {
    docs: {
      description: {
        story: 'Используйте Controls panel для изменения пропсов и тестирования различных состояний',
      },
    },
  },
};
