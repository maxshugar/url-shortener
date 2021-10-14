const express = require("express");
const router = express.Router();

const validUrl = require("valid-url");
const shortId = require("shortid");
const URL = require("../models/url");
const logger = require("../util/logger");
const config = require("../util/config");

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
router.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;

  // Ensure parameter has been passed in request body.
  if (!originalUrl)
    return res
      .status(400)
      .json("Parameter 'originalUrl' missing from request body.");

  // Ensure url is a valid uri.
  if (!validUrl.isUri(originalUrl))
    return res.status(400).json("Original url invalid.");

  try {
    // Check to see whether the URL has already been shortened.
    let url = await URL.findOne({
      original: originalUrl,
    });
    // Return url object if found in mongodb.
    if (url)
      return res
        .status(200)
        .json({
          littleLink: url.little,
          code: url.code,
          original: url.original,
        });

    // Generate the shortened url.
    const urlCode = shortId.generate();
    const shortUrl = `${config.baseUrl}/${urlCode}`;

    // Create a new url mongodb document.
    url = new URL({
      original: originalUrl,
      code: urlCode,
      little: shortUrl,
    });

    // Save the url object to mongodb.
    await url.save();

    // Return url object if found in mongodb.
    if (url)
      return res
        .status(200)
        .json({
          littleLink: url.little,
          code: url.code,
          original: url.original,
        });
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
