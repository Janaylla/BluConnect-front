import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import { UseQueryResult } from "react-query";
import { OutputData, QuerySearch } from "../../CompleteTable";

export interface Option<Value> {
  label: string;
  value: Value;
}

export interface PropsSelectWithSearch<Value> {
  label?: string;
  getLabelByValue: (v: Value) => string;
  useGetData(p: QuerySearch): UseQueryResult<OutputData<Value>, unknown>
  limit?: number
  setValue: (v: Value | null) => void;
}

const SelectWithSearch = <Value,>({
  label,
  useGetData,
  getLabelByValue,
  limit = 10,
  setValue
}: PropsSelectWithSearch<Value>) => {
  const [search, setSearch] = useState("");

  const { data } = useGetData({ search, limit, page: 1 });
  const [options, setOption] = useState<Option<Value>[]>([]);
  const [selectedOption, setSelectedOption] = useState<Option<Value> | null>(null)

  useEffect(() => {
    if (data) {
      setOption(data.rows.map((value) => ({
        label: getLabelByValue(value), value
      }
      )))
    }
  }, [data])
  return (
    <Autocomplete
      value={selectedOption}
      onChange={(event, newValue) => {
        setSelectedOption(newValue);
        setValue(newValue?.value || null)
      }}
      options={options}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
      onInputChange={(__: any, newInputValue: string) => {
        setSearch(newInputValue);
      }}
    />
  );
};

export default SelectWithSearch;
