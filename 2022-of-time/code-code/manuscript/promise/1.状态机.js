/*
 * Filename: e:\mycode\undefined-time-management\2022-of-time\code-code\manuscript\promise\1.状态机
 * Path: e:\mycode\undefined-time-management\2022-of-time\code-code\manuscript\promise
 * Created Date: Sunday, July 31st 2022, 1:12:52 am
 * Author: aiyoudiao
 * 
 * Copyright (c) 2022 aiyoudiao
 */

const PENDING = 0; // 挂起的状态
const FULFILLED = 1; // 执行成功的状态
const REJECTED = 2; // 执行失败的状态

// 定义一个Promise函数，以他为构造函数，用来创建promise对象
function Promise () {

    let state = PENDING; // 存储当前promise的状态

    let value = null; // 存储执行成功后的返回值 or 执行失败后的异常信息

    const handlers = []; // 存储promise.then时传入的每一个回调函数(任务)
}