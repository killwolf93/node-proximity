const PROVIDERS = require('../../config/providers');

const Validator = {
  validateUploadRequest: (req, res, next) => {
    let errors = []
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

    if (req.files && req.files.file) {
      if (req.files.file.mimetype !== 'text/csv') {
        errors.push('Invalid file format');
      }
    } else {
      errors.push('Parameter file missing');
    }


    if (errors.length === 0) {
      next()
    } else {
      res.send({success: false, errors})
    }

  }

}

module.exports = Validator;