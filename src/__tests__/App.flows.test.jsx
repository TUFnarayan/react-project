import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const getInput = () =>
  screen.getByPlaceholderText(/add a task and hit enter/i);

const countTasks = () => screen.queryAllByRole('checkbox').length;

const getCheckboxByLabel = (text) =>
  screen.getByLabelText(new RegExp(text, 'i'));

const getDeleteButtonFor = (text) => {
  const rowText = screen.getByText(new RegExp(text, 'i'));
  const btnByName = rowText.closest('div')?.querySelector('button');
  return btnByName || screen.getByRole('button', { name: /🗑/ });
};

describe('App core flows', () => {
  it('adds a task by pressing Enter', async () => {
    render(<App />);
    const input = getInput();

    await userEvent.type(input, 'Buy milk{Enter}');

    expect(screen.getByText(/buy milk/i)).toBeInTheDocument();
    expect(countTasks()).toBe(1);
  });

  it('clears the input on Escape', async () => {
    render(<App />);
    const input = getInput();

    await userEvent.type(input, 'Hello');
    expect(input).toHaveValue('Hello');

    await userEvent.keyboard('{Escape}');
    expect(input).toHaveValue('');
  });

  it('toggles a task completed via checkbox', async () => {
    render(<App />);
    const input = getInput();

    await userEvent.type(input, 'Walk dog{Enter}');
    const cb = getCheckboxByLabel('Walk dog');

    expect(cb).not.toBeChecked();
    await userEvent.click(cb);
    expect(cb).toBeChecked();

    await userEvent.click(cb);
    expect(cb).not.toBeChecked();
  });

  it('deletes a task via the 🗑️ button', async () => {
    render(<App />);
    const input = getInput();

    await userEvent.type(input, 'Temp task{Enter}');
    expect(countTasks()).toBe(1);

    const del = getDeleteButtonFor('Temp task');
    await userEvent.click(del);

    expect(screen.queryByText(/temp task/i)).not.toBeInTheDocument();
    expect(countTasks()).toBe(0);
  });

  it('clears completed tasks', async () => {
    render(<App />);
    const input = getInput();

    await userEvent.type(input, 'A{Enter}');
    await userEvent.type(input, 'B{Enter}');

    const cbB = getCheckboxByLabel('B');
    await userEvent.click(cbB);
    expect(cbB).toBeChecked();

    const clearBtn = screen.getByRole('button', { name: /clear completed/i });
    await userEvent.click(clearBtn);

    expect(screen.getByText(/^a$/i)).toBeInTheDocument();
    expect(screen.queryByText(/^b$/i)).not.toBeInTheDocument();
    expect(countTasks()).toBe(1);
  });
});