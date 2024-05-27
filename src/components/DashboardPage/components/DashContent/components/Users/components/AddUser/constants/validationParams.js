export const CONSTRAINTS = {
  email: {
    email: { message: '^O email é inválido' },
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
      message: '^O CPF é inválido.'
    },
  },
  birthDate: {
    presence: {
      allowEmpty: false,
      message: '^A data de nascimento é inválida.'
    },
  },
  gender: {
    presence: {
      allowEmpty: false,
      message: '^O gênero é inválido.'
    },
  },
  phone: {
    presence: {
      allowEmpty: false,
      message: '^O telefone é inválido.'
    },
  },
  userName: {
    presence: {
      allowEmpty: false,
      message: '^O nome é inválido.'
    },
  },
}
