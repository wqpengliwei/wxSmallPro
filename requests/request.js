var api = require('./api.js');
var utils = require('../utils/util.js');

/**
 * 网路请求
 */
function request(url, data, successCb, errorCb, completeCb) {
  console.log("------request-start-url=" + url);
    wx.request({
        url: url,
        method: 'GET',
        data: data,
        header: { 'content-type': 'application/xml' }, 
        success: function(res) {
          console.log("------request-SUCC-res=" + res.statusCode);
            if (res.statusCode == 200) {
                utils.isFunction(successCb) && successCb(res.data);
            }else
          console.log('请求异常', res);
        },
        error: function() {
            utils.isFunction(errorCb) && errorCb();
        },
        complete: function() {
            utils.isFunction(completeCb) && completeCb();
        }
    });
}

/**
 * 搜索图书
 */
function requestSearchBook(data, successCb, errorCb, completeCb) {
  console.log("------requestSearchBook-start");
    request(api.API_BOOK_SEARCH, data, successCb, errorCb, completeCb);
}

/**
 * 获取图书详细信息
 */
function requestBookDokDetail(id, data, successCb, errorCb, completeCb) {
    request(api.API_BOOK_DETAIL.replace(':id', id), data, successCb, errorCb, completeCb);
}

/**
 * 关键字是否是tag
 */
function requestHasTag(tag, successCb, errorCb, completeCb) {
    request(api.API_BOOK_SEARCH, {tag: tag, count: 1}, successCb, errorCb, completeCb);
}

module.exports = {
  requestSearchBook: requestSearchBook,
  requestBookDokDetail: requestBookDokDetail,
  request: request  
}

