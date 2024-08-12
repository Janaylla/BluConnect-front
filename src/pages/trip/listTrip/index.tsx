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
    key: "startBusStop",
    transform: (value: Trip) => value.busRoutes[0]?.startBusStop?.name,
    ComponentFilter: () => {
      return <>
      </>
    }
  },
  {
    title: "Ponto final",
    key: "endBusStop",
    transform: (value: Trip) => value.busRoutes[value.busRoutes.length - 1]?.endBusStop?.name,
    ComponentFilter: () => {
      return <>
      </>
    }
  },
  {
    title: "Quantidade de paradas",
    key: "busRoutesQuantidade",
    transform: (value: Trip) => (value.busRoutes?.length + 1).toString(),
    ComponentFilter: () => {
      return <>
      </>
    }
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
