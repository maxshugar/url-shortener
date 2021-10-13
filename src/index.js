const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const router = express.Router();



app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
})
