import useGetListBusRoute from "../../../request/busRoute/useGetListBusRoute";
import CompleteTable from "../../../components/CompleteTable";
import { useDeleteBusRoute } from "../../../request/busRoute/useDeleteBusRoute";
import { CompleteTableColumn } from "../../../components/CompleteTable/completTable.type";
  const columns: CompleteTableColumn[] = [
  {
    title: "Nome",
    key: "name",
    type: 'text'
  },
  {
    title: "Latitude",
    key: "latitude",
    type: 'quantity'
  },
  {
    title: "Longitude",
    key: "longitude",
    type: 'quantity'
  },
];
export default function ListBusRoute() {
  return (
    <CompleteTable
      columns={columns}
      useGetData={useGetListBusRoute}
      useDelete={useDeleteBusRoute}
      path="bus-route"
    />
  );
}
