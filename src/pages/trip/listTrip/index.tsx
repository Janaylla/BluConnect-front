import useGetListTrip, { Trip } from "../../../request/trip/useGetListTrip";
import CompleteTable, { CompleteTableColumn } from "../../../components/CompleteTable";
import { useDeleteTrip } from "../../../request/trip/useDeleteTrip";
const columns: CompleteTableColumn[] = [
  {
    title: "Code",
    key: "code",
  },
  {
    title: "Ponto inicial",
    key: "latitude",
    transform: (value: Trip) => value.busRoutes[0]?.startBusStop?.name,
  },
  {
    title: "Ponto final",
    key: "logitude",
    transform: (value: Trip) => value.busRoutes[value.busRoutes.length - 1]?.endBusStop?.name,
  },
  {
    title: "Quantidade de paradas",
    key: "logitude",
    transform: (value: Trip) => (value.busRoutes?.length + 1).toString(),
  },
];
export default function ListTrip() {
  return (
    <CompleteTable
      columns={columns}
      useGetData={useGetListTrip}
      useDelete={useDeleteTrip}
      path="trip"
    />
  );
}
