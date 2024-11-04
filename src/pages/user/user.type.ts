export interface UserForm {
  email: string; // Campo para e-mail do usuário
  password: string; // Campo para senha do usuário
  name: string; // Nome do usuário
}

// Interface para os campos do formulário
interface UserFormField {
  label: string;
  required: boolean;
  type: "number" | "text" | "list";
}

// Definindo o formulário do usuário
export const userForm: Record<keyof UserForm, UserFormField> = {
  name: {
    label: "Nome do Usuário",
    required: true,
    type: "text",
  },
  email: {
    label: "E-mail",
    required: true,
    type: "text",
  },
  password: {
    label: "Senha",
    required: true,
    type: "text",
  },
};
