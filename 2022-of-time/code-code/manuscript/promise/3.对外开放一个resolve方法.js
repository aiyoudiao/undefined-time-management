/*
 * File: 3.对外开放一个resolve方法.js                                                  *
 * Project: promise                                                            *
 * Created Date: 2022-07-31 01:23:20                                           *
 * Author: aiyoudiao                                                           *
 * -----                                                                       *
 * Last Modified:  2022-07-31 01:23:20                                         *
 * Modified By: aiyoudiao                                                      *
 * -----                                                                       *
 * Copyright (c) 2022 哎哟迪奥(码二)                                                 *
 * ----------	---	---------------------------------------------------------  *
 */


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

    // 如果当前任务成功执行了，那么使用者就会去调用resolve(返回值)
    function resolve(result) {
        try {
            let then = getThen(result) // 拿到任务返回值中的新任务(回调函数) 或者 新的promise对象，这是因为.then(()=>XX)中的函数执行时，可能会返回一个新函数或者promise对象
            // 如果有拿到新任务或者新任务对象
            if (then) {
                // 执行新的任务函数，并把任务对象绑定到这个函数上，与此同时将resolve 和 reject 作为参数传递给这个新任务函数
                doResolve(then.bind(result), resolve, reject)
                return // 结束
            }

            // 如果没有新的任务，那就直接成功
            fulfill(result)
        } catch (error) {
           // 执行过程中报错了，那就直接失败
           reject(error) 
        }
    }
}

