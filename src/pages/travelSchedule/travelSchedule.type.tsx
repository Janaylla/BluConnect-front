import { Box, TextField } from "@mui/material";

export interface TravelScheduleForm {
  time: string | number;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  tripId: number;
}
export function secondsToHHMM(seconds: number) {
  const totalMinutes = Math.floor(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
}

export const HHMMToSeconds = (time: string) => {
  const [h, m] = String(time).split(':')
  const seconds = +h * 60 * 60 + +m * 60
  return seconds;
}
export const weeks: Record<string, string> = {
  monday: 'Seg',
  thursday: 'Ter',
  wednesday: 'Qua',
  tuesday: 'Qui',
  friday: 'Sex',
  saturday: 'Sáb',
  sunday: 'Dom',
}

export const FilterHHMMComponent = ({ setSearchs }: { setSearchs: (v: any, key: string) => void }) => {
  return <Box display={'flex'} gap={1}>
    <TextField
      type="time"
      size="small"
      variant="standard"
      onChange={(e) => setSearchs(HHMMToSeconds(e.target.value), 'time_from')}
    />
    <p>Até</p>
    <TextField
      type="time"
      size="small"
      variant="standard"
      onChange={(e) => setSearchs(HHMMToSeconds(e.target.value), 'time_to')}
    /></Box>
}