import useGetListBusRoute from "../../../request/busRoute/useGetListBusRoute";
import CompleteTable from "../../../components/CompleteTable";
import { useDeleteBusRoute } from "../../../request/busRoute/useDeleteBusRoute";
const columns = [
  {
    title: "Nome",
    key: "name",
  },
  {
    title: "Latitude",
    key: "latitude",
  },
  {
    title: "Longitude",
    key: "longitude",
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
