const router = require('express').Router();

const {getMyUserInfo, updateUserInfo} = require('../controllers/users');
const {validateUserInfo} = require('../middlewares/validation');
router.get('/users/me', getMyUserInfo);
router.patch('/users/me', validateUserInfo, updateUserInfo);

module.exports = router;