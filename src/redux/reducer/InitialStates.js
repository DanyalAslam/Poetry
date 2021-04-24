const UserReducer = {
    profile: null,
    token: null
};

const LoadingReducer = {
    loading: false,
};

const PoemReducer = {
    allPoems: [],
    myPoems: [],
    likedPoems: [],
    notifications: []
};

const initialStates = {
    UserReducer: UserReducer,
    LoadingReducer: LoadingReducer,
    PoemReducer: PoemReducer
};

export default initialStates;