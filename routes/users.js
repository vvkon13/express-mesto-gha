const router = require('express').Router();
const {
  celebrate, Joi,
} = require('celebrate');

const {
  getUsers,
  getUser,
  getUserMe,
  patchUser,
} = require('../controllers/users');
const { USER_VALIDATION_OBJECT } = require('../utils/constants');

router.get('/', getUsers);
router.get('/me', getUserMe);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }).unknown(true),
}), getUser);
router.patch('/me', celebrate(USER_VALIDATION_OBJECT), patchUser);
router.patch('/me/avatar', celebrate(USER_VALIDATION_OBJECT), patchUser);

module.exports = router;
