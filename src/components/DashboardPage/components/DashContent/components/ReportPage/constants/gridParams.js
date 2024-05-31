export const COLUMNS = [
  {
    align: 'center',
    header: 'Pedido',
    id: 'id',
    sizes: { xs: 1 }
  },
  {
    header: 'Data',
    id: 'date',
    sizes: { xs: 1.5 }
  },
  {
    align: 'center',
    header: 'Qtd produtos',
    id: 'quantityProducts',
    sizes: { xs: 2 }
  },
  {
    header: 'Método de pagamento',
    hideInMobile: true,
    id: 'payment_method',
    sizes: { xs: 3 }
  },
  {
    align: 'center',
    header: 'Parcelas',
    id: 'installments',
    sizes: { xs: 1.5 }
  },
  {
    align: 'center',
    header: 'Frete',
    id: 'shipping_fee',
    sizes: { xs: 1.5 }
  },
  {
    align: 'center',
    header: 'Total',
    id: 'total_products',
    sizes: { xs: 1.5 }
  },
]

export const MAX_STRING_LENGTH = 75
