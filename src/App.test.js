import { render, screen } from '@testing-library/react';
import App from './components/App.js';

test('renders learn react link', () => {
  render(<App />);
  // const linkElement = screen.getByText(/Picasso/i);
  // expect(linkElement).toBeInTheDocument();
});
