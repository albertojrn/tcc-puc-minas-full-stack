
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

app.use('/api/v1/features', featuresRoute)
app.use('/api/v1/feature-values', featureValuesRoute)
app.use('/api/v1/products', productsRoute)
app.use('/api/v1/file', fileRoute)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
