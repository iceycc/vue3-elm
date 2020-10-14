import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'


/**
 * 获取首页默认地址
 */

export const cityGuess = () => fetch('/v1/cities', {
    type: 'guess'
});


/**
 * 获取首页热门城市
 */

export const hotCity = () => fetch('/v1/cities', {
    type: 'hot'
});


/**·
 * 获取首页所有城市
 */

export const groupCity = () => fetch('/v1/cities', {
    type: 'group'
});


/**
 * 获取当前所在城市
 */

export const currentCity = (number: string) => fetch('/v1/cities/' + number);


/**
 * 获取搜索地址
 */

export const searchplace = (CityId: any, value: any) => fetch('/v1/pois', {
    type: 'search',
    City_id: CityId,
    keyword: value
});


/**
 * 获取msite页面地址信息
 */

// @ts-ignore
export const msiteAddress = geohash => fetch('/v2/pois/' + geohash);


/**
 * 获取msite页面食品分类列表
 */
// @ts-ignore
export const msiteFoodTypes = geohash => fetch('/v2/index_entry', {
    geohash,
    group_type: '1',
    'flags[]': 'F'
});


/**
 * 获取msite商铺列表
 */

export const shopList = (latitude: any, longitude: any, offset: any, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []) => {
    let supportStr = '';
    support_ids.forEach(item => {
        // @ts-ignore
        if (item.status) {
            // @ts-ignore
            supportStr += '&support_ids[]=' + item.id;
        }
    });
    let data = {
        latitude,
        longitude,
        offset,
        limit: '20',
        'extras[]': 'activities',
        keyword: '',
        restaurant_category_id,
        'restaurant_category_ids[]': restaurant_category_ids,
        order_by,
        'delivery_mode[]': delivery_mode + supportStr
    };
    return fetch('/shopping/restaurants', data);
};


/**
 * 获取search页面搜索结果
 */

// @ts-ignore
export const searchRestaurant = (geohash, keyword) => fetch('/v4/restaurants', {
    'extras[]': 'restaurant_activity',
    geohash,
    keyword,
    type: 'search'
});


/**
 * 获取food页面的 category 种类列表
 */

export const foodCategory = (latitude: any, longitude: any) => fetch('/shopping/v2/restaurant/category', {
    latitude,
    longitude
});


/**
 * 获取food页面的配送方式
 */

export const foodDelivery = (latitude: any, longitude: any) => fetch('/shopping/v1/restaurants/delivery_modes', {
    latitude,
    longitude,
    kw: ''
});


/**
 * 获取food页面的商家属性活动列表
 */

export const foodActivity = (latitude: any, longitude: any) => fetch('/shopping/v1/restaurants/activity_attributes', {
    latitude,
    longitude,
    kw: ''
});


/**
 * 获取shop页面商铺详情
 */

export const shopDetails = (shopId: string, latitude: any, longitude: string) => fetch('/shopping/restaurant/' + shopId, {
    latitude,
    longitude: longitude + '&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics'
});


/**
 * 获取shop页面菜单列表
 */

export const foodMenu = (restaurant_id: any) => fetch('/shopping/v2/menu', {
    restaurant_id
});


/**
 * 获取商铺评价列表
 */

export const getRatingList = (shopId: string, offset: any, tag_name = '') => fetch('/ugc/v2/restaurants/' + shopId + '/ratings', {
    has_content: true,
    offset,
    limit: 10,
    tag_name
});


/**
 * 获取商铺评价分数
 */

export const ratingScores = (shopId: string) => fetch('/ugc/v2/restaurants/' + shopId + '/ratings/scores');


/**
 * 获取商铺评价分类
 */

export const ratingTags = (shopId: string) => fetch('/ugc/v2/restaurants/' + shopId + '/ratings/tags');


/**
 * 获取短信验证码
 */

export const mobileCode = (phone: any) => fetch('/v4/mobile/verify_code/send', {
    mobile: phone,
    scene: 'login',
    type: 'sms'
}, 'POST');


/**
 * 获取图片验证码
 */

export const getcaptchas = () => fetch('/v1/captchas', {}, 'POST');


/**
 * 检测帐号是否存在
 */

export const checkExsis = (checkNumber: any, type: any) => fetch('/v1/users/exists', {
    [type]: checkNumber,
    type
});


/**
 * 发送帐号
 */

export const sendMobile = (sendData: any, captcha_code: any, type: any, password: any) => fetch('/v1/mobile/verify_code/send', {
    action: "send",
    captcha_code,
    [type]: sendData,
    type: "sms",
    way: type,
    password,
}, 'POST');


/**
 * 确认订单
 */
// @ts-ignore
export const checkout = (geohash, entities, shopId) => fetch('/v1/carts/checkout', {
    come_from: "web",
    geohash,
    entities,
    restaurant_id: shopId,
}, 'POST');


/**
 * 获取快速备注列表
 */

export const getRemark = (id: string, sig: any) => fetch('/v1/carts/' + id + '/remarks', {
    sig
});


