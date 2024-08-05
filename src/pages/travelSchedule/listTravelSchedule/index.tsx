import useGetListTravelSchedule, { TravelSchedule } from "../../../request/travelSchedule/useGetListTravelSchedule";
import CompleteTable from "../../../components/CompleteTable";
import { useDeleteTravelSchedule } from "../../../request/travelSchedule/useDeleteTravelSchedule";
import { secondsToHHMM } from "../travelSchedule.type";
const ckeck = (value: any, day: string) => {
  return value[day] ? 'X' : '-'
}
const columns = [
  {
    title: "Horário",
    key: "time",
    transform: (value: TravelSchedule) => secondsToHHMM(value.time)
  },
  {
    title: "Viagem",
    key: 'code',
    transform: (value: TravelSchedule) => value.trip?.code
  },
  {
    title: "Seg",
    key: "monday",
    transform: (value: TravelSchedule) => ckeck(value, 'monday')
  },
  {
    title: "Ter",
    key: "thursday",
    transform: (value: TravelSchedule) => ckeck(value, 'thursday')
  },
  {
    title: "Qua",
    key: "wednesday",
    transform: (value: TravelSchedule) => ckeck(value, 'wednesday')
  },
  {
    title: "Qui",
    key: "tuesday",
    transform: (value: TravelSchedule) => ckeck(value, 'tuesday')
  },
  {
    title: "Sex",
    key: "friday",
    transform: (value: TravelSchedule) => ckeck(value, 'friday')
  },
  {
    title: "Sáb",
    key: "saturday",
    transform: (value: TravelSchedule) => ckeck(value, 'saturday')
  },
  {
    title: "Dom",
    key: "sunday",
    transform: (value: TravelSchedule) => ckeck(value, 'sunday')
  }

];
interface ListTravelScheduleProps {
  commonUser: boolean;
}
export default function ListTravelSchedule({
  commonUser
}: ListTravelScheduleProps) {
  return (
    <CompleteTable
      columns={columns}
      useGetData={useGetListTravelSchedule}
      useDelete={useDeleteTravelSchedule}
      path="travel-schedule"
      commonUser={commonUser}
    />
  );
}
