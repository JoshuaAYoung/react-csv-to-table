import React from 'react';

const Header = (row, headerTitle) => {
  if (row && row.map) {
    return (
      <thead>
        {headerTitle && (
          <tr>
            <th colSpan={headerRow.length} className='csv-html-header-title'>
              {headerTitle}
            </th>
          </tr>
        )}
        <tr>
          {row.map((column, i) => (
            <th key={`header-${i}`}>{column}</th>
          ))}
        </tr>
      </thead>
    );
  }

  return;
};

Header.displayName = 'HeaderComponent';

export default Header;