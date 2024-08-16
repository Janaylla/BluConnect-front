import useGetListTrip, { Trip } from "../../../request/trip/useGetListTrip";
import CompleteTable, { CompleteTableColumn, FilterNumberComponentKey } from "../../../components/CompleteTable";
import { useDeleteTrip } from "../../../request/trip/useDeleteTrip";
const columns: CompleteTableColumn[] = [
  {
    title: "Code",
    key: "code",
  },
  {
    title: "Ponto inicial",
    key: "startBusStop.name",
  },
  {
    title: "Ponto final",
    key: "endBusStop.name",
  },
  {
    title: "Quantidade de paradas",
    key: "numberStops",
    ComponentFilter: FilterNumberComponentKey('numberStops')
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
