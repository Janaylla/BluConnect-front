import SelectWithSearch, { Option } from "../SelectWithSearch";
import useGetListBusStop, { BusStop } from "../../../request/busStop/useGetListBusStop";
import { useState } from "react";
const SelectToAndFrom = ({
  label,
  setValue,
  value,
}: {
  label: string;
  value: Option<BusStop> | null;
  setValue: React.Dispatch<React.SetStateAction<Option<BusStop> | null>>;
}) => {
  const [search, setSearch] = useState("");
  const { data } = useGetListBusStop({ search, limit: 10, page: 1 });
  return (
    <>
      <SelectWithSearch
        options={data?.rows?.map((v) => ({ label: v.name, value: v })) || []}
        selectedOption={value}
        setSelectedOption={setValue}
        label={label}
        onInputChange={(_, newInputValue) => {
          setSearch(newInputValue);
        }}
      />
    </>
  );
};

export default SelectToAndFrom;
