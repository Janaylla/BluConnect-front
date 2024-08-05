import { Box, Button, TextField } from "@mui/material";
import MapPointerComponent from "../../../components/MapPointers";
import { useEffect, useState } from "react";
import { LatLng } from "leaflet";
import { useParams } from "react-router-dom";
import { TravelScheduleForm, busForm } from "../travelSchedule.type";
import { useGetTravelSchedule } from "../../../request/travelSchedule/useGetTravelSchedule";
import { useUpdateTravelSchedule } from "../../../request/travelSchedule/useUpdateTravelSchedule";

const EditTravelSchedule = () => {
  const { id } = useParams<{ id: string }>(); // Obtém o ID da URL
  const [form, setForm] = useState<TravelScheduleForm>({
    friday: false,
    monday: false,
    saturday: false,
    sunday: false,
    thursday: false,
    time: 0,
    tripId: 0,
    tuesday: false,
    wednesday: false
  })
  const { data: travelSchedule, isLoading } = useGetTravelSchedule(id as string);
  const { mutate: updateTravelSchedule } = useUpdateTravelSchedule();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [pointer, setPointer] = useState<LatLng>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    id && updateTravelSchedule({ id, form });
  };

  if (isLoading) return <div>Carregando...</div>;

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box marginY={2} gap={2} display={"flex"}>
          {Object.entries(busForm).map(([key, value]) => (
            <TextField
              fullWidth
              size="small"
              key={key}
              id="outlined-basic"
              label={value.label}
              required={value.required}
              type={value.type}
              name={key}
              value={form[key as keyof TravelScheduleForm]}
              onChange={handleChange}
            />
          ))}
          <Button size="small" type="submit" variant="contained">
            Salvar
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditTravelSchedule;
