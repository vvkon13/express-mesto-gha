const router = require('express').Router();

const {
  getUsers,
  getUser,
  getUserMe,
  patchUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.get('/me', getUserMe);
router.patch('/me', patchUser);
router.patch('/me/avatar', patchUser);

module.exports = router;
