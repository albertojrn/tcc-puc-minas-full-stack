export const CONSTRAINTS = {
  fromDate: {
    presence: {
      allowEmpty: false,
      message: '^A data não é válida.'
    },
  },
  toDate: {
    presence: {
      allowEmpty: false,
      message: '^A data não é válida.'
    },
  },
}
