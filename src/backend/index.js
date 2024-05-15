
require('dotenv/config')

const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3002
app.use(cors())
app.use(express.json())

const featuresRoute = require('./api/v1/features')

app.use('/api/v1/features', featuresRoute)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
