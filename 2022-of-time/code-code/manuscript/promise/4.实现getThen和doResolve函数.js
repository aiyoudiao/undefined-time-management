/*
 * File: 4.实现getThen和doResolve函数.js                                            *
 * Project: promise                                                            *
 * Created Date: 2022-07-31 01:38:55                                           *
 * Author: aiyoudiao                                                           *
 * -----                                                                       *
 * Last Modified:  2022-07-31 01:38:55                                         *
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
            let then = getThen(result) // 拿到任务返回值中新的promise对象的then(新任务)，这是因为之前的.then(()=>XX)中的函数执行时，可能会返回一个新promise对象
            // 如果有拿到新任务
            if (then) {
                // 执行新的任务函数，并把任务对象绑定到这个函数上，与此同时将resolve 和 reject 作为参数传递给这个新任务函数
                doResolve(then.bind(result), resolve, reject)
                return // 结束
            }

            // 如果没有新的任务或者只是返回一个普通的函数，那就让当前的任务直接成功即可。
            fulfill(result)
        } catch (error) {
           // 执行过程中报错了，那就直接失败
           reject(error) 
        }
    }

    // 拿到新的promise对象中的then
    function getThen (value) {
        const t = typeof value
        if (value && ['object', 'function'].includes(t)) {
            // 如果value 是一个promise对象，那就返回这个promise对象的then
            const then = value.then
            if ('function' === typeof then) {
                return then
            }
            // 如果value是一个普通的函数，走下面的null逻辑，因为普通函数不用对状态进行干预了。
        }
        // value 为空，就返回null
        return null;
    }

    // 执行任务函数promise的then函数
    function doResolve (fn, onFulfilled, onRejected) {
        let done = false // 默认状态为暂未执行成功，也是加个锁
        try {
            // 调用任务函数
            fn(
                // 第一个回调
                function (value) {
                    if(done) return; // 异步任务执行完毕，就没必要往下走了。因为任务函数中的两个函数有一个已经执行完了
                    done = true;
                    onFulfilled(value)
                }, 
                // 第二个回调
                function (reason) {
                    if (done) return; // 异步任务执行完毕，就没必要往下走了。因为任务函数中的两个函数有一个已经执行完了
                    done = true;
                    onRejected(reason)
                }
            )
        } catch (error) {
            if(done) return
            done = true
            onRejected(error)
        }
    }
}


