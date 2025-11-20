import { Meta, StoryFn } from '@storybook/react';
import SortOptions, { SortType } from '../components/SortOptions/sortOptions';
import { useState } from 'react';

const meta: Meta<typeof SortOptions> = {
  title: 'Components/SortOptions',
  component: SortOptions,
};

export default meta;

const Template: StoryFn<typeof SortOptions> = (args) => {
  const [currentSort, setCurrentSort] = useState<SortType>(args.currentSort);

  return (
    <SortOptions
      {...args}
      currentSort={currentSort}
      onSortChange={setCurrentSort}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  currentSort: 'Popular',
};
