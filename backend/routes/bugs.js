const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { getBugs, getBug, createBug, updateBug, deleteBug, assignBug } = require('../controllers/bugController');
const { auth, authorize } = require('../middleware/auth');

router.get('/', auth, getBugs);

router.get('/:id', auth, getBug);

router.post('/', [
  auth,
  authorize('admin', 'tester', 'developer'),
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('priority').optional().isIn(['low', 'medium', 'high', 'critical']).withMessage('Invalid priority'),
  body('status').optional().isIn(['open', 'in_progress', 'fixed', 'closed']).withMessage('Invalid status')
], createBug);

router.put('/:id', [
  auth,
  authorize('admin', 'developer'),
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
  body('priority').optional().isIn(['low', 'medium', 'high', 'critical']).withMessage('Invalid priority'),
  body('status').optional().isIn(['open', 'in_progress', 'fixed', 'closed']).withMessage('Invalid status'),
  body('assignedTo').optional().isMongoId().withMessage('Invalid assigned user ID')
], updateBug);

router.put('/:id/assign', [
  auth,
  authorize('admin'),
  body('assignedTo').isMongoId().withMessage('Invalid assigned user ID')
], assignBug);

router.delete('/:id', auth, authorize('admin'), deleteBug);

module.exports = router;
