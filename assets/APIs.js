const { UserType, AdminType, APIName } = require("./Constant");

const APIs = [
  ///topics
  {
    name: `${APIName.TOPICS}/`,
    pattern: "^\\/api/topics((\\/$)|$)",
    authenticationType: [],
  },
  {
    name: `${APIName.TOPICS}${APIName.DETAILTOPICS}`,
    pattern: "^\\/api\\/topics\\/.*[^\\/0-9a-zA-Z]((\\/$)|$)$",
    authenticationType: [],
  },
  {
    name: `${APIName.TOPICS}${APIName.CHANGETOPICSTATUS}`,
    pattern: "/api/topics/.*/admin/change-status$",
    authenticationType: [AdminType],
  },
  {
    name: `${APIName.TOPICS}${APIName.CREATETOPIC}`,
    pattern: "\\/api/topics/create((\\/$)|$)$",
    authenticationType: [UserType, AdminType],
  },
  {
    name: `${APIName.TOPICS}${APIName.COMMENTTOPICS}`,
    pattern: "/api/topics/.*/comment((\\/$)|$)$",
    authenticationType: [AdminType, UserType],
  },
  {
    name: `${APIName.TOPICS}${APIName.SUBSCRIBETOPIC}`,
    pattern: "/api/topics/.*/subscribe((\\/$)|$)$",
    authenticationType: [AdminType, UserType],
  },
  {
    name: `${APIName.TOPICS}${APIName.VOTETOPIC}`,
    pattern: "/api/topics/.*/vote((\\/$)|$)$",
    authenticationType: [AdminType, UserType],
  },
  ///auth
  {
    name: `${APIName.AUTHMAIN}${APIName.LOGIN}`,
    pattern: "^\\/api/auth/login((\\/$)|$)",
    authenticationType: [],
  },
  {
    name: `${APIName.AUTHMAIN}${APIName.SIGNUP}`,
    pattern: "^\\/api/auth/signup((\\/$)|$)",
    authenticationType: [],
  },
  {
    name: `${APIName.AUTHMAIN}${APIName.REFRESHTOKEN}`,
    pattern: "^\\/api/auth/refreshToken((\\/$)|$)",
    authenticationType: [],
  },
  {
    name: `${APIName.PROJECT}${APIName.ALLPROJECT}`,
    pattern: "^\\/api/project/allProjects((\\/$)|$)",
    authenticationType: [],
  },
  {
    name: `${APIName.PROJECT}${APIName.CREATEPROJECT}`,
    pattern: "^\\/api/project/project((\\/$)|$)",
    authenticationType: [UserType, AdminType],
  },

  //users
  {
    name: `${APIName.USER}${APIName.PROFILE}`,
    pattern: "^\\/api/user/profile((\\/$)|$)",
    authenticationType: [UserType, AdminType],
  },
  {
    name: `${APIName.USER}${APIName.ACTIVITIES}`,
    pattern: "^\\/api/user/activities((\\/$)|$)",
    authenticationType: [UserType, AdminType],
  },
  {
    name: `${APIName.USER}${APIName.SUBSCRIBED}`,
    pattern: "^\\/api/user/subscribe((\\/$)|$)",
    authenticationType: [UserType, AdminType],
  },
  //news
  {
    name: `${APIName.NEWS}${APIName.PUBLISHEDTOPICS}`,
    pattern: "^\\/api/news/publishedTopic((\\/$)|$)$",
    authenticationType: [],
  },
];

module.exports = APIs;
