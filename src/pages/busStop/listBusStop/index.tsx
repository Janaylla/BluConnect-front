import useGetListBusStop from "../../../request/busStop/useGetListBusStop";
import CompleteTable, { CompleteTableColumn } from "../../../components/CompleteTable";
import { useDeleteBusStop } from "../../../request/busStop/useDeleteBusStop";
import { Box, TextField } from "@mui/material";


const FilterNumberComponentKey = (key : string) => {

  const FilterNumberComponent = ({ setSearchs }: { setSearchs: (v: any, key: string) => void }) => {
    return <Box display={'flex'} gap={1}>
      <TextField
        type="number"
        size="small"
        variant="standard"
        onChange={(e) => setSearchs(e.target.value, key + '_from')}
      />
      <p>Até</p>
      <TextField
        type="number"
        size="small"
        variant="standard"
        onChange={(e) => setSearchs(e.target.value, key + '_to')}
      />
      </Box>
  }
  return FilterNumberComponent;
}

const columns: CompleteTableColumn[] = [
  {
    title: "Nome",
    key: "name",
  },
  {
    title: "Latitude",
    key: "latitude",
    ComponentFilter: FilterNumberComponentKey('latitude')

  },
  {
    title: "Longitude",
    key: "longitude",
    ComponentFilter: FilterNumberComponentKey('longitude')
  },
];
export default function ListBusStop() {
  return (
    <CompleteTable
      columns={columns}
      useGetData={useGetListBusStop}
      useDelete={useDeleteBusStop}
      path="bus-stop"
    />
  );
}
