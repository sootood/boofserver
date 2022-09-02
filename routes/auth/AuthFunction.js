let users = require("../../db/users.json");
const { v4: uuidv4 } = require("uuid");
const { updateFile } = require("../../helper/Functions");
const path = require("path");
const Strings = require("../../assets/Strings");
const Response = require("../../response/ResponseDataModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const _checkUserPass = async (mobile, password) => {
  const user = users.filter((value) => value.mobile === mobile);
  let newUsers = [...users];
  let loggedInUser = {};
  if (user[0].password === password) {
    loggedInUser[0] = { ...user[0], isUser: true };

    const token = jwt.sign(loggedInUser[0], process.env.SECRETKEY, {
      expiresIn: "2m",
    });
    const refreshToken = jwt.sign(
      loggedInUser[0],
      process.env.SECREFREFRESHKEY,
      { expiresIn: "24h" }
    );

    newUsers = users.map((value) => {
      if (value.mobile === this.mobile) return loggedInUser[0];
      else return value;
    });
    users = [...newUsers];
    const role = user[0].isAdmin ? { isAdmin: true } : { isUser: true };
    await updateFile(`${path.resolve().replace(`\``, "/")}/db/users.json`, [
      ...newUsers,
    ]);

    return new Response(200, Strings.Success, {
      mobile: loggedInUser[0].mobile,
      token: token,
      refreshToken,
      ...role,
    }).getResponse();
  } else {
    return false;
  }
};

class AuthFunction {
  constructor() {}

  setMobile(mobile) {
    this.mobile = mobile;
  }

  setPassword(password) {
    this.password = password;
  }
  setToken(token) {
    this.token = token;
  }

  canExecuteFuction() {
    return !!(this.mobile && this.password);
  }

  canRefreshToken() {
    return !!this.token;
  }

  async executeFunction() {
    if (this.canExecuteFuction()) {
      const user = users.filter((value) => value.mobile === this.mobile);
      if (user.length > 0) {
        const checkPass = await _checkUserPass(this.mobile, this.password);
        if (checkPass !== false) {
          return {
            code: 200,
            response: checkPass,
          };
        } else {
          return {
            code: 401,
            response: new Response(401, Strings.wrongPass).getResponse(),
          };
        }
      } else {
        return {
          code: 404,
          response: new Response(404, Strings.userNotExist).getResponse(),
        };
      }
    } else {
      return { code: 400, response: new Response(400).getResponse() };
    }
  }

  executeSignupFunction() {
    if (this.canExecuteFuction()) {
      const user = users.filter((value) => value.mobile === this.mobile);
      const biggetsId = Math.max(...users.map((o) => o.id));
      if (user.length === 0) {
        users = [
          ...users,
          {
            mobile: this.mobile,
            password: this.password,
            isUser: true,
            id: biggetsId + 1,
            name: "",
          },
        ];
        return {
          code: 201,
          response: new Response(201, Strings.userCreated).getResponse(),
        };
      } else {
        return {
          code: 400,
          response: new Response(400, Strings.userduplicated).getResponse(),
        };
      }
    } else {
      return { code: 400, response: new Response(400).getResponse() };
    }
  }

  executeRefreshToken() {
    if (this.canRefreshToken()) {
      try {
     
        const token = this.token.split(" ")[1]
        const userInfo = jwt.verify(token, process.env.SECREFREFRESHKEY);
        const newToken = jwt.sign(userInfo, process.env.SECRETKEY);
      
        return {
          code: 200,
          response:new Response(200, Strings.Success, {
            token: newToken
          }).getResponse()
        }
      } catch {
        return res
          .status(401)
          .send(
            new Response(401, "your refresh token expired please login again")
          );
      }
    }else{
      return { code: 400, response: new Response(400).getResponse() };

    }
  }
}

module.exports = AuthFunction;
