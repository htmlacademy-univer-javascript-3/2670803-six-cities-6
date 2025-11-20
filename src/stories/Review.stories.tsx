import { Meta, StoryFn } from '@storybook/react';
import Review, { ReviewType } from '../components/Review/review';

const mockReview: ReviewType = {
  id: '1',
  userName: 'Max',
  userAvatar: 'img/avatar-max.jpg',
  rating: 4,
  text: 'A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam.',
  date: '2019-04-24',
};

const anotherReview: ReviewType = {
  id: '2',
  userName: 'Anna',
  userAvatar: 'img/avatar-angelina.jpg',
  rating: 5,
  text: 'Amazing apartment! Very clean and close to city center.',
  date: '2020-06-12',
};

const meta: Meta<typeof Review> = {
  title: 'Components/Review',
  component: Review,
};

export default meta;

const Template: StoryFn<typeof Review> = (args) => <ul className="reviews__list"><Review {...args} /></ul>;

export const Default = Template.bind({});
Default.args = {
  review: mockReview,
};

export const Another = Template.bind({});
Another.args = {
  review: anotherReview,
};
