import React from 'react';
import { parseCsvToRowsAndColumn } from '../utils/parsingUtils';
import Table from './Table.jsx';
import Header from './Header.jsx'

const CsvToHtmlTable = ({
  data,
  csvDelimiter,
  hasHeader,
  tableClassName,
  tableRowClassName,
  tableColumnClassName,
  rowKey,
  colKey,
  fillEmpty,
  headerTitle,
}) => {
  const rowsWithColumns = parseCsvToRowsAndColumn(data.trim(), csvDelimiter);
  let headerRow = undefined;
  if (hasHeader) {
    headerRow = rowsWithColumns.splice(0, 1)[0];
  }

  return (
    <table className={`csv-html-table ${tableClassName}`}>
      <Header row={headerRow} headerTitle={headerTitle} />
      <Table
        rows={rowsWithColumns}
        tableRowClassName={tableRowClassName}
        rowKey={rowKey}
        fillEmpty={fillEmpty}
        headerRow={headerRow}
        tableColumnClassName={tableColumnClassName}
        colKey={colKey}
        renderCell={renderCell}
      />
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
};

export default CsvToHtmlTable;
