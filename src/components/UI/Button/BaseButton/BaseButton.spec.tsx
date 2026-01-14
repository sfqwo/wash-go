import { render, fireEvent } from '@testing-library/react';

import BaseButton from './BaseButton';
import { describe, expect, it } from 'vitest';

describe('BaseButton', () => {
  it('render as anchor', () => {
    const { getByText } = render(
      <BaseButton as="a" href="/home">
        Click me
      </BaseButton>,
    );
    const buttonElement = getByText('Click me');
    expect(buttonElement.tagName).toBe('A');
    expect(buttonElement.getAttribute('href')).toBe('/home');
    expect(buttonElement.hasAttribute('as')).toBeFalsy();
  });

  it('render as button', () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(
      <BaseButton as="button" onClick={mockOnClick}>
        Click me
      </BaseButton>,
    );
    const buttonElement = getByText('Click me');
    expect(buttonElement.tagName).toBe('BUTTON');
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalled();
    expect(buttonElement.hasAttribute('as')).toBeFalsy();
  });

  it('applies hidden styles when hidden prop is true', () => {
    const { getByText } = render(<BaseButton hidden>Hidden Button</BaseButton>);
    const buttonElement = getByText('Hidden Button');
    expect(buttonElement.classList.contains('hidden')).toBeTruthy();
  });

  it('does not apply hidden styles when hidden prop is false or not provided', () => {
    const { getByText } = render(
      <>
        <BaseButton>Visible Button</BaseButton>
        <BaseButton hidden={false}>Visible Button with hidden prop</BaseButton>
      </>,
    );

    const visibleButtonElement = getByText('Visible Button');
    expect(visibleButtonElement.classList.contains('hidden')).toBeFalsy();

    const visibleButtonWithPropElement = getByText('Visible Button with hidden prop');
    expect(visibleButtonWithPropElement.classList.contains('hidden')).toBeFalsy();
  });

  it('does not apply data-size attribute when size props undedined', () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(<BaseButton onClick={mockOnClick}>Click me</BaseButton>);
    const buttonElement = getByText('Click me');
    fireEvent.click(buttonElement);
    expect(buttonElement.hasAttribute('data-size')).toBeFalsy();
  });

  it('does not apply "href" attribute to anchor if it not provided', () => {
    const { getByText } = render(
      <BaseButton as="a" href="">
        Click me
      </BaseButton>,
    );
    const buttonElement = getByText('Click me');
    expect(buttonElement.tagName).toBe('A');
    expect(buttonElement.hasAttribute('href')).toBeFalsy();
    expect(buttonElement.hasAttribute('as')).toBeFalsy();
  });
});
