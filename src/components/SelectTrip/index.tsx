import useGetListTrip, {
  Trip,
} from "../../request/trip/useGetListTrip";
import { useState } from "react";
import SelectWithSearch from "../Select/SelectWithSearch";
const SelectTrip = ({
  label, setValue
}: {
  label: string;
  setValue: (id: string | number) => void;
}) => {
  const [search, setSearch] = useState("");
  const { data } = useGetListTrip({ search, limit: 20, page: 1 });
  const [trip, setTrip] = useState<Trip | null>(null)
  return (
    <SelectWithSearch
      options={data?.rows?.map((v) => ({ label: v.code, value: v })) || []}
      selectedOption={{
        label: trip?.code || '',
        value: trip
      }}
      setSelectedOption={(v) => {
        v && setTrip(v.value);
        v?.value && setValue(v.value.id);
      }}
      label={label}
      onInputChange={(__: any, newInputValue: string) => {
        setSearch(newInputValue);
      }}
    />
  );
};

export default SelectTrip;
