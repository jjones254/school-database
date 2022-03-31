'use strict';

const express = require('express');
const { asyncHandler } = require('./middleware/async-handler');
const { User } = require('./models');
const { Course } = require('./models');
const { authenticateUser } = require('./middleware/auth-user');


const router = express.Router();

// user routes
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
  const user = req.currentUser
  res.json({
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddress,
  });
  res.status(200);
}));

router.post('/users', asyncHandler(async (req, res) => {
  try {
    await User.create(req.body);
    res.location('/');
    res.status(201).end();
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });   
    } else {
      throw error;
    }
  }
}));

// course routes
router.get('/courses', asyncHandler(async (req, res) => {
  const courses = await Course.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    },
    include: {
      model: User,
      attributes:['firstName', 'lastName', 'emailAddress']
    }
  });
  await res.status(200).json(courses);
}));

router.get('/courses/:id', asyncHandler(async (req, res) => {
  const course = await Course.findByPk(
    req.params.id, 
    { 
      attributes: {
        exclude: ['createdAt', 'updatedAt'] 
      },
      include: {
        model: User,
        attributes:['firstName', 'lastName', 'emailAddress']
      } 
    }
  );
  res.status(200).json(course);
}));

router.post('/courses', authenticateUser, asyncHandler(async (req, res) => {
  let course
  try {
    course = await Course.create(req.body);
    res.location(`/courses/${course.id}`);
    res.status(201).end();
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    }
  }
}));

router.put('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
  const user = req.currentUser;
  let course;
  try {
    course = await Course.findByPk(req.params.id);
    if (course) {
      if (user.id == course.userId) {
        await course.update(req.body);
        res.status(204).end();
      } else {
        res.status(403).json({ msg: "You don't own this course!" });
      }
    } else {
      res.status(400).json({ msg: "Course not found!"});
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    }
  }
}));

router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
  const user = req.currentUser;
  let course;
  try {
    course = await Course.findByPk(req.params.id);
    if (course) {
      if (user.id == course.userId) {
        await course.destroy(req.body);
        res.status(204).end();
      } else {
        res.status(403).json({ msg: "You don't own this course!" });
      }
    } else {
      res.status(400).json({ msg: "Course not found!"});
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    }
  }
}));

module.exports = router;