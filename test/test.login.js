let {expect} = require('chai')
let request = require('request')
let config = require('../config/setting.json')

describe('Test đăng nhập', () => {
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
})