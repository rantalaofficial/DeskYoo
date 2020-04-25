const ApiNames = {
    //CHANNELS
    GetChannelsDisplayInfo: '',
    ChannelsDisplayInfo: '',

    //THREADS
    GetThreadsDisplayInfo: '',
    ThreadsDisplayInfo: '',

    AddThread: '',
    AddThreadSuccess: '',

    VoteThread: '',
    VoteThreadSuccess: '',

    DeleteThread: '',
    DeleteThreadSuccess: '',

    //ANSWERS
    GetAnswersDisplayInfo: '',
    AnswersDisplayInfo: '',

    AddAnswer: '',
    AddAnswerSuccess: '',

    VoteAnswer: '',
    VoteAnswerSuccess: '',

    DeleteAnswer: '',
    DeleteAnswerSuccess: '',

    //USERS
    UserNotLogged: '',
    UserError: '',

    Login: '',
    LoginSuccess: '',

    Logout: '',

    Register: '',
    RegisterSuccess: '',

    GetUserDisplayInfo: '',
    UserDisplayInfo: '',
}

Object.keys(ApiNames).map((key, index) => {
    ApiNames[key] = index.toString();
});
Object.freeze(ApiNames)

module.exports = ApiNames;