// redux store
import { createStore,combineReducers } from "redux";
let user_state = {user:null,isLogin:"logout"};

function loginReducer(state = user_state, action){
    let _state = {...state}
    if (action.type === "setUserLogin"){
        console.log("setUserLogin 호출됨")
        _state['user']=action.payload;
        _state['isLogin']="login"
    }
    else if(action.type === "setUserLogout"){
        console.log("setUserLogout 호출됨")
        _state['user']={};
        _state['isLogin']="logout"
    }
    return _state
}

export default createStore(loginReducer)