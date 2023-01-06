const { generateUploadURL } = require('../middleware/s3')

exports.get_getS3URL = async (req, res) => {
    const { fileName, fileType } = req.query
    try {
        const url = await generateUploadURL(fileName, fileType);
        res.status(201).send({ data: url })
    } catch (error) {
        res.status(400).send({ message: error })
    }
    
}