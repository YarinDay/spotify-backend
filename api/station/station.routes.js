const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getStations, getStationById, addStation, updateStation, removeStation } = require('./station.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getStations)
router.get('/:id', getStationById)
router.post('/', addStation)
router.put('/:id', updateStation)
router.delete('/:id', removeStation)
router.delete('/:id', requireAuth, requireAdmin, removeStation)

module.exports = router