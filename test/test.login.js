let { expect } = require('chai')
let config = require('../config/setting.json')
let { users, sequelize } = require('models')
const app = require('../app')
const BcryptHelper = require('libs/BcryptHelper');
const request = require('supertest')

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
  it("Đăng nhập thành công khi đúng tài khoản, mật khẩu", async () => {
    let body = {
      email: "student@coursesmanagement.student",
      password: "123456"
    };
    await request(app)
      .post('/login')
      .send(body)
      .set('Accept', 'application/json')
      .expect(200)
  })
  it("Đăng nhập thất bại khi đúng tài khoản, sai mật khẩu", async () => {
    let body = {
      email: "student@coursesmanagement.student",
      password: "1234546"
    };
    await request(app)
      .post('/login')
      .send(body)
      .set('Accept', 'application/json')
      .expect(400)
  })
  it("Đăng nhập thất bại khi sai tài khoản", async () => {
    let body = {
      email: "student@gmail.student",
      password: "123456"
    };
    await request(app)
      .post('/login')
      .send(body)
      .set('Accept', 'application/json')
      .expect(400)
  })

  after( async () => {
    await users.destroy({
      where: {
        email: "student@coursesmanagement.student",
      }
    })
    sequelize.close();
  })
})