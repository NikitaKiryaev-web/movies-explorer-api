const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const { validateSignIn, validateSignUp } = require('../middlewares/validation');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', validateSignIn, login);
router.post('/signup', validateSignUp, createUser);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
