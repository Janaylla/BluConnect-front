import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, IconButton, Input, Pagination } from "@mui/material";
import { ArrowDropDown, ArrowDropUp, Delete, Edit } from "@mui/icons-material";
import { UseMutationResult, UseQueryResult } from "react-query";
import { useState } from "react";
import DialogDelete, { useDialogDelete } from "../DialogDelete";

export interface QuerySearch {
  search: string;
  limit: number;
  page: number;
  order?: string;
  searchs?: Record<string, any>
}
export interface OutputData<Type> {
  rows: Array<Type>;
  count: number;
}
export interface CompleteTableColumn {
  title: string;
  key: string;
  transform?: (value: any) => string | number | JSX.Element | undefined;
  ComponentFilter?: (p: {
    setSearch: (value: any) => void,
    setSearchs: (value: any, key: string) => void,
  }) => JSX.Element;
  tranformFilterValue?: (value: any) => string | number;
}
interface CompleteTableProps<Type> {
  useGetData: (query: QuerySearch) => UseQueryResult<OutputData<Type>, unknown>;
  columns: Array<CompleteTableColumn>;
  useDelete: () => UseMutationResult<any, unknown, number, unknown>;
  path: string;
  commonUser?: boolean;
}
export default function CompleteTable<Type>({
  columns,
  useDelete,
  useGetData,
  path, commonUser
}: CompleteTableProps<Type>) {
  const [page, setPage] = useState(1);
  const { mutate: _delete } = useDelete();
  const handleChange = (__: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const limit = 10;
  const [order, setOrder] = useState(columns[0]?.key);
  const [asc, setAsc] = useState<'ASC' | 'DESC'>('ASC')
  const [searchs, setSearchs] = useState<Record<string, any>>({});
  const { data } = useGetData({ search: "", limit, page, searchs });
  const { handleClose, handleOpen, idDelete } = useDialogDelete();

  const onOrder = (key: string) => {
    if (key === order) {
      setAsc(
        asc === 'ASC' ? 'DESC' : 'ASC'
      )
    } else {
      setOrder(key)
      setAsc('ASC')
    }
  }
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
              {columns.map((column) => {
                return (
                  <TableCell
                    style={{
                      cursor: 'pointer',
                    }}
                    key={column.key}>
                    <span
                    >

                      <span
                        style={
                          {
                            display: 'flex',
                            alignItems: 'center'
                          }
                        }
                        onClick={
                          () => onOrder(column.key)
                        }
                      >
                        {column.title}
                        {
                          column.key === order && (
                            asc === 'ASC' ? <ArrowDropDown /> : <ArrowDropUp />
                          )
                        }
                      </span>
                      <span>
                        {
                          column.ComponentFilter ? <column.ComponentFilter
                            setSearch={
                              (value) => setSearchs({
                                ...searchs,
                                [column.key]: value
                              })

                            }
                            setSearchs={(value, key) => {
                              setSearchs({
                                ...searchs,
                                [key]: value
                              })
                            }}
                          /> : <Input style={{
                            width: '60px'
                          }} size="small"
                            onChange={(e) => setSearchs({
                              ...searchs,
                              [column.key]: column.tranformFilterValue ? column.tranformFilterValue(e.target.value) : e.target.value
                            })}
                          />
                        }
                      </span>
                    </span>
                  </TableCell>
                )
              })}
              {
                !commonUser &&
                <TableCell align="right"></TableCell>
              }
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
                {
                  !commonUser &&
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
                  </TableCell>}

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
