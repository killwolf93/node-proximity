const PROVIDERS = require('../../config/providers');

const Validator = {
  validateUploadRequest: (req, res, next) => {
    let errors = []
    Validator.validateServiceProvider(req, errors);
    Validator.validateFile(req, errors);

    if (errors.length === 0) {
      next()
    } else {
      res.status(400).send({success: false, errors})
    }

  },
  validateServiceProvider: (req, errors) => {
    const providerNameType = RegExp('^[A-Za-z]+$', 'i');
    if (req.body && req.body.provider) {
      if (providerNameType.test(req.body.provider)) {
        const providerMap = PROVIDERS[req.body.provider];
        if (providerMap) {
          req.body.providerMap = providerMap;
        } else {
          errors.push('Provider config columns not found');
        }
      } else {
        errors.push('Bad format on provider');
      }
    } else {
      errors.push('Parameter provider missing');
    }
  },
  validateFile: (req, errors) => {
    if (req.files && req.files.file) {
      if (req.files.file.mimetype !== 'text/csv') {
        errors.push('Invalid file format');
      }
    } else {
      errors.push('Parameter file missing');
    }

  }

}

module.exports = Validator;