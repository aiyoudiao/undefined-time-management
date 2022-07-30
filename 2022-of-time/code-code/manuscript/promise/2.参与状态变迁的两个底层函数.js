/*
 * File: 2.参与状态变迁的两个底层函数.js                                                    *
 * Project: promise                                                            *
 * Created Date: 2022-07-31 01:19:20                                           *
 * Author: aiyoudiao                                                           *
 * -----                                                                       *
 * Last Modified:  2022-07-31 01:19:20                                         *
 * Modified By: aiyoudiao                                                      *
 * -----                                                                       *
 * Copyright (c) 2022 哎哟迪奥(码二)                                                 *
 * ----------	---	---------------------------------------------------------  *
 */

const PENDING = 0; // 挂起的状态
const FULFILLED = 1; // 执行成功的状态
const REJECTED = 2; // 执行失败的状态

// 定义一个Promise函数，以他为构造函数，用来创建promise对象
function Promise () {

    let state = PENDING; // 存储当前promise的状态

    let value = null; // 存储执行成功后的返回值 or 执行失败后的异常信息

    const handlers = []; // 存储promise.then时传入的每一个回调函数(任务)

    // 执行成功后，将状态变更为执行成功的状态，同时将执行结果返回值进行保存，存到value变量中
    function fulfill (result) {
        state = FULFILLED
        value = result
    }

    // 执行失败后，将状态变更为执行失败的状态，同时将执行结果返回值进行保存，存到value变量中
    function reject (error) {
        state = REJECTED
        value = error
    }
}

