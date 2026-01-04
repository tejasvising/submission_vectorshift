import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock reactflow to avoid requiring its provider in tests
jest.mock('reactflow', () => ({
  Handle: ({ id }) => <div data-testid={`handle-${id}`} />, // simple placeholder
  Position: { Left: 'left', Right: 'right' },
}));

import { TextNode } from './textNode';

test('shows detected variables from initial text', async () => {
  render(<TextNode id="text-1" data={{ text: 'Hello {{input}} and {{foo}}' }} />);
  const variables = await screen.findByText(/Variables:/);
  expect(variables.textContent).toMatch(/input/);
  expect(variables.textContent).toMatch(/foo/);

  // ensure left handles are rendered for variables
  const h1 = await screen.findByTestId('handle-text-1-var-input');
  const h2 = await screen.findByTestId('handle-text-1-var-foo');
  expect(h1).toBeTruthy();
  expect(h2).toBeTruthy();
});

test('updates variable list when text changes', async () => {
  render(<TextNode id="text-2" data={{ text: 'Start' }} />);
  const textbox = screen.getByRole('textbox');
  fireEvent.change(textbox, { target: { value: '{{a}} plus {{b}}' } });
  const variables = await screen.findByText(/Variables:/);
  expect(variables.textContent).toMatch(/a/);
  expect(variables.textContent).toMatch(/b/);
});
