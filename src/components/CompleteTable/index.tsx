import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, IconButton, Input, Pagination, TextField } from "@mui/material";
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
  asc?: string;
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
  notFilter?: boolean;
}
interface CompleteTableProps<Type> {
  useGetData: (query: QuerySearch) => UseQueryResult<OutputData<Type>, unknown>;
  columns: Array<CompleteTableColumn>;
  useDelete: () => UseMutationResult<any, unknown, number, unknown>;
  path: string;
  commonUser?: boolean;
}


export const FilterNumberComponentKey = (key: string) => {

  const FilterNumberComponent = ({ setSearchs }: { setSearchs: (v: any, key: string) => void }) => {
    return <Box display={'flex'} gap={1}>
      <TextField
        type="number"
        size="small"
        variant="standard"
        onChange={(e) => setSearchs(e.target.value, key + '_from')}
        style={{ width: '70px' }}
      />
      <p>Até</p>
      <TextField
        type="number"
        size="small"
        variant="standard"
        onChange={(e) => setSearchs(e.target.value, key + '_to')}
        style={{ width: '70px' }}
      />
    </Box>
  }
  return FilterNumberComponent;
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
  const [asc, setAsc] = useState<'asc' | 'desc'>('asc')
  const [searchs, setSearchs] = useState<Record<string, any>>({});
  const { data } = useGetData({ search: "", limit, page, searchs, order, asc });
  const { handleClose, handleOpen, idDelete } = useDialogDelete();

  const onOrder = (key: string) => {
    if (key === order) {
      setAsc(
        asc === 'asc' ? 'desc' : 'asc'
      )
    } else {
      setOrder(key)
      setAsc('asc')
    }
  }
  return (
    <Box
      width={'100%'}
      position={'relative'}

    >
      <Box
        gap={"10px"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        overflow='auto'
      >

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead style={{ backgroundColor: "#c5c5c5" }}>
              <TableRow>
                {columns.map((column) => {
                  return (
                    <TableCell
                      style={{
                        cursor: column.notFilter ? 'initial' : 'pointer',
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
                            () => {
                              if (!column.notFilter)
                                onOrder(column.key)
                            }
                          }
                        >
                          {column.title}
                          {
                            column.key === order && (
                              asc === 'asc' ? <ArrowDropDown /> : <ArrowDropUp />
                            )
                          }
                        </span>
                        <span>
                          {
                            !column.notFilter &&
                            (column.ComponentFilter ? <column.ComponentFilter
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
                            />)
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
              {data?.rows?.map((line: any) => {

                return (
                  <TableRow
                    key={line.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {columns.map(({ key, transform }) => {

                      let currentValue: Record<string, any> = line;
                      const orders = key.split('.');
                      for (let i = 0; i < orders.length; i++) {
                        const key = orders[i];
                        currentValue = currentValue[key]
                      }

                      return (
                        <TableCell key={key} component="th" scope="row">
                          {transform ? transform(line) : String(currentValue)}
                        </TableCell>
                      )
                    })}
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
                )
              })}
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
    </Box>
  );
}
