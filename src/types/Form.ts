
export interface InputForm {
    label: string;
    required: boolean;
    type: "time" | "text" | "select" | "number" | "boolean";
    component?: (p: {
        label: string;
        setValue: (id: string | number) => void;
    }) => JSX.Element
}

export type FormTemplate<InputsTypes> = Record<keyof InputsTypes, InputForm> 