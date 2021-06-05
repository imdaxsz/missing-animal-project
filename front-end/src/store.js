// recoil store
import {atom} from 'recoil'

const initUserState = {
    email:"loading...",
    image:"https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png",
    name:"loading...",
    uid:""
}

const userState = atom({key:"userState",default:initUserState})
const loginState = atom({key:"isLogin",default:"logout"})

const state = {
    userState,
    loginState,
};

export default state;
