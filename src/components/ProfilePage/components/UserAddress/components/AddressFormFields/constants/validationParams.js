export const CONSTRAINTS = {
  address1: {
    presence: {
      allowEmpty: false,
      message: '^O endereço é inválido.'
    },
  },
  address1Num: {
    presence: {
      allowEmpty: false,
      message: '^Número inválido.'
    },
  },
  address2: {
    presence: {
      allowEmpty: false,
      message: '^O complemento é inválido.'
    },
  },
  city: {
    presence: {
      allowEmpty: false,
      message: '^A cidade é inválida.'
    },
  },
  addressState: {
    presence: {
      allowEmpty: false,
      message: '^O estado é inválido.'
    },
  },
  zipCode: {
    presence: {
      allowEmpty: false,
      message: '^O campo cep é obrigatório'
    },
    length: {
      is: 9,
      message: '^O cep é inválido'
    }
  },
}
