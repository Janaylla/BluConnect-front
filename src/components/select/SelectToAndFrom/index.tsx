import SelectWithSearch, { Option } from "../SelectWithSearch";
import useBusStop, { BusStop } from "../../../request/useBusStop";
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
  const { data } = useBusStop({ search });
  return (
    <>
      <SelectWithSearch
        options={data?.map((v) => ({ label: v.name, value: v })) || []}
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
