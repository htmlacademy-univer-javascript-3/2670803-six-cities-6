import { Meta, StoryFn } from '@storybook/react';
import ReviewList from '../components/ReviewList/reviewList';
import { ReviewType } from '../components/Review/review';

const mockReviews: ReviewType[] = [
  {
    id: '1',
    userName: 'John Doe',
    userAvatar: '/img/avatar-max.jpg',
    rating: 4.5,
    text: 'This place was amazing! I really enjoyed my stay and would recommend it to anyone.',
    date: '2023-08-12',
  },
  {
    id: '2',
    userName: 'Jane Smith',
    userAvatar: 'img/avatar-angelina.jpg',
    rating: 3.0,
    text: 'It was okay. The location was great, but the room was a bit small.',
    date: '2023-09-01',
  },
  {
    id: '3',
    userName: 'Alice John',
    userAvatar: 'img/avatar-angelina.jpg',
    rating: 5,
    text: 'Perfect stay! Everything was spotless and very comfortable.',
    date: '2023-09-15',
  },
];

const meta: Meta<typeof ReviewList> = {
  title: 'Components/ReviewList',
  component: ReviewList,
};

export default meta;

const Template: StoryFn<typeof ReviewList> = (args) => <ReviewList {...args} />;

export const Default = Template.bind({});
Default.args = {
  reviews: mockReviews,
};
