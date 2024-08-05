import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { secondsToHHMM, TravelScheduleForm, travelScheduleFormTemplate } from "../travelSchedule.type";
import { useGetTravelSchedule } from "../../../request/travelSchedule/useGetTravelSchedule";
import { useUpdateTravelSchedule } from "../../../request/travelSchedule/useUpdateTravelSchedule";
import Form from "../../../components/Form";
import { useCreateTravelSchedule } from "../../../request/travelSchedule/useCreateTravelSchedule";

const CreateOrEditTravelSchedule = () => {
  const { id } = useParams<{ id: string }>(); // Obtém o ID da URL
  const [form, setForm] = useState<TravelScheduleForm>({
    friday: false,
    monday: false,
    saturday: false,
    sunday: false,
    thursday: false,
    time: '',
    tripId: 0,
    tuesday: false,
    wednesday: false
  })
  const { data: travelSchedule, isLoading } = useGetTravelSchedule(id as string);
  const { mutate: updateTravelSchedule } = useUpdateTravelSchedule();
  const { mutate: creteTravelShedule } = useCreateTravelSchedule()
  useEffect(() => {
    if(travelSchedule){
      setForm({
        ...travelSchedule,
        time: secondsToHHMM(travelSchedule.time)
      })
    }
  }, [travelSchedule])
  const handleSubmit = async () => {
    const [h, m] = String(form.time).split(':')
    const time = +h * 60 * 60 + +m * 60
    const body = {
      ...form,
      time
    }
    if (id) {
      updateTravelSchedule({ id, form: body });
    } else {
      creteTravelShedule(body)
    }
  };

  if (isLoading && id) return <div>Carregando...</div>;

  return (
    <Box>
      <Form
        form={form}
        formTemplate={travelScheduleFormTemplate}
        handleSubmit={handleSubmit}
        setForm={setForm}
      />
    </Box>
  );
};

export default CreateOrEditTravelSchedule;
