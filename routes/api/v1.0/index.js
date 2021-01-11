const express = require('express');
const router = express.Router();

/**      Auth route         */
router.use('/auth', require('./routers/auth/auth.router'));
/**      End auth route    */

/**      Settings route         */
router.use('/users', require('./routers/setting/user.router'));
/**      End settings route    */

module.exports = router;
