import React from 'react';
import { render, fireEvent } from '@testing-library/react';

jest.mock('reactflow', () => ({
  Handle: ({ id }) => <div data-testid={`handle-${id}`} />, // simple placeholder
  Position: { Left: 'left', Right: 'right' },
}));

import { TextNode } from './textNode';

test('width grows and shrinks with content', async () => {
  const { getByRole } = render(<TextNode id="text-test" data={{ text: 'short' }} />);
  const ta = getByRole('textbox');

  // Mock measurement: make span widths proportional to length so mirror returns larger widths
  const originalGet = Element.prototype.getBoundingClientRect;
  Element.prototype.getBoundingClientRect = function() {
    if (this.tagName === 'SPAN') {
      return { width: (this.textContent || '').length * 8, height: 16, top:0,left:0,right:0,bottom:0,x:0,y:0 }
    }
    // mirror or other elements get a sensible default
    return { width: 100, height: 20, top:0,left:0,right:0,bottom:0,x:0,y:0 };
  }

  try {
    // initial width
    const beforeWidth = parseInt(ta.style.width || getComputedStyle(ta).width);

    // grow
    fireEvent.change(ta, { target: { value: 'thisIsALongSingleWordWithoutSpacesToMakeTheWidthGrow' } });
    // allow effect to run
    await new Promise((r) => setTimeout(r, 50));
    const bigWidth = parseInt(ta.style.width || getComputedStyle(ta).width);
    expect(bigWidth).toBeGreaterThan(beforeWidth);

    // shrink with backspace simulation
    fireEvent.change(ta, { target: { value: 'short' } });
    await new Promise((r) => setTimeout(r, 50));
    const finalWidth = parseInt(ta.style.width || getComputedStyle(ta).width);
    expect(finalWidth).toBeLessThanOrEqual(beforeWidth + 20); // allow small variance
  } finally {
    Element.prototype.getBoundingClientRect = originalGet;
  }
});
