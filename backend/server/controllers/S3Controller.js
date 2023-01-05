const { generateUploadURL } = require('../middleware/s3')

exports.get_getS3URL = async (req, res) => {
    const url = await generateUploadURL();
    res.status(201).send({ url })
}