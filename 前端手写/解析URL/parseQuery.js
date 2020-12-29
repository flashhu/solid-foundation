// 参考：https://juejin.cn/post/6844903911686406158#heading-14

function parseQuery(url) {
    // 1. 得到 ？后的字符串
    let queryStr = /.+\?(.+)$/.exec(url)[1];
    // 2. 根据 & 分割
    let queryArr = queryStr.split('&');
    let params = {};
    // 3. 依次处理参数
    queryArr.forEach(item => {
        if(/=/.test(item)) {
            // 3.1 包含 =
            let [key, val] = item.split('=');
            // 处理 URI 编码，进行解码操作
            val = decodeURIComponent(val);
            // 处理数字字符串，转为数字
            val = /^\d+$/.test(val) ? parseFloat(val) : val;
            if (params.hasOwnProperty(key)) {
                // 3.1.1 已有该 key, 数组新增一值
                params[key] = [].concat(params[key], val);
            } else {
                // 3.1.2 直接加入 param
                params[key] = val;
            }
        } else {
            // 3.2 未包含，赋值为 true
            params[item] = true;
        }
    })
    return params;
}

let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&id=789&city=%E5%8C%97%E4%BA%AC&enabled';
console.log(parseQuery(url))