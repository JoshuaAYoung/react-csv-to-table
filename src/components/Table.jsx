import React from 'react';
import Cells from './Cells';

function Table({
  rows,
  tableRowClassName,
  rowKey,
  fillEmpty,
  headerRow,
  tableColumnClassName,
  colKey,
  renderCell,
}) {
  return (
    <tbody>
      {rows.map((row, rowIdx) => (
        <tr
          className={tableRowClassName}
          key={typeof rowKey === 'function' ? rowKey(row, rowIdx) : rowIdx}
        >
          <Cells
            row={row}
            rowIdx={rowIdx}
            fillEmpty={fillEmpty}
            headerRow={headerRow}
            tableColumnClassName={tableColumnClassName}
            colKey={colKey}
            renderCell={renderCell}
          />
        </tr>
      ))}
    </tbody>
  );
}

Table.displayName = 'TableComponent';

export default Table;
