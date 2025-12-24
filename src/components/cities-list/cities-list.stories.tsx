import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import CitiesList from './cities-list';
import { BrowserRouter } from 'react-router-dom';
import { CitiesListProps } from './cities-list';

const CitiesListWithRouter: React.FC<CitiesListProps> = (props) => (
  <BrowserRouter>
    <CitiesList {...props} />
  </BrowserRouter>
);

const meta: Meta<typeof CitiesListWithRouter> = {
  title: 'Components/CitiesList',
  component: CitiesListWithRouter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentCity: {
      control: 'select',
      options: ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'],
    },
    onCityChange: {
      action: 'cityChanged',
    },
  },
  args: {
    currentCity: 'Paris',
    onCityChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAmsterdamSelected: Story = {
  args: {
    currentCity: 'Amsterdam',
  },
};

export const WithHamburgSelected: Story = {
  args: {
    currentCity: 'Hamburg',
  },
};
