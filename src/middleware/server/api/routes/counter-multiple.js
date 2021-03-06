// Import dependencies
const router = require('express').Router()
const counterMultiple = require('../../models/counter-multiple')
const db = require('../../models/database')
const res = require('../../utils/response')

// Set response functions
const response = res.response
const error = res.error

// Routes
// Create a new counter contract
router.post('/create', (req, res, next) => {
	counterMultiple.create(res)
		.then(contract => {
			counterMultiple.setInstance(contract.address) // Store the address
			response(res, 200, {address: contract.address})
		})
		.catch(err => error(res, 500, err))
})

// Add counter to contract
router.post('/add', (req, res, next) => {
	counterMultiple.add(req.body)
		.then(result => response(res, 200, result))
		.catch(err => error(res, 500, err))
})

// Get all Counters from database
router.get('/', (req, res, next) => {
	counterMultiple.getAllFromDatabase()
		.then(result => response(res, 200, result))
		.catch(err => error(res, 500, err))
})

// Get roothash of given id from smart contract
router.get('/:id/root-hash', (req, res, next) => {
	counterMultiple.getRootHashFromSmartContract(req.params.id)
		.then(result => response(res, 200, result))
		.catch(err => error(res, 500, err))
})

// Increase counter of specific row and column
router.post('/:rowId/column/:colId/increase', (req, res, next) => {
	var colId
	const badRequest = () => response(res, 400, 'Invalid index.')
	try {
		colId = parseInt(req.params.colId)
	}
	catch (err) {
		badRequest()
	}
	if (typeof(colId) !== 'number' ||colId < 0 || colId > 3) return badRequest()
	counterMultiple.increaseSingle(req.params.rowId, colId)
		.then(result => response(res, 200, result))
		.catch(err => error(res, 500, err))
})

// Export module
module.exports = router
