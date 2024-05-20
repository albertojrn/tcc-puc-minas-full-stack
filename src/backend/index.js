
require('dotenv/config')

const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3002
app.use(cors())
app.use(express.json())

const featuresRoute = require('./api/v1/features')
const featureValuesRoute = require('./api/v1/feature-values')
const productsRoute = require('./api/v1/products')
const fileRoute = require('./api/v1/file')
const productImagesRoute = require('./api/v1/product-images')
const productFeaturesRoute = require('./api/v1/product-features')
const productVariationsRoute = require('./api/v1/product-variations')

app.use('/api/v1/features', featuresRoute)
app.use('/api/v1/feature-values', featureValuesRoute)
app.use('/api/v1/products', productsRoute)
app.use('/api/v1/file', fileRoute)
app.use('/api/v1/product-images', productImagesRoute)
app.use('/api/v1/product-features', productFeaturesRoute)
app.use('/api/v1/product-variations', productVariationsRoute)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
