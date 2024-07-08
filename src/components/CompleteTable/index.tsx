import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, IconButton, Pagination } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { UseMutationResult, UseQueryResult } from "react-query";
import { useState } from "react";
import DialogDelete, { useDialogDelete } from "../DialogDelete";

interface Query {
  search: string;
  limit: number;
  page: number;
}
export interface OutputData<Type> {
  rows: Array<Type>;
  count: number;
}
export interface CompleteTableColumn {
  title: string;
  key: string;
  transform?: (value: any) => string | number | JSX.Element | undefined;
}
interface CompleteTableProps<Type> {
  useGetData: (query: Query) => UseQueryResult<OutputData<Type>, unknown>;
  columns: Array<CompleteTableColumn>;
  useDelete: () => UseMutationResult<any, unknown, number, unknown>;
  path: string;
}
export default function CompleteTable<Type>({
  columns,
  useDelete,
  useGetData,
  path,
}: CompleteTableProps<Type>) {
  const [page, setPage] = useState(1);
  const { mutate: _delete } = useDelete();
  const handleChange = (__: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const limit = 10;
  const { data } = useGetData({ search: "", limit, page });
  const { handleClose, handleOpen, idDelete } = useDialogDelete();
  return (
    <Box
      gap={"10px"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#c5c5c5" }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.key}>{column.title}</TableCell>
              ))}
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.rows?.map((line: any) => (
              <TableRow
                key={line.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {columns.map(({ key, transform }) => (
                  <TableCell key={key} component="th" scope="row">
                    {transform ? transform(line) : line[key]}
                  </TableCell>
                ))}
                <TableCell align="right">
                  <IconButton
                    aria-label="edit"
                    href={`./${path}/edit/${line.id}`}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleOpen(line.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil((data ? data?.count : 1) / limit)}
        color="primary"
        page={page}
        onChange={handleChange}
      />
      <DialogDelete
        idDelete={idDelete}
        onDeleted={_delete}
        onClose={handleClose}
      />
    </Box>
  );
}
