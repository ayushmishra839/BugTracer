const Bug = require('../models/Bug');
const { validationResult } = require('express-validator');

const getBugs = async (req, res) => {
  try {
    const { status, priority, assignedTo, project } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (assignedTo) filter.assignedTo = assignedTo;
    if (project) filter.project = project;

    const bugs = await Bug.find(filter)
      .populate('reporter', 'username email')
      .populate('assignedTo', 'username email')
      .populate('project', 'name')
      .sort({ createdAt: -1 });

    res.json(bugs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getBug = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id)
      .populate('reporter', 'username email')
      .populate('assignedTo', 'username email')
      .populate('project', 'name');

    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' });
    }

    res.json(bug);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createBug = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, priority, status, project } = req.body;

    const bugData = {
      title,
      description,
      priority: priority || 'medium',
      status: status || 'open',
      reporter: req.user.id
    };

    // Only add project if it's a valid ObjectId
    if (project && project.match(/^[0-9a-fA-F]{24}$/)) {
      bugData.project = project;
    }

    const bug = new Bug(bugData);

    await bug.save();
    await bug.populate('reporter', 'username email');
    
    if (bugData.project) {
      await bug.populate('project', 'name');
    }

    res.status(201).json(bug);
  } catch (error) {
    console.error('Bug creation error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateBug = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, priority, status, assignedTo } = req.body;
    const bugId = req.params.id;

    const bug = await Bug.findByIdAndUpdate(
      bugId,
      { title, description, priority, status, assignedTo },
      { new: true, runValidators: true }
    )
      .populate('reporter', 'username email')
      .populate('assignedTo', 'username email')
      .populate('project', 'name');

    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' });
    }

    res.json(bug);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteBug = async (req, res) => {
  try {
    const bug = await Bug.findByIdAndDelete(req.params.id);
    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' });
    }
    res.json({ message: 'Bug deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const assignBug = async (req, res) => {
  try {
    const { assignedTo } = req.body;
    const bugId = req.params.id;

    const bug = await Bug.findByIdAndUpdate(
      bugId,
      { assignedTo, status: 'in_progress' },
      { new: true }
    )
      .populate('reporter', 'username email')
      .populate('assignedTo', 'username email')
      .populate('project', 'name');

    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' });
    }

    res.json(bug);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getBugs, getBug, createBug, updateBug, deleteBug, assignBug };
