import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { TestProviders } from './TestProviders';


export function renderWithProviders(ui?: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, {
    wrapper: TestProviders,
    ...options,
  });
}
