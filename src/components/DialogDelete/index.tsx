import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Box } from "@mui/material";
import { Delete, X } from "@mui/icons-material";
import { useState } from "react";

export interface SimpleDialogProps {
  idDelete?: number;
  onClose: () => void;
  onDeleted: (id: number) => void;
}

export default function DialogDelete(props: SimpleDialogProps) {
  const { onClose, idDelete, onDeleted } = props;

  return (
    <Dialog onClose={onClose} open={!!idDelete}>
      <DialogTitle>Tem certeza que deseja excluir?</DialogTitle>
      <Box padding={"20px"} gap="10px" display={"flex"}>
        <Button
          variant="contained"
          startIcon={<Delete />}
          onClick={() => {
            onDeleted(idDelete!);
            onClose();
          }}
        >
          Excluir
        </Button>
        <Button variant="outlined" endIcon={<X />} onClick={onClose}>
          Cancelar
        </Button>
      </Box>
    </Dialog>
  );
}

export const useDialogDelete = () => {
  const [idDelete, setIdDelete] = useState<number | undefined>();
  const handleOpen = (id: number) => setIdDelete(id);
  const handleClose = () => setIdDelete(undefined);
  return { idDelete, handleOpen, handleClose };
};
