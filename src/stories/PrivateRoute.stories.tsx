import { Meta, StoryFn } from '@storybook/react';
import PrivateRoute from '../components/PrivateRoute/privateRoute';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

const meta: Meta<typeof PrivateRoute> = {
  title: 'Components/PrivateRoute',
  component: PrivateRoute,
};

export default meta;

const Template: StoryFn<typeof PrivateRoute> = (args) => (
  <MemoryRouter initialEntries={['/protected']}>
    <Routes>
      <Route path="/login" element={<div>Login Page</div>} />
      <Route element={<PrivateRoute {...args} />}>
        <Route path="/protected" element={<div>Protected Content</div>} />
      </Route>
    </Routes>
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {
  isAuthorized: true,
};
