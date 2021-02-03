const floatFix1 = (rule, value, callback)=>{
    if(value<=0){
        callback(new Error('请输入大于0的数'))
    } else if(value.toString().split('.').length > 1){
        callback(new Error('请输入最多1位小数'))
    } else{
        callback()
    }
}
const phoneRule = (rule, value, callback)=>{
    if(/1\d{10}/.test(value)){
        callback()
    } else {
        callback(new Error('请输入正确的手机号'))
    }
}
const phoneArrayRule = (rule, value, callback)=>{
    let err = null;
    for(let n of value.split(',')){
        if(!/1\d{10}/.test(value)){
            err = new Error('请输入正确的手机号')
        }
    }
    if(err){
        callback(err)
    }else{
        callback()
    }
}
export {
    floatFix1,
    phoneRule,
    phoneArrayRule
}