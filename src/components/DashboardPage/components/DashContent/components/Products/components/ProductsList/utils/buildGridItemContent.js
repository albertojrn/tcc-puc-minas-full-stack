import { Typography } from '@mui/material'
import { MAX_STRING_LENGTH } from '../constants/gridParams'
import { Thumb } from '../../ProductsListItem/styles'
import ProductsListItemToolbox from '../../ProductsListItemToolbox'

function buildGridItemContent(page, product, prop) {
  if (['description', 'title', 'sku'].includes(prop)) {
    let val = product[prop]
    if (val?.length > MAX_STRING_LENGTH) {
      val = val.slice(0, MAX_STRING_LENGTH)
      val += '...'
    }
    return (
      <Typography
        variant='body1'
      >
        {val ?? '-'}
      </Typography>
    )
  }
  if (prop === 'thumb') {
    return (
      <Thumb src={`${process.env.PUBLIC_URL}/images/${product.images?.[0]}`} alt={product.images?.[0]?.slice(0, 5)} />
    )
  }
  return (
    <ProductsListItemToolbox page={page} product={product} />
  )
}

export default buildGridItemContent
