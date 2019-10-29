import { authConst } from '../constant';

const INITIAL_STATE = {
    loginShow: true,
    registerShow: false,
    isLogin: false,
    user: {}
}

let authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case authConst.CREATE_USER_SUCCESSFULLY:
        console.log(action.payload)
            
               return { ...state, isLogin: true, user: action.payload}
                console.log(isLogin)
        
            break;

        case authConst.LOGIN_USER_SUCCESSFULLY:
            return (Object.assign({}), { isLogin: true, user: action.payload})
            break;

        case authConst.REGISTER_SHOW:
            return { ...state, registerShow: false, isLogin: false }
            break;
        default:
        console.log(state, 'state')
            return state;
    }
}

export default authReducer;