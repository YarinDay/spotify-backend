const logger = require('../../services/logger.service')
const toyService = require('./toy-service')

module.exports = {
    getToys,
    getToyById,
    addToy,
    updateToy,
    removeToy
}
// router.get('/', (req, res) => {
//   let filterBy = { name: '', price: 0, inStock: true }

//     if (req.query.params) {
//         const params = JSON.parse(req.query.params)
//         filterBy = { name: params.name, price: params.price, inStock: params.inStock }
//       }

//     toyService.query(filterBy)
//         .then(toys => res.send(toys))
// })

async function getToys(req, res) {
    try {
        logger.debug('Getting Toys')
        var queryParams = req.query
        const toys = await toyService.query(queryParams)
        res.json(toys)
    } catch (err) {
        logger.error('Failed to get toys', err)
        res.status(500).send({ err: 'Failed to get toys' })
    }
}

// router.post('/', (req, res) => {
//     const toy = req.body
//     toyService.save(toy)
//         .then(toy => res.send(toy))
// })

async function addToy(req, res) {
    try {
        const toy = req.body
        const addedToy = await toyService.add(toy)
        console.log('Hey DICK');
        res.json(addedToy)
    } catch (err) {
        logger.error('Failed to add toy', err)
        res.status(500).send({ err: 'Failed to add toy' })
    }
}

async function getToyById(req, res) {
    try {
        const toyId = req.params.id // maybe req.params.toyId
        const toy = await toyService.getById(toyId)
        res.json(toy)
    } catch (err) {
        logger.error('Failed to get toy', err)
        res.status(500).send({ err: 'Failed to get toy' })
    }
}

async function updateToy(req, res) {
    try {
        const toy = req.body
        const updatedToy = await toyService.update(toy)
        res.json(updatedToy)
    } catch (err) {
        logger.error('Failed to update toy', err)
        res.status(500).send({ err: 'Failed to update toy' })

    }
}

// router.get('/:toyId', (req, res) => {
//     // console.log('req.params', req.params)
//     const { toyId } = req.params
//     toyService.getById(toyId)
//         .then((toy) => {
//             res.send(toy)
//         })
// })

async function removeToy(req, res) {
    try {
        const toyId = req.params.id;
        const removedId = await toyService.remove(toyId)
        res.send(removedId)
    } catch (err) {
        logger.error('Failed to remove toy', err)
        res.status(500).send({ err: 'Failed to remove toy' })
    }
}

// router.delete('/:toyId', (req, res) => {
//     console.log('Hey');
//     const { toyId } = req.params
//     toyService.remove(toyId)
//         .then(() => res.send({ Removed: `The toy ${toyId} removed succesfully` }))
// })
