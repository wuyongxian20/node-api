let util={
    /**
     * 接口执行成功统一回复格式
     * @param {*} result 返回结果 
     * @param {*} code 返回代码
     * @param {*} msg 返回消息
     */
    res(result,code=0,msg='查询成功'){
        return {
            code:code,
            msg:msg,
            result:result
        }
    },
    /**
     * 接口执行失败统一回复格式
     * @param {*} result 
     * @param {*} code 
     * @param {*} msg 
     */
    err(result,code=-1,msg='查询失败'){
        return {
            code:code,
            msg:msg,
            result:result
        }
    },
    /**
     * 生成guid
     */
    guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0
            const v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    randomNum(){
        return Math.round( Math.random()*100)
    }
}

module.exports=util