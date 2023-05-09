const router = require('express').Router();
const {
  getUserDataById, getUsers, updateUser, updateUserAvatar, getCurrentUser,
} = require('../controllers/users');
const { userIdValidation, updateUserValidation, updateAvatarValidation } = require('../middlewares/validations');

router.get('/me', getCurrentUser);
router.get('/:userId', userIdValidation, getUserDataById);
router.get('/', getUsers);
router.patch('/me', updateUserValidation, updateUser);
router.patch('/me/avatar', updateAvatarValidation, updateUserAvatar);

module.exports = router;
