const InboxRepository = require('./../repositories/inbox');
const { errorCodes, httpStatus } = require('./../../configs/codes');

const InboxController = {
  create: async (req, res) => {
    req.checkBody({
      message: { notEmpty: true, errorMessage: 'message field is required' }
    });

    const errors = req.validationErrors();
    if (errors) {
      return res.status(httpStatus.badRequest).json({
        status: httpStatus.badRequest,
        success: false,
        message: errors,
        code: errorCodes.missingParameter
      });
    }

    try {
      const result = await InboxRepository.createInbox({
        message: req.body.message
      });

      return res.status(httpStatus.ok).json({
        status: httpStatus.ok,
        success: true,
        message: 'Success to create inbox',
        data: result
      });
    } catch (e) {
      return res.status(httpStatus.internalServerError).json({
        status: httpStatus.internalServerError,
        success: false,
        message: 'Failed to create inbox',
        code: errorCodes.internalServerError,
        data: e
      });
    }
  },

  getAll: async (req, res) => {
    try {
      const result = await InboxRepository.getAllInbox();
      return res.status(httpStatus.ok).json({
        status: httpStatus.ok,
        success: true,
        message: 'Success to retrieve inbox',
        data: result
      });
    } catch (e) {
      return res.status(httpStatus.internalServerError).json({
        status: httpStatus.internalServerError,
        success: false,
        message: 'Failed to retrieve inbox',
        code: errorCodes.internalServerError,
        data: e
      });
    }
  }
};

module.exports = InboxController;