import React from 'react';
import { parseCsvToRowsAndColumn } from '../utils/parsingUtils';

function Header(row, headerTitle, data) {
  let rowValue = row;
  if (!row && data) {
    const rowsWithColumns = parseCsvToRowsAndColumn(data.trim(), csvDelimiter);
    rowValue = rowsWithColumns.splice(0, 1)[0];
  }

  if (rowValue && rowValue.map) {
    return (
      <thead>
        {headerTitle && (
          <tr>
            <th colSpan={rowValue.length} className="csv-html-header-title">
              {headerTitle}
            </th>
          </tr>
        )}
        <tr>
          {rowValue.map((column, i) => (
            <th key={`header-${i}`}>{column}</th>
          ))}
        </tr>
      </thead>
    );
  }
}

Header.displayName = 'HeaderComponent';

export default Header;
