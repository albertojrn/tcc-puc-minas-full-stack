const express = require('express')
const multer = require('multer')
const db = require('../../dbConfig')
const errorHandler = require('../../middlewares/errorHandler')
const responseHandler = require('../../middlewares/responseHandler')
const sqlErrorHandler = require('../../middlewares/sqlErrorHandler')

const router = express.Router()

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({ storage })

router.post('/', upload.array('files'), (req, res, next) => {
  try {
    if (!req.files) {
      return res.status(400).json({ error: 'No file uploaded' })
    }
    res.json({ status: 200, message: 'File uploaded successfully', files: req.files })
  }
  catch (err) {
    errorHandler(err, req, res, next)
  }
})

module.exports = router
