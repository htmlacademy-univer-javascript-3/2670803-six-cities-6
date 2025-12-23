import { store } from './index';

it('store has correct reducers', () => {
  const state = store.getState();
  expect(state).toHaveProperty('user');
  expect(state).toHaveProperty('comments');
  expect(state).toHaveProperty('favorites');
  expect(state).toHaveProperty('offer');
});
