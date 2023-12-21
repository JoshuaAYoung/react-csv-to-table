import React from 'react';

function Cells(
  row,
  rowIdx,
  fillEmpty,
  headerRow,
  tableColumnClassName,
  colKey,
  renderCell
) {
  if (row && fillEmpty) {
    return (
      headerRow.map &&
      headerRow.map((_headRow, colIdx) => {
        if (row[colIdx]) {
          return (
            <td
              className={tableColumnClassName}
              key={
                typeof rowKey === 'function'
                  ? colKey(row, colIdx, rowIdx)
                  : row[colIdx][colKey]
              }
            >
              {typeof renderCell === 'function'
                ? renderCell(row[colIdx], colIdx, rowIdx)
                : row[colIdx]}
            </td>
          );
        } else {
          return (
            <td
              className={tableColumnClassName}
              key={
                typeof rowKey === 'function'
                  ? colKey(row, colIdx, rowIdx)
                  : headerRow[colIdx][colKey]
              }
            >
              &nbsp;
            </td>
          );
        }
      })
    );
  } else {
    return (
      row.map &&
      row.map((column, colIdx) => (
        <td
          className={tableColumnClassName}
          key={
            typeof rowKey === 'function'
              ? colKey(row, colIdx, rowIdx)
              : column[colKey]
          }
        >
          {typeof renderCell === 'function'
            ? renderCell(column, colIdx, rowIdx)
            : column}
        </td>
      ))
    );
  }
}

export default Cells;
