const usersService = require('./users-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

/**
 * Handle create user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function createUser(request, response, next) {
    try {
      const name = request.body.name;
      const email = request.body.email;
      const password = request.body.password;
      const password_confirm = request.body.password_confirm;
  
      // Check confirmation password
      if (password !== password_confirm) {
        throw errorResponder(
          errorTypes.INVALID_PASSWORD,
          'Password confirmation mismatched'
        );
      }
  
      // Email must be unique
      const emailIsRegistered = await usersService.emailIsRegistered(email);
      if (emailIsRegistered) {
        throw errorResponder(
          errorTypes.EMAIL_ALREADY_TAKEN,
          'Email is already registered'
        );
      }
  
      const success = await usersService.createUser(name, email, password);
      if (!success) {
        throw errorResponder(
          errorTypes.UNPROCESSABLE_ENTITY,
          'Failed to create user'
        );
      }
  
      return response.status(200).json({ name, email });
    } catch (error) {
      return next(error);
    }
  }

  module.exports = {
    createUser,
  };
  