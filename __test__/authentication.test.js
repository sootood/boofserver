const LoginFunction = require('../routes/auth/AuthFunction')

describe('testing login', ()=>{

    it('for empty values signup',  ()=> {
      const  authLogin = new LoginFunction('','')
        expect(authLogin.executeSignupFunction()).toMatchObject({"code":400})

    });

    it('for empty values login',  async ()=> {
      const  authLogin = new LoginFunction('','')
      await  expect(authLogin.executeFunction()).resolves.toMatchObject({"code":400})
    });
})
