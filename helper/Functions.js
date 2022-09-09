const users = require("../db/users.json");
const { readFile, writeFile } = require("fs/promises");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function getUser(token) {
    console.log(token)
  const tokenSpilleted = token.split(" ")[1];
  const loggedInUsers = jwt.verify(tokenSpilleted, process.env.SECRETKEY);
  return loggedInUsers
    ? { name: loggedInUsers.name, id: loggedInUsers.id }
    : {}; //return picture here
}

function getUserById(id) {
  const loggedInUsers = users.filter((value) => "id" in value);
  const index = loggedInUsers.findIndex((value) => value.id === id);
  return index !== -1
    ? {
        name: users[index].name,
        id: users[index].id,
        picture: users[index].picture,
      }
    : {};
}
async function readFileG(path) {
  try {
    const file = await readFile(path, "utf8");
    if (file) return file;
  } catch (e) {
    return [];
  }
}

async function writeItemOnFile(path, item) {
  try {
    const file = await readFile(path, "utf8");

    if (file) {
      const array = [...JSON.parse(file)];
      array.push(item);
      await writeFile(path, JSON.stringify(array));
    }
  } catch (e) {
    throw e;
  }
}
async function updateFile(path, data) {
  try {
    const file = await readFile(path, "utf8");

    if (file) {
      await writeFile(path, JSON.stringify(data));
    }
  } catch (e) {
    throw e;
  }
}

module.exports = {
  getUser,
  getUserById,
  readFileG,
  writeItemOnFile,
  updateFile,
};
