import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Services from '../pages/Services';

// Mock the mockApi module
jest.mock('../lib/mockApi', () => ({
  getServices: jest.fn().mockResolvedValue([
    { id: 1, name: 'Test Cut', price: 30, durationMins: 30, description: 'Test description' }
  ])
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

test('renders services page with title', () => {
  renderWithRouter(<Services />);
  expect(screen.getByText('Our Services')).toBeInTheDocument();
});

test('renders services from mock data', async () => {
  renderWithRouter(<Services />);
  expect(await screen.findByText('Test Cut')).toBeInTheDocument();
});
