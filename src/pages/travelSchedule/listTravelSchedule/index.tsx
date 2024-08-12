import useGetListTravelSchedule, { TravelSchedule } from "../../../request/travelSchedule/useGetListTravelSchedule";
import CompleteTable, { CompleteTableColumn } from "../../../components/CompleteTable";
import { useDeleteTravelSchedule } from "../../../request/travelSchedule/useDeleteTravelSchedule";
import {  FilterHHMMComponent, secondsToHHMM } from "../travelSchedule.type";
import { Checkbox } from "@mui/material";
import { CheckBox as CheckBoxIcon, CheckBoxOutlineBlank } from "@mui/icons-material";
const ckeck = (value: any, day: string) => {
  return value[day] ? <CheckBoxIcon/> : <CheckBoxOutlineBlank/>
}
const Check = ({ setSearch }: {
  setSearch: Function;
}) => {
  return <Checkbox
    onChange={
      (e) => setSearch(e.target.checked)
    }
    style={{
      margin: 0,
      padding: 0
    }}
  />
}
const columns: CompleteTableColumn[] = [
  {
    title: "Horário",
    key: "time",
    transform: (value: TravelSchedule) => secondsToHHMM(value.time),
    ComponentFilter:  FilterHHMMComponent
  },
  {
    title: "Viagem",
    key: 'trip.code',
  },
  {
    title: "Seg",
    key: "monday",
    transform: (value: TravelSchedule) => ckeck(value, 'monday'),
    ComponentFilter: Check
  },
  {
    title: "Ter",
    key: "thursday",
    transform: (value: TravelSchedule) => ckeck(value, 'thursday'),
    ComponentFilter: Check
  },
  {
    title: "Qua",
    key: "wednesday",
    transform: (value: TravelSchedule) => ckeck(value, 'wednesday'),
    ComponentFilter: Check
  },
  {
    title: "Qui",
    key: "tuesday",
    transform: (value: TravelSchedule) => ckeck(value, 'tuesday'),
    ComponentFilter: Check
  },
  {
    title: "Sex",
    key: "friday",
    transform: (value: TravelSchedule) => ckeck(value, 'friday'),
    ComponentFilter: Check
  },
  {
    title: "Sáb",
    key: "saturday",
    transform: (value: TravelSchedule) => ckeck(value, 'saturday'),
    ComponentFilter: Check
  },
  {
    title: "Dom",
    key: "sunday",
    transform: (value: TravelSchedule) => ckeck(value, 'sunday'),
    ComponentFilter: Check
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
