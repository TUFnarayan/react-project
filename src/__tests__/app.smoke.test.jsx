import { render, screen } from '@testing-library/react';
import App from '../App';

test("renders Narayan's Task Manager title", () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /narayan's task manager/i })
  ).toBeInTheDocument();
});