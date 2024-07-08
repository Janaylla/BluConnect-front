import useGetBusStop from "../../request/busStop/useGetBusStop";
import CompleteTable from "../../components/CompleteTable";
import { useDeleteBusStop } from "../../request/busStop/useDeleteBusStop";
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
export default function BasicTable() {
  return (
    <CompleteTable
      columns={columns}
      useGetData={useGetBusStop}
      editAction={(data) => {}}
      useDelete={useDeleteBusStop}
    />
  );
}
