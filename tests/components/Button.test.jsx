import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Button from '../../src/components/common/Button';

test('renders button with children', () => {
  render(<Button onClick={() => {}}>Click Me</Button>);
  const buttonElement = screen.getByRole('button', { name: 'Click Me' });
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveTextContent('Click Me');
});

test('simulates a click event and verifies the click handler is called', () => {
  const onClickMock = jest.fn();
  render(<Button onClick={onClickMock}>Click Me</Button>);
  const buttonElement = screen.getByRole('button', { name: 'Click Me' });
  fireEvent.click(buttonElement);
  expect(onClickMock).toHaveBeenCalledTimes(1);
});

test('renders with different classNames', () => {
    render(<Button onClick={() => {}} className="test-class">Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: 'Click Me' });
    expect(buttonElement).toHaveClass('test-class');
});

test('renders with different types', () => {
    render(<Button onClick={() => {}} type="submit">Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: 'Click Me' });
    expect(buttonElement).toHaveAttribute('type', 'submit');
});