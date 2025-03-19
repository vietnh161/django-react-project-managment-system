import { Box, colors } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: "none",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  ":hover": {
    backgroundColor: theme.palette.grey[100],
  },
}));

interface Column<T> {
  key: keyof T;
  label: string;
  value?: (entity: T) => React.ReactNode;
}

interface BasicTableProps<T> {
  columns: Column<T>[];
  data: T[];
}

const BasicTable = <T,>({
  columns,
  data,
}: BasicTableProps<T>): React.ReactElement => {
  return (
    <TableContainer component={Box}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead
          sx={{ borderBottom: "solid 1px", borderColor: colors.grey[400] }}
        >
          <TableRow>
            {columns.map((col) => (
              <StyledTableCell key={col.key as string}>
                {col.label}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody
          sx={{ borderBottom: "solid 1px", borderColor: colors.grey[400] }}
        >
          {data.map((row, index) => (
            <StyledTableRow key={index}>
              {columns.map((col) => (
                <StyledTableCell key={col.key as string}>
                  {col.value ? col.value(row) : String(row[col.key])}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
