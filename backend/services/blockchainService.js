const crypto = require('crypto');

/**
 * Computes the cryptographic SHA-256 hash of degree parameters
 * @param {Object} degreeDetails - serial number, name, program, graduationDate, cgpa
 * @returns {string} - hex string representation of SHA-256 hash
 */
const computeDegreeHash = (degreeDetails) => {
  const dataString = JSON.stringify({
    serialNumber: degreeDetails.degreeSerialNumber,
    name: degreeDetails.graduateName,
    program: degreeDetails.programName,
    date: degreeDetails.graduationDate,
    cgpa: degreeDetails.cgpa
  });
  
  return crypto.createHash('sha256').update(dataString).digest('hex');
};

/**
 * Simulates writing sensitive degree information to the Private Blockchain (AWS Managed Hyperledger/QLDB Datastore)
 * @param {Object} degreeData 
 * @returns {Promise<Object>} - AWS transaction details
 */
const recordOnPrivateBlockchain = async (degreeData) => {
  return new Promise((resolve) => {
    // Simulating block generation time (100ms)
    setTimeout(() => {
      const privateTxId = 'aws-qldb-tx-' + crypto.randomBytes(16).toString('hex');
      console.log(`[Private Blockchain] Securely recorded sensitive degree info. TxID: ${privateTxId}`);
      resolve({
        success: true,
        privateTxId,
        nodeEndpoint: 'https://managedblockchain.us-east-1.amazonaws.com/networks/n-IQRA123'
      });
    }, 150);
  });
};

/**
 * Simulates publishing the cryptographic degree hash to the Public Blockchain (e.g., Ethereum Mainnet/Testnet smart contract)
 * @param {string} degreeHash 
 * @returns {Promise<Object>} - public transaction details
 */
const publishHashToPublicBlockchain = async (degreeHash) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const publicTxId = '0x' + crypto.randomBytes(32).toString('hex');
      const publicContractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // mock contract
      console.log(`[Public Blockchain] Published Degree Hash to Smart Contract. TxID: ${publicTxId}`);
      resolve({
        success: true,
        publicTxId,
        publicContractAddress
      });
    }, 200);
  });
};

module.exports = {
  computeDegreeHash,
  recordOnPrivateBlockchain,
  publishHashToPublicBlockchain
};
