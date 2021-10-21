import * as actionTypes from './auth.type';

const initialState = {
    user: null,
};

const reducer = (
    state = initialState,
    {
        type,
        payload,
        user,
        info,
        loginReseller,
        ...params
    }
) => {
    switch (type) {
        case actionTypes.SAVE_USER:
            return { ...state, user: payload }
        default:
            return state;
    }
}

export default reducer;