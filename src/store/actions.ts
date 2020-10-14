// @ts-ignore
import {getUser,getAddressList} from "../service/getData"
// @ts-ignore
import {GET_USERINFO, SAVE_ADDRESS}from './mutation-types.js'

export default {

    async getUserInfo({
                          commit,
                          state
                      }:any) {
        let res = await getUser();
        commit(GET_USERINFO, res)
    },
    async saveAddress({
                          commit,
                          state
                      }:any) {

        if(state.removeAddress.length > 0) return;

        let addres = await getAddressList(state.userInfo.user_id);
        commit(SAVE_ADDRESS, addres);
    },
}