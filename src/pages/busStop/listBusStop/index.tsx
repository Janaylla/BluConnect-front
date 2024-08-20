import useGetListBusStop from "../../../request/busStop/useGetListBusStop";
import CompleteTable, { CompleteTableColumn, FilterNumberComponentKey } from "../../../components/CompleteTable";
import { useDeleteBusStop } from "../../../request/busStop/useDeleteBusStop";

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
