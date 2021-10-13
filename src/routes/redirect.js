const express = require('express');
const router = express.Router();

const URL = require('../models/url');

/**
 * @swagger
 * 
 */
router.get('/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;

    const url = await URL.findOne({
        shortUrl
    });

    if(url)
        return res.redirect(url.originalUrl);
    else 
        return res.status(404).json(`Url ${shortUrl} not found.`);

});

module.exports = router;