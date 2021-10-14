const express = require("express");
const router = express.Router();

const URL = require("../models/url");

/**
 * @swagger
 * /{shortUrl}:
 *  get:
 *    summary: Redirects to the original url.
 *    tags: [v1]
 *    parameters:
 *      - in: path
 *        name: urlCode
 *        required: true
 *        description: The generated URL code.
 *    responses:
 *      '200':
 *        description: A successful response.
 *      '404':
 *        description: Resource not found.
 */
router.get("/:urlCode", async (req, res) => {
  const { urlCode } = req.params;

  // Check to see if the url has been previously shortened.
  const url = await URL.findOne({
    code: urlCode,
  });

  if (url)
    // Redirect client to original url.
    return res.redirect(url.original);

  // Return url code not found error.
  return res.status(404).json({ err: `Url code '${urlCode}' not found.` });
});

module.exports = router;
