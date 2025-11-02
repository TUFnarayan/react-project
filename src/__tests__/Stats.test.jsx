import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const add = async (text) => {
  const input = screen.getByPlaceholderText(/add a task and hit enter/i);
  await userEvent.clear(input);
  await userEvent.type(input, `${text}{Enter}`);
};

const toggle = async (text) => {
  const cb = screen.getByLabelText(new RegExp(text, 'i'));
  await userEvent.click(cb);
};

const expectStats = (t, a, c) => {
  const stats = screen.getByText(/total:/i).parentElement;
  expect(stats).toHaveTextContent(new RegExp(`Total:\\s*${t}`, 'i'));
  expect(stats).toHaveTextContent(new RegExp(`Active:\\s*${a}`, 'i'));
  expect(stats).toHaveTextContent(new RegExp(`Completed:\\s*${c}`, 'i'));
};

describe('TaskStats', () => {
  it('updates counts as tasks change', async () => {
    render(<App />);

    expectStats(0, 0, 0);

    await add('A');
    await add('B');
    expectStats(2, 2, 0);

    await toggle('A');
    expectStats(2, 1, 1);

    await userEvent.click(screen.getByRole('button', { name: /clear completed/i }));
    expectStats(1, 1, 0);
  });
});
