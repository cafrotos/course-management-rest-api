let { expect } = require('chai')
let request = require('request')
let config = require('../config/setting.json')
let { users } = require('models')
const BcryptHelper = require('libs/BcryptHelper');

describe('Test đăng nhập', () => {
  before(async () => {
    let rawPassword = "123456";
    let hashPassword = BcryptHelper.hashPassword(rawPassword);
    await users.create({
      email: "student@coursesmanagement.student",
      password: hashPassword,
      firstName: "Student",
      avatar: "https://uphinhnhanh.com/images/2018/12/09/10354686_10150004552801856_220367501106153455_n-1.jpg",
      lastName: "Student",
      address: "Earth",
      section: "STUDENT",
    })
  })
  it("Đăng nhập thành công khi đúng tài khoản, mật khẩu", () => {
    let body = {
      email: "student@coursesmanagement.student",
      password: "123456"
    };
    request({
      uri: `${config.rootapitest}/login`,
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
      json: true
    }, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
    })
  })
  it("Đăng nhập thất bại khi đúng tài khoản, sai mật khẩu", () => {
    let body = {
      email: "student@coursesmanagement.student",
      password: "1234546"
    };
    request({
      uri: `${config.rootapitest}/login`,
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
      json: true
    }, (err, res, body) => {
      expect(res.statusCode).to.equal(400);
    })
  })
  it("Đăng nhập thất bại khi sai tài khoản", () => {
    let body = {
      email: "student@gmail.student",
      password: "123456"
    };
    request({
      uri: `${config.rootapitest}/login`,
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
      json: true
    }, (err, res, body) => {
      expect(res.statusCode).to.equal(400);
    })
  })

  after( async () => {
    await users.destroy({
      where: {
        email: "student@coursesmanagement.student",
      }
    })
  })
})