import MapComponent from "../../components/Map";
import { Option } from "../../components/Select/SelectWithSearch";
import { useState } from "react";
import SelectToAndFrom from "../../components/Select/SelectToAndFrom";
import { BusStop } from "../../request/busStop/useBusStop";

const Home = () => {
  const [from, setFrom] = useState<Option<BusStop> | null>(null);
  const [to, setTo] = useState<Option<BusStop> | null>(null);

  return (
    <>
      <SelectToAndFrom setValue={setFrom} value={from} label="De" />
      <SelectToAndFrom setValue={setTo} value={to} label="Para" />
      <MapComponent from={from?.value} to={to?.value} />
    </>
  );
};

export default Home;
