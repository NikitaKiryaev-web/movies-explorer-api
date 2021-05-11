const router = require('express').Router();

const { getMyUserInfo, updateUserInfo } = require('../controllers/users');
const { validateUserInfo } = require('../middlewares/validation');

router.get('/me', getMyUserInfo);
router.patch('/me', validateUserInfo, updateUserInfo);

module.exports = router;
