const Degree = require('../models/degree');

// @desc    Verify degree by hash
// @route   GET /api/verify/:hash
// @access  Public
exports.verifyDegree = async (req, res) => {
  try {
    const { hash } = req.params;

    if (!hash) {
      return res.status(400).json({
        success: false,
        message: 'Cryptographic hash parameter is required'
      });
    }

    // Lookup degree using hash published to the ledger
    const degree = await Degree.findOne({ degreeHash: hash });

    if (!degree) {
      return res.status(404).json({
        success: false,
        verified: false,
        message: 'No record matching this degree hash was found on the ledger. Verification failed.'
      });
    }

    // Return verification result alongside ledger details
    res.status(200).json({
      success: true,
      verified: true,
      data: {
        serialNumber: degree.degreeSerialNumber,
        graduateName: degree.graduateName,
        programName: degree.programName,
        graduationDate: degree.graduationDate,
        cgpa: degree.cgpa,
        degreeHash: degree.degreeHash,
        pdfUrl: degree.pdfUrl,
        blockchain: {
          privateTxId: degree.blockchain.privateTxId,
          publicTxId: degree.blockchain.publicTxId,
          publicContractAddress: degree.blockchain.publicContractAddress,
          status: 'Confirmed'
        }
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
