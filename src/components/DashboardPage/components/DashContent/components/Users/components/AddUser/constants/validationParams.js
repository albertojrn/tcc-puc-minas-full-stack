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
  },
  cpf: {
    presence: {
      allowEmpty: false,
      message: '^O CPF não é válido.'
    },
  },
  birthDate: {
    presence: {
      allowEmpty: false,
      message: '^A data de nascimento não é válida.'
    },
  },
  gender: {
    presence: {
      allowEmpty: false,
      message: '^O gênero não é válido.'
    },
  },
  phone: {
    presence: {
      allowEmpty: false,
      message: '^O telefone não é válido.'
    },
  },
  userName: {
    presence: {
      allowEmpty: false,
      message: '^O nome não é válido.'
    },
  },
}
