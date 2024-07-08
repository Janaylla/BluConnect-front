import useGetListTrip from "../../../request/trip/useGetListTrip";
import CompleteTable from "../../../components/CompleteTable";
import { useDeleteTrip } from "../../../request/trip/useDeleteTrip";
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
export default function ListTrip() {
  return (
    <CompleteTable
      columns={columns}
      useGetData={useGetListTrip}
      useDelete={useDeleteTrip}
      path="bus-route"
    />
  );
}
