/**   
 * api接口统一管理
 */
import { get, post } from './http';

/**
 * 登录
 * phone 必选
 * password 必选
 */
export const login = (payload) => post('/login/cellphone',payload);

/**
 * 获取banners
 */
export const getBanner = () => get('/banner');

/**
 * 获取推荐歌单
 */
export const getRecommendPlaylist = (payload) => get('/personalized',payload);

/**
 * 获取推荐MV
 */
export const getRecommendMV = () => get('/personalized/mv');

/**
 * 获取全部MV
 * area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部 
 * type: 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
 * order: 排序,可选值为上升最快,最热,最新,不填则为上升最快
 * limit: 取出数量 , 默认为 30
 * offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
 */
export const getAllMV = (payload) => get('/mv/all',payload);

/**
 * 获取最新MV
 * area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为内地
 * limit: 取出数量 , 默认为 30
 */
export const getLatestMV = (payload) => get('/mv/first',payload);

/**
 * 获取所有榜单
 */
export const getToplist = () => get('/toplist');


/**
 * 获取歌手分类列表
 * @param  
 * limit : 返回数量 , 默认为 30
 * offset : 偏移数量:(页数 -1)*30，默认为0
 * type：  -1:全部  1:男歌手  2:女歌手  3:乐队
 * area： -1:全部 7:华语 96:欧美  8:日本  16:韩国  0:其他
 * initial: 按首字母索引查找参数,如 /artist/list?type=1&area=96&initial=b 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,#传0
 */
export const getArtist = (payload) => get('/artist/list',payload);

/**
 * 获取用户歌单（包括喜欢、收藏、创建）
 * uid 必选
 */
export const getMyPlaylist= (payload) => get('/user/playlist',payload);

/**
 * 获取歌单详情 不缓存结果，加事件戳
 * id 必选
 */
export const getPlaylistDetails = (payload) => get(`/playlist/detail?_time=${new Date()}`,payload); 

/**
 * 获取搜索详情
 * keywords 必选
 * limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
 */
export const search = (payload) => get('/cloudsearch',payload);

/**
 * 收藏音乐 不缓存结果，加事件戳
 * id：歌曲 id 必选
 * like: 布尔值 , 默认为 true  即喜欢 , 若传 false, 则取消喜欢
 */
export const like = (payload) => get(`/like?_time=${new Date()}`,payload);

/**
 * 获取音乐 url
 * id 必选
 */
export const getSongUrl= (payload) => get('/song/url',payload);

/**
 * 获取mv播放地址
 * id  必选
 */
export const getMVUrl= (payload) => get('/mv/url',payload);

/**
 * 获取mv信息
 * mvid  必选
 */
export const getMVInfo = (payload) => get('/mv/detail',payload);

/**
 * 相关视频
 * id 必选
 */
export const getRelatedMV = (payload) => get('/related/allvideo',payload);

/**
 * mv评论
 * id 必选
 * limit: 取出评论数量 , 默认为 20
 * offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 */
export const getMVComment = (payload) => get('/comment/mv',payload);

/**
 * 获取当前音乐歌词
 * id 必选
 */
// export const getMusicLyric= (payload) => get('/lyric',payload);






