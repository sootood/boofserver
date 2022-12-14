
const  UserType = 'isUser'
const  AdminType = 'isAdmin'

const APIName ={

    MAIN:'/',

    //topics
    TOPICS:'/api/topics',
    CREATETOPIC:'/create',
    DETAILTOPICS:'/:topicID',
    COMMENTTOPICS:'/:topicID/comment',
    CHANGETOPICSTATUS:'/:topicID/admin/change-status',
    VOTETOPIC:'/:topicID/vote',
    SUBSCRIBETOPIC:'/:topicID/subscribe',

    //auth
    AUTHMAIN:'/api/auth',
    LOGIN:'/login',
    SIGNUP:'/signup',
    REFRESHTOKEN:'/refreshToken',

    //project
    PROJECT:'/api/project',
    ALLPROJECT:'/allProjects',
    CREATEPROJECT:'/project',

    //user
    USER:'/api/user',
    PROFILE:'/profile/',
    ACTIVITIES:'/activities',
    SUBSCRIBED:'/subscribe',

    NEWS:'/api/news',
    PUBLISHEDTOPICS:'/publishedTopic'    


}

module.exports ={
    UserType,AdminType, APIName
}
