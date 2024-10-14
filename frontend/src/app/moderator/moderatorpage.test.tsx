import React from 'react';
import { render, screen, within } from '@testing-library/react';
import ModeratorPage from './page';

describe('ModeratorPage Component', () => {
  test('renders the table with all article columns', () => {
    render(<ModeratorPage />);
    const tables = screen.getAllByRole('table');
    const tableElement = tables[0]; 
    const withinTable = within(tableElement);
    expect(withinTable.getByRole('columnheader', { name: /Title/i })).toBeInTheDocument();
    expect(withinTable.getByRole('columnheader', { name: /DOI/i })).toBeInTheDocument();
    expect(withinTable.getByRole('columnheader', { name: /Authors/i })).toBeInTheDocument();
    expect(withinTable.getByRole('columnheader', { name: /Source/i })).toBeInTheDocument();
    expect(withinTable.getByRole('columnheader', { name: /Pages/i })).toBeInTheDocument();
    expect(withinTable.getByRole('columnheader', { name: /Year/i })).toBeInTheDocument();
    expect(withinTable.getByRole('columnheader', { name: /Volume/i })).toBeInTheDocument();
    expect(withinTable.getByRole('columnheader', { name: /Number/i })).toBeInTheDocument();
  });

});
