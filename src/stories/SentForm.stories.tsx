import { Meta, StoryFn } from '@storybook/react';
import ReviewForm from '../components/SentForm/sentForm';

const meta: Meta<typeof ReviewForm> = {
  title: 'Components/ReviewForm',
  component: ReviewForm,
};

export default meta;

const Template: StoryFn<typeof ReviewForm> = (args) => <ReviewForm {...args} />;

export const Default = Template.bind({});
Default.args = {};
