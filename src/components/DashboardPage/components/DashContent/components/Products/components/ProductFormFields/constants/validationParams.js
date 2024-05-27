export const CONSTRAINTS = {
  title: {
    presence: {
      allowEmpty: false,
      message: '^O título é inválido.'
    },
  },
  description: {
    presence: {
      allowEmpty: false,
      message: '^A descrição é inválida.'
    },
  },
  depth: {
    presence: {
      allowEmpty: false,
      message: '^É necessário para o cálculo do frete.'
    },
    numericality: {
      greaterThan: 0,
      message: '^O número deve ser maior do que 0.'
    }
  },
  width: {
    presence: {
      allowEmpty: false,
      message: '^É necessário para o cálculo do frete.'
    },
    numericality: {
      greaterThan: 0,
      message: '^O número deve ser maior do que 0.'
    }
  },
  height: {
    presence: {
      allowEmpty: false,
      message: '^É necessário para o cálculo do frete.'
    },
    numericality: {
      greaterThan: 0,
      message: '^O número deve ser maior do que 0.'
    }
  },
}
