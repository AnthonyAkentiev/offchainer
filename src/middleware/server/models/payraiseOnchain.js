// Import dependencies
const web3 = require('../config/web3')
const fs = require('fs')
const path = require('path')
const promisify = require('../utils/promisify')

// Define values
CONTRACT_BUILD_FILE = '../../../blockchain/build/contracts/PayRaiseOnChain.json'
INITIAL_GAS = 4700000

// Import contract data
const contractData = JSON.parse(fs.readFileSync(path.join(__dirname, CONTRACT_BUILD_FILE)))

// Create contract object
const contract = web3.eth.contract(contractData.abi)

// Set default account
var interval = setInterval(function () { // Poll to wait for web3 connection
	if (web3.isConnected()) {
		web3.eth.defaultAccount = web3.eth.accounts[0] // Set default account
		clearInterval(interval)
	}
}, 500)

// Define functions
/**
 * Create a new pay raise contract instance.
 *
 * @param {Object} contractDetails The details of the contract
 * @return {Promise} A promise that depends on the contract creation
 */
function create(contractDetails) {
	return promisify(contract.new)({
		args: [
			contractDetails.percentage,
			contractDetails.department,
			contractDetails.fromStartDate,
			{
				from: web3.eth.accounts[0],
				data: contractData.bytecode,
				gas: INITIAL_GAS
			}
		],
		requiredProperty: 'address',
		context: contract
	})
}


/**
 * Set the address for the used contract instance to a given address.
 *
 * @param {String} address The given address
 * @return {String} The instance store in the contract
 */
function setInstance(address) {
	return contract.instance = contract.at(address)
}

/**
 * Check if there is an instance address stored for the contract.
 *
 * @returns {Boolean} Whether there is an address stored
 */
function hasInstance() {
	return contract.instance != undefined
}

// Export functions
module.exports = {
	create,
	setInstance,
	hasInstance
}
