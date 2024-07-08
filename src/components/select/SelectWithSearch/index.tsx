import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export interface Option<Value> {
  label: string;
  value: Value;
}

export interface PropsSelectWithSearch<Value> {
  options: Option<Value>[];
  label?: string;
  selectedOption: Option<Value> | null;
  onInputChange?: (event: React.ChangeEvent<{}>, newInputValue: string) => void;
  setSelectedOption: (value: Option<Value> | null) => void;
}

const SelectWithSearch = <Value,>({
  options,
  label,
  selectedOption,
  setSelectedOption,
  onInputChange,
}: PropsSelectWithSearch<Value>) => {
  return (
    <Autocomplete
      value={selectedOption}
      onChange={(event, newValue) => {
        setSelectedOption(newValue);
      }}
      options={options}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
      onInputChange={onInputChange}
    />
  );
};

export default SelectWithSearch;
