let util_http={
    /**
     * 接口执行成功统一回复格式
     * @param {*} result 返回结果 
     * @param {*} code 返回代码
     * @param {*} msg 返回消息
     */
    async getPOSTRes(req){
       return new Promise((resolve,reject)=>{
        let data = '';
        //2.注册data事件接收数据（每当收到一段表单提交的数据，该方法会执行一次）
        req.on('data', function (chunk) {
            // chunk 默认是一个二进制数据，和 data 拼接会自动 toString
            data += chunk;
        });

        // 3.当接收表单提交的数据完毕之后，就可以进一步处理了
        //注册end事件，所有数据接收完成会执行一次该方法
        req.on('end', function () {
            //（1）.对url进行解码（url会对中文进行编码）
            data = decodeURI(data);
            resolve(data)
        });
       })
    }
   
}

module.exports=util_http