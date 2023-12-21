import React, {Children, cloneElement} from 'react';
import { parseCsvToRowsAndColumn } from '../utils/parsingUtils';
import Table from './Table.jsx';
import Header from './Header.jsx'

const CsvToHtml = ({
  data,
  csvDelimiter,
  tableRowClassName,
  tableColumnClassName,
  rowKey,
  colKey,
  fillEmpty,
  headerTitle,
  children,
}) => {
  const rowsWithColumns = parseCsvToRowsAndColumn(data.trim(), csvDelimiter);
  const headerRow = rowsWithColumns.splice(0, 1)[0];

  const renderChildren = () => {
    return Children.map(children, (child) => {
      if (child.type.displayName === 'HeaderComponent') {
      return cloneElement(child, {
        row,
        headerTitle
      });
    } else if (child.type.displayName === 'TableComponent') {
      return cloneElement(child, {
        rows,
        tableRowClassName,
        rowKey,
        fillEmpty,
        headerRow,
        tableColumnClassName,
        colKey,
        renderCell
      });
    } else {
      return child;
    }
    });
  };

  return (
    <>
      {renderChildren()}
    </>
  );
};

Container.defaultProps = {
  data: '',
  rowKey: (row, rowIdx) => `row-${rowIdx}`,
  colKey: (col, colIdx, rowIdx) => `col-${colIdx}`,
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
