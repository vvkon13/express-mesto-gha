const router = require('express').Router();

const {
  getUsers,
  createUser,
  getUser,
  patchUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:userId', getUser);
router.patch('/me', patchUser);
router.patch('/me/avatar', patchUser);

module.exports = router;
