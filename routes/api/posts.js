const express = require('express');
const router = express.Router();

//since we've already defined use in the server, we can just use /test as an endpoint

// @route GET api/posts/test
// @desc Tests posts route
// @access Public
router.get('/test', (req, res) => res.json({ msg: "Posts Works" }));

module.exports = router;