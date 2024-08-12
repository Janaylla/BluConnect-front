import useGetListBusStop, {
  BusStop,
} from "../../../request/busStop/useGetListBusStop";
import SelectWithSearch from "../SelectWithSearch";
const SelectToAndFrom = ({
  label,
  setValue,
}: {
  label: string;
  setValue: (value: BusStop | null) => void;
}) => {
  return (
    <SelectWithSearch
      getLabelByValue={(v: BusStop) => v.name}
      useGetData={useGetListBusStop}
      limit={20}
      setValue={setValue}
      label={label}
    />
  );
};

export default SelectToAndFrom;
