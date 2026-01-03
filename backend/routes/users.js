const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { auth, authorize } = require('../middleware/auth');

router.get('/', auth, authorize('admin'), getUsers);

router.post('/', [
  auth,
  authorize('admin'),
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['admin', 'developer', 'tester']).withMessage('Invalid role')
], createUser);

router.put('/:id', [
  auth,
  authorize('admin'),
  body('username').optional().trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').optional().isEmail().withMessage('Please include a valid email'),
  body('role').optional().isIn(['admin', 'developer', 'tester']).withMessage('Invalid role')
], updateUser);

router.delete('/:id', auth, authorize('admin'), deleteUser);

module.exports = router;
