const LoginFunction = require("./AuthFunction");

const login = async (req, res, next) => {
  try {
    const loginFunction = new LoginFunction()
      .setMobile(req.body.mobile)
      .setPassword(req.body.password);
    const executedResult = await loginFunction.executeFunction();
    return res.status(executedResult.code).send(executedResult.response);
  } catch (e) {
    next(e);
  }
};

const signup = (req, res, next) => {
  try {
    const signupFunction = new LoginFunction()
      .setMobile(req.body.mobile)
      .setPassword(req.body.password);
    const executedResult = signupFunction.executeSignupFunction();
    return res.status(executedResult.code).send(executedResult.response);
  } catch (e) {
    next(e);
  }
};

const refreshToken = (req, res, next) => {
  try {
    const loginFunction = new LoginFunction();
    loginFunction.setToken(req.headers.token);
    const executedResult = loginFunction.executeRefreshToken();
    return res.status(executedResult.code).send(executedResult.response);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  login,
  signup,
  refreshToken,
};
