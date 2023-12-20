import React from 'react';
import { parseCsvToRowsAndColumn } from '../utils';

const CsvToHtmlTable = ({
  data,
  csvDelimiter,
  hasHeader,
  tableClassName,
  tableRowClassName,
  tableColumnClassName,
  rowKey,
  colKey,
  renderCell,
  fillEmpty,
}) => {
  console.log("WHYYYYY?")
  const rowsWithColumns = parseCsvToRowsAndColumn(data.trim(), csvDelimiter);
  let headerRow = undefined;
  if (hasHeader) {
    headerRow = rowsWithColumns.splice(0, 1)[0];
  }

  const renderTableHeader = (row) => {
    if (row && row.map) {
      return (
        <thead>
          <tr>
            {row.map((column, i) => (
              <th key={`header-${i}`}>{column}</th>
            ))}
          </tr>
        </thead>
      );
    }
  };

  const renderCells = (row, rowIdx) => {
    console.log('logs work?');
    if (row && fillEmpty) {
      return (
        headerRow.map &&
        headerRow.map((headerRow, colIdx) => {
          console.log('crude but?:', row[colIdx], headerRow);
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
                FUCL
                {typeof renderCell === 'function'
                  ? renderCell(row[colIdx], colIdx, rowIdx)
                  : row[colIdx]}
              </td>
            );
          } else {
            <td
              className={tableColumnClassName}
              key={
                typeof rowKey === 'function'
                  ? colKey(row, colIdx, rowIdx)
                  : headerRow[colIdx][colKey]
              }
            >
              'p'
            </td>;
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
            NOT
            {typeof renderCell === 'function'
              ? renderCell(column, colIdx, rowIdx)
              : column}
          </td>
        ))
      );
    }
  };

  const renderTableBody = (rows) => {
    if (rows && rows.map) {
      return (
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              className={tableRowClassName}
              key={typeof rowKey === 'function' ? rowKey(row, rowIdx) : rowIdx}
            >
              {renderCells(row, rowIdx)}
            </tr>
          ))}
        </tbody>
      );
    }
  };

  return (
    <table className={`csv-html-table ${tableClassName}`}>
      {renderTableHeader(headerRow)}
      {renderTableBody(rowsWithColumns)}
    </table>
  );
};

CsvToHtmlTable.defaultProps = {
  data: '',
  rowKey: (row, rowIdx) => `row-${rowIdx}`,
  colKey: (col, colIdx, rowIdx) => `col-${colIdx}`,
  hasHeader: true,
  csvDelimiter: '\t',
  tableClassName: '',
  tableRowClassName: '',
  tableColumnClassName: '',
  fillEmpty: false,
};

export default CsvToHtmlTable;
