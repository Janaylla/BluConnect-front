import useGetListTravelSchedule from "../../../request/travelSchedule/useGetListTravelSchedule";
import CompleteTable from "../../../components/CompleteTable";
import { useDeleteTravelSchedule } from "../../../request/travelSchedule/useDeleteTravelSchedule";
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
export default function ListTravelSchedule() {
  return (
    <CompleteTable
      columns={columns}
      useGetData={useGetListTravelSchedule}
      useDelete={useDeleteTravelSchedule}
      path="bus-stop"
    />
  );
}
