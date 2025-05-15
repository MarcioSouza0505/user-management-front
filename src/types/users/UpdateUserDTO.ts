/**
 * Todos os campos de CreateUserDTO ficam opcionais aqui
 */
export interface UpdateUserDTO {
  id: number;
  name?: string;
  email?: string;
  password?: string;
  documentNumber?: string;
  birthDate?: string;
}
