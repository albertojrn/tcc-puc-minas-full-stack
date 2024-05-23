import moment from 'moment'

export const CONSTRAINTS = {
  birthDate: {
    datetime: {
      latest: moment.utc().subtract(16, 'years'),
      message: '^A data de nascimento não é válida ou sua idade é menor do que 16 anos',
    }
  },
  cpf: {
    presence: {
      allowEmpty: false,
      message: '^O campo cpf é obrigatório'
    },
    length: {
      is: 14,
      message: '^O cpf não é válido'
    }
  },
  email: {
    email: { message: '^O email não é válido' },
  },
  gender: {
    presence: {
      allowEmpty: false,
      message: '^O campo gênero é obrigatório'
    }
  },
  password: {
    length: {
      minimum: 8,
      message: '^A senha deve conter pelo menos 8 caracteres',
    }
  },
  phone: {
    presence: {
      allowEmpty: false,
      message: '^O campo telefone é obrigatório'
    },
    length: {
      minimum: 14,
      maximum: 15,
      message: '^O telefone não é válido'
    }
  },
  userName: {
    presence: {
      allowEmpty: false,
      message: '^O campo nome é obrigatório'
    },
    length: {
      minimum: 3,
      message: '^O nomé é muito curto',
    }
  },
}
