import MapComponent from "../../components/Map";
import SelectWithSearch, { Option } from "../../components/SearchFromTo";
import { useState, useEffect } from "react";
import { Coordinator } from "../../types/Coordinator";
const options: Option<Coordinator>[] = [
  {
    label: "Gaspar",
    value: { x: -26.9334, y: -48.9538 },
  },
  {
    label: "Blumenau",
    value: { x: -26.9159, y: -49.0713 },
  },
];

const Home = () => {
  const [from, setFrom] = useState<Option<Coordinator> | null>(null);
  const [to, setTo] = useState<Option<Coordinator> | null>(null);

  return (
    <>
      <SelectWithSearch
        options={options}
        selectedOption={from}
        setSelectedOption={setFrom}
        label="De"
      />
      <SelectWithSearch
        options={options}
        selectedOption={to}
        setSelectedOption={setTo}
        label="Para"
      />
      <MapComponent from={from?.value} to={to?.value}/>
    </>
  );
};

export default Home;
