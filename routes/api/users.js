const express = require('express');
const router = express.Router();

//since we've already defined use in the server, we can just use /test as an endpoint
//we'll actually input /api/users/test to test this

// @route GET api/posts/test
// @desc Tests users route
// @access Public
router.get('/test', (req, res) => res.json({ msg: "Users Works" }));

module.exports = router;