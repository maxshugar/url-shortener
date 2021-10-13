const express = require('express');
const router = express.Router();

const validUrl = require('valid-url');
const shortId = require('shortid');
const URL = require('../models/url');

// API base endpoint.
const baseUrl = 'http://localhost:3000';

/** 
 * @swagger
 * /shorten:
 *  post:
 *    summary: Shortens a url.
 *    requestBody:
 *      required: true
 *      description: The url to be shortened.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              originalUrl:    
 *                type: string
 *                required: true
 *    responses:
 *      '200':
 *        description: A successful response.
 *      '400':
 *        description: Unsuccessful response.
 */
router.post('/shorten', async (req, res) => {
    const { originalUrl } = req.body;

    // Ensure parameter has been passed in request body.
    if (!originalUrl) return res.status(400).json('Url parameter missing from request body.');

    // Ensure format url is a valid uri.
    if (!validUrl.isUri(originalUrl)) return res.status(400).json('Original url invalid.');

    try {
        // Check to see whether the URL has already been shortened.
        let url = await URL.findOne({
            originalUrl
        });
        // Return url object if found in mongodb.
        if (url) return res.status(200).json(url);

        // Generate the shortened url.
        const urlCode = shortId.generate();
        const shortUrl = `${baseUrl}/${urlCode}`;

        // Create a new url mongodb document.
        url = new URL({
            originalUrl,
            urlCode,
            shortUrl
        });

        // Save the url object to mongodb.
        await url.save();
        // Return url object if found in mongodb.
        if (url) return res.status(200).json(url);
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }

});

module.exports = router;