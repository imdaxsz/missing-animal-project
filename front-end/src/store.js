// recoil store
import {atom} from 'recoil'

const initUserState = {
    email:"test@test.com",
    image:"tempURL",
    name:"name",
}

const userState = atom({key:"userState",default:initUserState})
const loginState = atom({key:"isLogin",default:"logout"})

const state = {
    userState,
    loginState,
};

export default state;
