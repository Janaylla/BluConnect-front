import useGetListBusStop from "../../../request/busStop/useGetListBusStop";
import CompleteTable from "../../../components/CompleteTable";
import { useDeleteBusStop } from "../../../request/busStop/useDeleteBusStop";
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