/**
 * 获取地址列表
 */

export const getAddress = (id: string, sig: any) => fetch('/v1/carts/' + id + '/addresses', {
    sig
});


/**
 * 搜索地址
 */

export const searchNearby = (keyword: any) => fetch('/v1/pois', {
    type: 'nearby',
    keyword
});


/**
 * 添加地址
 */

export const postAddAddress = (userId: string, address: any, address_detail: any, geohash: any, name: any, phone: any, phone_bk: any, poi_type: any, sex: any, tag: any, tag_type: any) => fetch('/v1/users/' + userId + '/addresses', {
    address,
    address_detail,
    geohash,
    name,
    phone,
    phone_bk,
    poi_type,
    sex,
    tag,
    tag_type,
}, 'POST');


/**
 * 下订单
 */

export const placeOrders = (user_id: string, cart_id: string, address_id: any, description: any, entities: any, geohash: any, sig: any) => fetch('/v1/users/' + user_id + '/carts/' + cart_id + '/orders', {
    address_id,
    come_from: "mobile_web",
    deliver_time: "",
    description,
    entities,
    geohash,
    paymethod_id: 1,
    sig,
}, 'POST');


/**
 * 重新发送订单验证码
 */

export const rePostVerify = (cart_id: string, sig: any, type: any) => fetch('/v1/carts/' + cart_id + '/verify_code', {
    sig,
    type,
}, 'POST');


/**
 * 下订单
 */
// @ts-ignore
export const validateOrders = ({
                                   user_id,
                                   cart_id,
                                   address_id,
                                   description,
                                   entities,
                                   geohash,
                                   sig,
                                   validation_code,
                                   validation_token
                               }:any) => fetch('/v1/users/' + user_id + '/carts/' + cart_id + '/orders', {
    address_id,
    come_from: "mobile_web",
    deliver_time: "",
    description,
    entities,
    geohash,
    paymethod_id: 1,
    sig,
    validation_code,
    validation_token,
}, 'POST');


/**
 * 重新发送订单验证码
 */

export const payRequest = (merchantOrderNo: any, userId: any) => fetch('/payapi/payment/queryOrder', {
    merchantId: 5,
    merchantOrderNo,
    source: 'MOBILE_WAP',
    userId,
    version: '1.0.0',
});


/**
 * 获取服务中心信息
 */

export const getService = () => fetch('/v3/profile/explain');


/**
 *兑换会员卡
 */

export const vipCart = (id: string, number: any, password: any) => fetch('/member/v1/users/' + id + '/delivery_card/physical_card/bind', {
    number,
    password
}, 'POST')


/**
 * 获取红包
 */

export const getHongbaoNum = (id: string) => fetch('/promotion/v2/users/' + id + '/hongbaos?limit=20&offset=0');


/**
 * 获取过期红包
 */


export const getExpired = (id: string) => fetch('/promotion/v2/users/' + id + '/expired_hongbaos?limit=20&offset=0');


/**
 * 兑换红包
 */

export const exChangeHongbao = (id: string, exchange_code: any, captcha_code: any) => fetch('/v1/users/' + id + '/hongbao/exchange', {
    exchange_code,
    captcha_code,
}, 'POST');


/**
 * 获取用户信息
 */

export const getUser = () => fetch('/v1/user', {user_id: getStore('user_id')});


/**
 * 手机号登录
 */
// @ts-ignore
var sendLogin = (code: any, mobile: any, validate_token: any) => fetch('/v1/login/app_mobile', {
    code,
    mobile,
    validate_token
}, 'POST');


/**
 * 获取订单列表
 */

export const getOrderList = (user_id: string, offset: any) => fetch('/bos/v2/users/' + user_id + '/orders', {
    limit: 10,
    offset,
});


/**
 * 获取订单详情
 */

export const getOrderDetail = (user_id: string, orderid: string) => fetch('/bos/v1/users/' + user_id + '/orders/' + orderid + '/snapshot');


/**
 *个人中心里编辑地址
 */

export const getAddressList = (user_id: string) => fetch('/v1/users/' + user_id + '/addresses')

/**
 *个人中心里搜索地址
 */

export const getSearchAddress = (keyword: any) => fetch('v1/pois', {
    keyword: keyword,
    type: 'nearby'
})

/**
 * 删除地址
 */

export const deleteAddress = (userid: string, addressid: string) => fetch('/v1/users/' + userid + '/addresses/' + addressid, {}, 'DELETE')


/**
 * 账号密码登录
 */
export const accountLogin = (username: any, password: any, captcha_code: any) => fetch('/v2/login', {
    username,
    password,
    captcha_code
}, 'POST');


/**
 * 退出登录
 */
export const signout = () => fetch('/v2/signout');


/**
 * 改密码
 */
export const changePassword = (username: any, oldpassWord: any, newpassword: any, confirmpassword: any, captcha_code: any) => fetch('/v2/changepassword', {
    username,
    oldpassWord,
    newpassword,
    confirmpassword,
    captcha_code
}, 'POST');
