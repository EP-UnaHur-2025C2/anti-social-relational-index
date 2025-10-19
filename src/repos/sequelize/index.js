const postRepo = require('./postRepo');
const userRepo = require('./userRepo');
const commentRepo = require('./commentRepo');

module.exports = {
  post: postRepo,
  user: userRepo,
  comment: commentRepo
};
