import React, { Children, cloneElement } from 'react';
import { parseCsvToRowsAndColumn } from '../utils/parsingUtils';
import Table from './Table.jsx';
import Header from './Header.jsx';

function CsvToHtml({
  data,
  csvDelimiter,
  tableRowClassName,
  tableColumnClassName,
  rowKey,
  colKey,
  renderCell,
  fillEmpty,
  headerTitle,
  children,
}) {
  const rowsWithColumns = parseCsvToRowsAndColumn(data.trim(), csvDelimiter);
  const headerRow = rowsWithColumns.splice(0, 1)[0];

  const renderChildren = () =>
    Children.map(children, (child) => {
      if (child.type.displayName === 'HeaderComponent') {
        return cloneElement(child, {
          row: headerRow,
          headerTitle,
        });
      }
      if (child.type.displayName === 'TableComponent') {
        return cloneElement(child, {
          rows: rowsWithColumns,
          tableRowClassName,
          rowKey,
          fillEmpty,
          headerRow,
          tableColumnClassName,
          colKey,
          renderCell,
        });
      }
      return child;
    });

  return <>{renderChildren()}</>;
}

CsvToHtml.defaultProps = {
  data: '',
  rowKey: (_row, rowIdx) => `row-${rowIdx}`,
  colKey: (_col, colIdx) => `col-${colIdx}`,
  csvDelimiter: '\t',
  tableClassName: '',
  tableRowClassName: '',
  tableColumnClassName: '',
  fillEmpty: false,
  headerTitle: '',
};

CsvToHtml.Header = Header;
CsvToHtml.Table = Table;

export default CsvToHtml;
