import type { Meta, StoryObj } from '@storybook/react';
import Spinner from './spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Текст под спиннером',
    },
    isLoading: {
      control: 'boolean',
      description: 'Флаг загрузки',
    },
    minDuration: {
      control: 'number',
      description: 'Минимальная продолжительность показа спиннера (мс)',
    },
  },
  args: {
    text: 'Loading',
    isLoading: true,
    minDuration: 1500,
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Стандартный спиннер с текстом "Loading"',
      },
    },
  },
};

export const CustomText: Story = {
  args: {
    text: 'Fetching data...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Спиннер с кастомным текстом',
      },
    },
  },
};

export const ShortLoading: Story = {
  args: {
    text: 'Quick load',
    minDuration: 500,
  },
  parameters: {
    docs: {
      description: {
        story: 'Спиннер с короткой минимальной продолжительностью',
      },
    },
  },
};

export const LongLoading: Story = {
  args: {
    text: 'Please wait...',
    minDuration: 3000,
  },
  parameters: {
    docs: {
      description: {
        story: 'Спиннер с длинной минимальной продолжительностью',
      },
    },
  },
};

export const DifferentStates: Story = {
  render: () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '30px',
      padding: '40px',
      backgroundColor: '#f5f5f5'
    }}
    >
      <div>
        <h4 style={{ marginBottom: '10px' }}>Loading</h4>
        <Spinner isLoading text="Loading data" />
      </div>
      <div>
        <h4 style={{ marginBottom: '10px' }}>Not Loading</h4>
        <div style={{ padding: '20px', backgroundColor: 'white', border: '1px solid #ddd' }}>
          <p>Spinner should be hidden when isLoading=false</p>
          <Spinner isLoading={false} text="This won't show" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Разные состояния спиннера',
      },
    },
  },
};

export const WithDifferentBackgrounds: Story = {
  render: () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
      padding: '40px'
    }}
    >
      <div style={{
        backgroundColor: '#f5f5f5',
        padding: '40px',
        textAlign: 'center'
      }}
      >
        <Spinner isLoading text="Light background" />
      </div>
      <div style={{
        backgroundColor: '#333',
        padding: '40px',
        textAlign: 'center'
      }}
      >
        <Spinner isLoading text="Dark background" />
      </div>

      <div style={{
        backgroundColor: '#1976d2',
        padding: '40px',
        textAlign: 'center'
      }}
      >
        <Spinner isLoading text="Blue background" />
      </div>

      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '40px',
        textAlign: 'center'
      }}
      >
        <Spinner isLoading text="Gradient background" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Спиннер на разных фонах',
      },
    },
  },
};

export const CenteredOnPage: Story = {
  decorators: [
    (Story) => (
      <div style={{
        height: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Спиннер по центру страницы',
      },
    },
  },
};
