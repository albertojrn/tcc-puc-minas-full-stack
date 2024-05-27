export const CONSTRAINTS = {
  originZipCode: {
    presence: {
      allowEmpty: false,
      message: '^O campo cep é obrigatório'
    },
    length: {
      is: 9,
      message: '^O cep é inválido'
    }
  }
}
