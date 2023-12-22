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
  headerTitle,
  renderRightComponent,
  renderLeftComponent,
  rightComponentSpan,
  leftComponentSpan,
}) => {
  const rowsWithColumns = parseCsvToRowsAndColumn(data.trim(), csvDelimiter);
  let headerRow = undefined;
  if (hasHeader) {
    headerRow = rowsWithColumns.splice(0, 1)[0];
  }

  const renderTableHeader = (row) => {
    const rightComponent =
      renderRightComponent && rightComponentSpan ? (
        <th colSpan={rightComponentSpan}>{renderRightComponent()}</th>
      ) : undefined;
    const leftComponent =
      renderLeftComponent && leftComponentSpan ? (
        <th colSpan={leftComponentSpan}>{renderLeftComponent()}</th>
      ) : undefined;

    if (row && row.map) {
      return (
        <thead>
          {headerTitle && (
            <tr className='csv-html-title-row'>
              {leftComponent}
              <th
                colSpan={
                  headerRow.length - rightComponentSpan - leftComponentSpan
                }
                className='csv-html-header-title'
              >
                {headerTitle}
              </th>
              {rightComponent}
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
  };

  const renderCells = (row, rowIdx) => {
    if (row && fillEmpty) {
      return (
        headerRow.map &&
        headerRow.map((headRow, colIdx) => {
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
  headerTitle: '',
  rightComponentSpan: 0,
  leftComponentSpan: 0,
};

export default CsvToHtmlTable;
