import { render } from '@testing-library/react';
import App from './App';

test('renders app with timer component', () => {
  const { container } = render(<App />);
  expect(container.getElementsByClassName("timerContainer").length).toBe(1);
});
