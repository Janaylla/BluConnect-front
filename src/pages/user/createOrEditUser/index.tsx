import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { userForm, UserForm } from "../user.type";
import { useCreateUser } from "../../../request/user/useCreateUser";

const CreateOrEditUser = () => {
    const [form, setForm] = useState<UserForm>({
        email: "",
        name: "",
        password: "",
    });


    const { mutate: createUser } = useCreateUser();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        createUser(form);
    };



    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <Box marginY={2} gap={2} display={"flex"} flexDirection="column">
                    {Object.entries(userForm).map(
                        ([key, value]) => (
                            <TextField
                                fullWidth
                                size="medium"
                                key={key}
                                id="outlined-basic"
                                label={value.label}
                                required={value.required}
                                type={value.type}
                                name={key}
                                value={form[key as keyof UserForm]}
                                onChange={handleChange}
                            />
                        )
                    )}
                    <Box>
                        <Button size="large" type="submit" variant="contained">
                            Salvar
                        </Button>
                        </Box>
                </Box>
            </form>
        </Box>
    );
};

export default CreateOrEditUser;
