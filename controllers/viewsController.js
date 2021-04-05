const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// getOverview
exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Build template
  // 3) Render that template using tour data from 1)
  res.status(200).render('overview', {
    title: 'Agen Perjalanan',
    page_name: 'overview',
    tours
  });
});

// Get all tours & display at tours page
exports.getAllTours = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  res.status(200).render('tours', {
    title: 'Agen Perjalanan',
    page_name: 'tours',
    tours
  });
});

// Get Single Tour
exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    page_name: 'tour',
    fields: 'review rating user'
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }
  
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour
  });
});

// Get Destinations
exports.getDestinations = catchAsync(async (req, res, next) => {
  const destinations = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    page_name: 'destination',
    fields: 'review rating user'
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }
  
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour
  });
});


// Login Form
exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
    page_name: 'login'
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser
  });
});
