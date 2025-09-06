import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders church map application', () => {
  render(<App />);
  // Check that the main app container is rendered
  const appElement = document.querySelector('.app');
  expect(appElement).toBeInTheDocument();
});
