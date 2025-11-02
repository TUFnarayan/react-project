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

describe('TaskFilters', () => {
  it('shows All / Active / Completed correctly', async () => {
    render(<App />);

    await add('Task A');
    await add('Task B');
    await toggle('Task B');

    const allBtn = screen.getByRole('button', { name: /^All$/i });
    const activeBtn = screen.getByRole('button', { name: /^Active$/i });
    const completedBtn = screen.getByRole('button', { name: /^Completed$/i });

    await userEvent.click(completedBtn);
    expect(screen.queryByText(/task a/i)).not.toBeInTheDocument();
    expect(screen.getByText(/task b/i)).toBeInTheDocument();

    await userEvent.click(activeBtn);
    expect(screen.getByText(/task a/i)).toBeInTheDocument();
    expect(screen.queryByText(/task b/i)).not.toBeInTheDocument();

    await userEvent.click(allBtn);
    expect(screen.getByText(/task a/i)).toBeInTheDocument();
    expect(screen.getByText(/task b/i)).toBeInTheDocument();
  });
});