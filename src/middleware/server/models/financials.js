// Import dependencies
const web3 = require('../config/web3')
const fs = require('fs')
const path = require('path')
const promisify = require('../utils/promisify')
const events = require('../utils/events')
const Database = require('./database')
const Sequelize = require('sequelize')
const MerkleTree = require('../utils/merkleTree')
const sha3 = require('web3-utils').soliditySha3

// Define values
CONTRACT_BUILD_FILE = '../../../blockchain/build/contracts/Financials.json'
INITIAL_GAS = 4700000

// Import contract data
const contractData = JSON.parse(fs.readFileSync(path.join(__dirname, CONTRACT_BUILD_FILE)))

// Create contract object
const contract = web3.eth.contract(contractData.abi)

// Establish database connection
const db = new Database(
	'financials',
	{
		sc_id: { type: Sequelize.INTEGER },
		root_hash: {type : Sequelize.STRING},
		company_name: { type: Sequelize.STRING },
		recording_date: { type: Sequelize.STRING },
		total_sales: { type: Sequelize.INTEGER },
		cogs: { type: Sequelize.INTEGER },
		inventory_stock: { type: Sequelize.INTEGER },
		cash_counter: { type: Sequelize.INTEGER },
		accounts_receivables: { type: Sequelize.INTEGER },
		accounts_payable: { type: Sequelize.INTEGER },
	}
)

//Contract construction
/**
 * Create a new contract instance.
 *
 * @return {Promise} A promise that depends on the contract creation
 */
function create() {
	console.log(web3.eth.accounts)
	return promisify(contract.new)({
		args: [
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
 * Create the root, store the root into the SC, and then store the SC id, the root hash, and the raw data in DB.
 * 
 * @param {Object} financials The new financial record to add
 * @returns {Promise} A promise that depends on the successful  insert of financials object
 */
function add(financials) {
	return new Promise((resolve, reject) => {

		const handler = (err) => reject(err)

		const dbRow = {
			company_name: financials.companyName,
			recording_date: financials.recordingDate,
			total_sales: financials.totalSales,
			cogs: financials.cogs,
			inventory_stock: financials.inventoryStock,
			cash_counter: financials.cashCounter,
			accounts_receivables: financials.accountsReceivables,
			accounts_payable: financials.accountsPayable
		}

		const leaves = [
			financials.companyName,
			financials.recordingDate,
			financials.totalSales,
			financials.cogs,
			financials.inventoryStock,
			financials.cashCounter,
			financials.accountsReceivables,
			financials.accountsPayable
		]

		// watch for the returned index
		events.watch(contract.instance.PostAppendEvent).then(result => {
			// save the index to the db with the row
			if(result.args != null) {
				dbRow["sc_id"] = result.args.indexInSmartContract.toNumber();
				dbRow["root_hash"] = result.args.rootHash;
				// just needs to update the DB now.
				return db.create(dbRow)
			} 

		}).then(result => {
			resolve("ADDED new financial entry")
		}).catch(handler)


		// create the merkle root hash
		const hashes = [];
		for(let i = 0; i < leaves.length; i++) {
			if(typeof leaves[i] === "number") {
				hashes.push(sha3({value: leaves[i].toString(), type: 'uint256'}))
			} else {
				hashes.push(sha3({value: leaves[i], type: 'string'}))
			}
		}
		const tree = new MerkleTree(hashes, sha3, {hashLeaves: false, values: leaves})
		const rootHash = tree.getRoot()

		promisify(contract.instance.append)({
			args: rootHash
		}).catch(handler)

	})

}

/**
 * Return all financial records in the database.
 *
 * @return {Promise} A promise that depends on the contract creation
 */
function getAllFinancials() {
	return db.readAll();
}

/**
 * Return Root has for a specific entry specified by index
 *
 * @return {Promise} A pormise that contains the return value: roothash
 */
function getRootHash(indexOfRecord){
	return new promisify(contract.instance.getRootHash)({args: indexOfRecord})
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
	add,
	getAllFinancials,
	setInstance,
	getRootHash,
	hasInstance
}