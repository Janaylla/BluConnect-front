
interface Input {
    label: string;
    required: boolean;
    type: "time" | "text" | "select" | "number" | "boolean";
}

export type Form<InputsTypes> = Record<keyof InputsTypes, Input> 