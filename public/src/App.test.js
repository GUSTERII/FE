import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './components/Navbar';

test('renders Navbar without crashing', () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );
});