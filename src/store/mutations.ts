import {
    RECORD_ADDRESS,
    ADD_CART,
    REDUCE_CART,
    INIT_BUYCART,
    CLEAR_CART,
    RECORD_SHOPDETAIL,
    RECORD_USERINFO,
    GET_USERINFO,
    CONFIRM_REMARK,
    CONFIRM_INVOICE,
    CHOOSE_SEARCH_ADDRESS,
    SAVE_GEOHASH,
    CONFIRM_ADDRESS,
    CHOOSE_ADDRESS,
    NEED_VALIDATION,
    SAVE_CART_ID_SIG,
    SAVE_ORDER_PARAM,
    CHANGE_ORDER_PARAM,
    ORDER_SUCCESS,
    SAVE_SHOPID,
    SAVE_ORDER,
    OUT_LOGIN,
    RETSET_NAME,
    SAVE_AVANDER,
    SAVE_ADDRESS,
    SAVE_ADDDETAIL,
    SAVE_QUESTION,
    ADD_ADDRESS,
    BUY_CART,
} from './mutation-types.js'

import {setStore, getStore} from '../config/mUtils'
import {state} from './index'
// import {localapi, proapi} from 'src/config/env'
type stateType = typeof state
export default {
    // 记录当前经度纬度
    [RECORD_ADDRESS](state:stateType, {
        latitude,
        longitude
    }:any) {
        state.latitude = latitude;
        state.longitude = longitude;
    },

    [RECORD_SHOPDETAIL](state:stateType, detail:any) {
        state.shopDetail = detail;
    },
    // 加入购物车
    [ADD_CART](state:stateType, {
        shopid,
        category_id,
        item_id,
        food_id,
        name,
        price,
        specs,
        packing_fee,
        sku_id,
        stock
    }:any) {
        let cart = state.cartList;
        // @ts-ignore
        let shop = cart[shopid] = (cart[shopid] || {});
        let category = shop[category_id] = (shop[category_id] || {});
        let item = category[item_id] = (category[item_id] || {});
        if (item[food_id]) {
            item[food_id]['num']++;
        } else {
            item[food_id] = {
                "num" : 1,
                "id" : food_id,
                "name" : name,
                "price" : price,
                "specs" : specs,
                "packing_fee" : packing_fee,
                "sku_id" : sku_id,
                "stock" : stock
            };
        }
        state.cartList = {...cart};
        //存入localStorage
        // @ts-ignore
        setStore('buyCart', state.cartList);
    },
    // 移出购物车
    [REDUCE_CART](state:stateType, {
        shopid,
        category_id,
        item_id,
        food_id,
        name,
        price,
        specs,
    }:any) {
        let cart = state.cartList;
        // @ts-ignore
        let shop = (cart[shopid] || {});
        let category = (shop[category_id] || {});
        let item = (category[item_id] || {});
        if (item && item[food_id]) {
            if (item[food_id]['num'] > 0) {
                item[food_id]['num']--;
                state.cartList = {...cart};
                //存入localStorage
                // @ts-ignore
                setStore('buyCart', state.cartList);
            } else {
                //商品数量为0，则清空当前商品的信息
                item[food_id] = null;
            }
        }
    },
    //网页初始化时从本地缓存获取购物车数据
    [INIT_BUYCART](state: { cartList: any }) {
        let initCart = getStore('buyCart');
        if (initCart) {
            state.cartList = JSON.parse(initCart);
        }
    },
    //清空当前商品的购物车信息
    [CLEAR_CART](state: { cartList: string }, shopid: string | number) {
        // @ts-ignore
        state.cartList[shopid] = null;
        // @ts-ignore
        state.cartList = {...state.cartList};
        setStore('buyCart', state.cartList);
    },
    // 记录用户信息
    [RECORD_USERINFO](state: { userInfo: any; login: boolean }, info: { user_id: string }) {
        state.userInfo = info;
        state.login = true;
        setStore('user_id', info.user_id);
    },
    //获取用户信息存入vuex
    [GET_USERINFO](state: { userInfo: { username: any } | null; login: any }, info: { username: any; message: any }) {
        if (state.userInfo && (state.userInfo.username !== info.username)) {
            return;
        };
        if (!state.login) {
            return
        }
        if (!info.message) {
            state.userInfo = {...info};
        } else {
            state.userInfo = null;
        }
    },
    //修改用户名
    [RETSET_NAME](state: { userInfo: any }, username: any) {
        state.userInfo = Object.assign({}, state.userInfo,{username})
    },
    //保存商铺id
    [SAVE_SHOPID](state: { shopid: any }, shopid: any) {
        state.shopid = shopid;
    },
    //记录订单页面用户选择的备注, 传递给订单确认页面
    [CONFIRM_REMARK](state: { remarkText: any; inputText: any }, {
        remarkText,
        inputText
    }: any) {
        state.remarkText = remarkText;
        state.inputText = inputText;
    },
    //是否开发票
    [CONFIRM_INVOICE](state: { invoice: any }, invoice: any) {
        state.invoice = invoice;
    },
    //选择搜索的地址
    [CHOOSE_SEARCH_ADDRESS](state: { searchAddress: any }, place: any) {
        state.searchAddress = place;
    },
    //保存geohash
    [SAVE_GEOHASH](state: { geohash: any }, geohash: any) {
        state.geohash = geohash;

    },
    //确认订单页添加新的的地址
    [CONFIRM_ADDRESS](state: { newAddress: any[] }, newAddress: any) {
        state.newAddress.push(newAddress);
    },
    //选择的地址
    [CHOOSE_ADDRESS](state: { choosedAddress: any; addressIndex: any }, {
        address,
        index
    }: any) {
        state.choosedAddress = address;
        state.addressIndex = index;
    },
    //保存下单需要验证的返回值
    [NEED_VALIDATION](state: { needValidation: any }, needValidation: any) {
        state.needValidation = needValidation;
    },
    //保存下单后购物id 和 sig
    [SAVE_CART_ID_SIG](state: { cart_id: any; sig: any }, {
        cart_id,
        sig
    }: any) {
        state.cart_id = cart_id;
        state.sig = sig;
    },
    //保存下单参数，用户验证页面调用
    [SAVE_ORDER_PARAM](state: { orderParam: any }, orderParam: any) {
        state.orderParam = orderParam;
    },
    //修改下单参数
    [CHANGE_ORDER_PARAM](state: { orderParam: any }, newParam: any) {
        state.orderParam = Object.assign({}, state.orderParam, newParam);
    },
    //下单成功，保存订单返回信息
    [ORDER_SUCCESS](state: { cartPrice: null; orderMessage: any }, order: any) {
        state.cartPrice = null;
        state.orderMessage = order;
    },
    //进入订单详情页前保存该订单信息
    [SAVE_ORDER](state: { orderDetail: any }, orderDetail: any) {
        state.orderDetail = orderDetail;
    },
    //退出登录
    [OUT_LOGIN](state: { userInfo: {}; login: boolean }) {
        state.userInfo = {};
        state.login = false;
    },
    //保存图片
    [SAVE_AVANDER](state: { imgPath: any }, imgPath: any) {
        state.imgPath = imgPath;
    },
    //删除地址列表
    [SAVE_ADDRESS](state: { removeAddress: any }, newAdress: any) {
        state.removeAddress = newAdress
    },
    //添加地址name
    [SAVE_ADDDETAIL](state: { addAddress: any }, addAddress: any){
        state.addAddress=addAddress;
    },
    //保存所选问题标题和详情
    [SAVE_QUESTION](state: { question: any }, question: any) {
        state.question = {...question};
    },
    //增加地址
    [ADD_ADDRESS](state: { removeAddress: any[] }, obj: any) {
        state.removeAddress = [obj, ...state.removeAddress];
    },
    //会员卡价格纪录
    [BUY_CART](state: { cartPrice: any }, price: any) {
        state.cartPrice = price;
    },

}