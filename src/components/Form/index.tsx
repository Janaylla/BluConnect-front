import { Box, Button, Checkbox, FormControlLabel, TextField } from "@mui/material"
import { FormTemplate, InputForm } from "../../types/Form"

interface FormProps<T, Form> {
    formTemplate: FormTemplate<T>,
    form: Form;
    setForm: React.Dispatch<React.SetStateAction<Form>>;
    handleSubmit: () => void
}

export default function Form<T, Form>({
    form,
    formTemplate,
    handleSubmit,
    setForm
}: FormProps<T, Form>) {
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    return <form onSubmit={onSubmit}>
        <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'end'}
            width={'100%'}
        >
            <Box
                display={'flex'}
                flexWrap={'wrap'}
                gap={'16px'}
            >
                {
                    Object.entries(formTemplate).map((v: any) => {
                        const [key, value]: [keyof Form & string, InputForm] = v;
                        switch (value.type) {
                            case "boolean":
                                return <>
                                    <FormControlLabel control={
                                        <Checkbox
                                            checked={!!form[key]}
                                            onChange={
                                                (e) => setForm({
                                                    ...form,
                                                    [key]: !form[key]
                                                })
                                            }
                                        />} label={value.label} />
                                </>

                            case 'select':
                                const Component = value.component;
                                if (Component) {
                                    return <Component label={value.label} setValue={(id) => setForm({
                                        ...form,
                                        [key]: id
                                    })} />;
                                }
                                break;
                            default:
                                return <TextField
                                    fullWidth
                                    size="small"
                                    key={key}
                                    id="outlined-basic"
                                    label={value.label}
                                    required={value.required}
                                    type={value.type}
                                    name={key}
                                    value={form[key]}
                                    onChange={handleChange}
                                />
                        }
                    })
                }
            </Box>
            <Button
                size="medium" type="submit" variant="contained">
                Salvar
            </Button>
        </Box>
    </form>
}