const express = require('express');
const router = express.Router();

const URL = require('../models/url');

/** 
 * @swagger
 * /{shortUrl}:
 *  get:
 *    summary: Redirects to the original url.
 *    parameters:
 *      - in: path
 *        name: urlCode
 *        required: true
 *        description: The generated URL code.
 *    responses:
 *      '200':
 *        description: A successful response.
 *      '400':
 *        description: Unsuccessful response.
 */
router.get('/:urlCode', async (req, res) => {
    const { urlCode } = req.params;

    const url = await URL.findOne({
        urlCode
    });

    if(url)
        return res.redirect(url.originalUrl);
    else 
        return res.status(404).json(`Url ${shortUrl} not found.`);

});

module.exports = router;