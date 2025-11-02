import { renderHook } from '@testing-library/react';
import useFilteredTasks from '../hooks/useFilteredTasks';

describe('useFilteredTasks', () => {
  const tasks = [
    { id: 1, text: 'A', completed: false },
    { id: 2, text: 'B', completed: true },
  ];

  it('returns all by default', () => {
    const { result } = renderHook(() => useFilteredTasks(tasks, 'all'));
    expect(result.current.map(t => t.text)).toEqual(['A', 'B']);
  });

  it('filters active', () => {
    const { result } = renderHook(() => useFilteredTasks(tasks, 'active'));
    expect(result.current.map(t => t.text)).toEqual(['A']);
  });

  it('filters completed', () => {
    const { result } = renderHook(() => useFilteredTasks(tasks, 'completed'));
    expect(result.current.map(t => t.text)).toEqual(['B']);
  });
});