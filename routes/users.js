const router = require('express').Router();
const {
  getUserDataById, getUsers, createUser, updateUser, updateUserAvatar,
} = require('../controllers/users');

router.get('/:userId', getUserDataById);
router.get('/', getUsers);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
