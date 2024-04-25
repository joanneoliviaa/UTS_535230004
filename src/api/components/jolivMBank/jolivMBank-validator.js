const joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);

module.exports = {
    createUser: {
      body: {
        name: joi.string().min(1).max(100).required().label('Nama'),
        email: joi.string().email().required().label('Email'),
        password: joiPassword
          .string()
          .minOfSpecialCharacters(1)
          .minOfLowercase(1)
          .minOfUppercase(1)
          .minOfNumeric(1)
          .noWhiteSpaces()
          .onlyLatinCharacters()
          .min(6)
          .max(32)
          .required()
          .label('Password'),
        password_confirm: joi.string().required().label('Password confirmation'),
        telephone_no: joi.number().integer().min(12).max(12).required().label('Nomor Telepon'),
        //access code dibutuhkan untuk mengakses data user.
        access_code: joi.string().regex(/^(?=.*[a-zA-Z])(?=.*\d).+$/).min(6).max(10).required().label("Akses kode wajib string."),
        digiBank_pin: joi.number().integer().min(6).max(6).required().label("Pin Digital Bank untuk akses transaksi."),
      },
    },
}