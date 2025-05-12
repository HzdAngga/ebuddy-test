"use client";

import {
  Paper,
  SortDirection,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableProps,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import SwapVertOutlinedIcon from "@mui/icons-material/SwapVertOutlined";
import { ReactElement, ReactNode } from "react";
import Image from "next/image";

interface TableHeadRow {
  id: string;
  label?: string | ReactElement;
  sortKey?: string;
  numeric?: boolean;
  width?: number | string;
  sorter?: boolean;
}
export type HeadCells = TableHeadRow[];
interface EnhancedTableHeadProps {
  id: string;
  order?: SortDirection;
  orderBy?: string;
  onRequestSort?: (event: unknown, property: string) => void;
  rows: HeadCells;
}
const EnhancedTableHead: React.FC<EnhancedTableHeadProps> = (props) => {
  const { id, order, orderBy, onRequestSort, rows } = props;
  const createSortHandler = (property: string) => (event: unknown) => {
    onRequestSort?.(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {rows.map((headCell, idx) => {
          const sortKey = headCell?.sortKey ?? headCell?.id;
          return (
            <TableCell
              key={`${id}-head-${headCell.id}-${idx}`}
              align={headCell.numeric ? "right" : "left"}
              sortDirection={orderBy === sortKey ? order : false}
              width={headCell?.width}
            >
              {headCell?.sorter ? (
                <TableSortLabel
                  active={Boolean(headCell?.sorter)}
                  direction={
                    (orderBy === sortKey ? order : "desc") as "asc" | "desc"
                  }
                  onClick={createSortHandler(sortKey)}
                  {...(orderBy !== sortKey
                    ? { IconComponent: SwapVertOutlinedIcon }
                    : {})}
                >
                  {headCell.label}
                </TableSortLabel>
              ) : (
                headCell.label
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

interface CTTableProps {
  id: string;
  defaultSortByKey?: string;
  emptyImgSrc?: string;
  headCells: HeadCells;
  bodyCells: Record<string, unknown>[];
  bodyCellKey?: string;
  rowsPerPage?: number;
  maxHeight?: string | number;
  total: number;
  showPagination?: boolean;
  sx?: TableProps["sx"];
  onRowClick?: (row: Record<string, unknown>) => void;
}
export const CTTable: React.FC<CTTableProps> = ({
  id,
  emptyImgSrc = "/table-empty-state-no-skeleton.svg",
  headCells,
  bodyCells,
  bodyCellKey = "id",
  rowsPerPage = 10,
  maxHeight = "100%",
  total,
  showPagination = false,
  sx = {},
  onRowClick = () => {},
}) => {
  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <TableContainer style={{ maxHeight }}>
        <Table
          sx={{ width: "100%", ...sx }}
          aria-labelledby='tableTitle'
          size='medium'
        >
          <EnhancedTableHead
            id={id}
            rows={headCells}
            // TODO: uncomment and create handler for sorting per column
            // order={order}
            // orderBy={orderBy}
            // onRequestSort={handleRequestSort}
          />
          <TableBody>
            {Boolean(bodyCells?.length) ? (
              bodyCells?.map((row, idx) => {
                return (
                  <TableRow
                    tabIndex={-1}
                    key={`${id}-body-${row?.[bodyCellKey] ?? row?.id}-${idx}`}
                    onClick={() => onRowClick(row)}
                  >
                    {headCells.map((headCell, index) => (
                      <TableCell
                        align={headCell?.numeric ? "right" : "left"}
                        key={`${id}-body-cell-${
                          row?.[bodyCellKey] ?? row?.id
                        }-${idx}-${index}`}
                      >
                        {row?.[headCell.id] as ReactNode}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  className='my-5'
                  align='center'
                  colSpan={headCells?.length}
                >
                  <div className='flex justify-center'>
                    <Image
                      src={emptyImgSrc}
                      alt='empty data'
                      width={180}
                      height={38}
                      priority
                    />
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {showPagination && (
        <TablePagination
          component='div'
          count={total ?? bodyCells?.length ?? 0}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
          // TODO: change the value into dynamic one using react useState or useRef when developing pagination
          page={1}
          onPageChange={() => {}}
        />
      )}
    </Paper>
  );
};
