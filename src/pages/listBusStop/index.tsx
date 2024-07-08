import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useBusStop from '../../request/busStop/useBusStop';

export default function BasicTable() {
  const { data: listBusStop } = useBusStop({ search: '', limit: 10, page: 1 });
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{backgroundColor: '#c5c5c5'}}>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="right">Latitude</TableCell>
            <TableCell align="right">Longitude</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listBusStop?.map((busStop) => (
            <TableRow
              key={busStop.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {busStop.name}
              </TableCell>
              <TableCell align="right">{busStop.latitude}</TableCell>
              <TableCell align="right">{busStop.longitude}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
