export const CONSTRAINTS = {
  email: {
    email: { message: '^O email não é válido' },
  },
  password: {
    presence: true,
    length: {
      minimum: 8,
      message: '^A senha deve conter pelo menos 8 caracteres',
    }
  }
}
