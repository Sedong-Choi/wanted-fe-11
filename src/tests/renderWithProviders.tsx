import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { Providers } from './Providers';

export function renderWithProviders(ui?: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, {
    wrapper: Providers,
    ...options,
  });
}
