import {describe, expect, test} from '@jest/globals';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Home from './app/page'; // Ensure this path is correct

describe('Home Component Column Visibility Toggle', () => {
  test('should toggle visibility of the columns', () => {
    // Render the Home component
    render(React.createElement(Home));

    // Check that the columns are initially visible
    expect(screen.queryByText('Title')).toBeTruthy();
    expect(screen.queryByText('DOI')).toBeTruthy();
    expect(screen.queryByText('Authors')).toBeTruthy();

    // Get the toggle inputs for Title, DOI, and Authors
    const titleToggle = screen.getByLabelText('Title');
    const doiToggle = screen.getByLabelText('Doi');
    const authorsToggle = screen.getByLabelText('Authors');

    // Toggle off the columns by clicking their checkboxes
    fireEvent.click(titleToggle);
    fireEvent.click(doiToggle);
    fireEvent.click(authorsToggle);

    // Ensure the columns are no longer visible
    expect(screen.queryByText('Title')).toBeNull();
    expect(screen.queryByText('DOI')).toBeNull();
    expect(screen.queryByText('Authors')).toBeNull();

    // Toggle them back on
    fireEvent.click(titleToggle);
    fireEvent.click(doiToggle);
    fireEvent.click(authorsToggle);

    // Ensure the columns are visible again
    expect(screen.queryByText('Title')).toBeTruthy();
    expect(screen.queryByText('DOI')).toBeTruthy();
    expect(screen.queryByText('Authors')).toBeTruthy();
  });
});
