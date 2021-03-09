# Threejs 时钟对象

### Clock
+ 如果你对 JavaScript 有一定了解，那么 JavaScript 的时间对象 Date 你一定不陌生，Clock 本质上就是对 Date 进行封装，提供了一些方法和属性
+ 当你通过 Threejs 编写一些和时间相关程序时候，不用在对 Date 进行封装，直接调用 Clock 对象的方法和属性即可

### getDelta()
+ 获得前后两次执行该方法的时间间隔
+ 假设你执行一次`.getDelta ()`方法，再执行一次`.getDelta ()`方法，第二次执行`.getDelta ()`方法时候，可以返回上次调用该方法到本次调用之间的时间间隔，返回间隔时间单位是秒

### 对 Threejs 渲染方式的理解
+ Threejs渲染器的渲染方法`.render()`每执行一次就得到一帧图像，渲染效果也就是图像会显示在 Canvas 画布上
+ 如果一个三维场景是不停变化的，肯定要周期性调用执行`.render()`方法，更新canvas画布显示内容，一帧帧图像随着时间变化，这样就展现出来一个动画效果
+ 为了周期性执行渲染器渲染方法`.render()`，一般通过浏览器的API`window.requestAnimationFrame`实现，浏览器会控制渲染频率
+ 一般性能理想的情况下，每秒s渲染60次左右，在实际的项目中，如果需要渲染的场景比较复杂，一般都会低于60，也就是渲染的两帧时间间隔大于16.67ms

```
// 创建一个时钟对象Clock
var clock = new THREE.Clock();
// 创建渲染函数
function render() {
	//执行渲染方法，渲染出来一帧图像
	renderer.render(scene, camera);
	
	//周期性执行渲染函数
	requestAnimationFrame(render);
	
	//clock.getDelta()方法获得两帧的时间间隔，返回时间单位：秒
	var T = clock.getDelta();
	
	console.log('两帧渲染时间间隔',T*1000+'毫秒');
	console.log('查看每秒渲染频率',1/T);
}
render();
```

### 主要属性和方法
+ 属性`.autoStart`，Boolean，默认值是`true`，如果设置为`true`，则在第一次`update` 时开启时钟 Clock
+ 属性`.startTime `，Float，存储时钟 Clock 最后一次调用`.start()`, `.getElapsedTime()`或`.getDelta()`方法的时间
+ 属性`.elapsedTime `，Float，保存时钟 Clock 运行的总时长
+ 属性`.running `，Boolean，判断时钟 Clock 是否在运行
+ 方法`.start()`，启动时钟，同时将`startTime`和`oldTime`设置为当前时间，设置`elapsedTime`为 0，并且设置`running`为`true`
+ 方法`.stop()`，停止时钟，同时将`oldTime`设置为当前时间
+ 方法`.getElapsedTime()`，获取自时钟启动后的秒数，摒弃将`oldTime`设置为当前时间，如果`autoStart`设置为`true`且时钟并未运行，则该方法同时启动时钟
+ 方法`.getDelta()`，获取自`oldTime`设置后到当前的秒数，同时将`oldTime`设置为当前时间，如果`autoStart`设置为`true`且时钟并未运行，则该方法同时启动时钟

### 关于`requestAnimationFrame()`方法
+ `window.requestAnimationFrame(callback)`告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画
+ 该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
+ 当你准备更新动画时你应该调用此方法，这将使浏览器在下一次重绘之前调用你传入给该方法的动画函数(即你的回调函数)
+ 回调函数执行次数通常是每秒60次，但在大多数遵循W3C建议的浏览器中，回调函数执行次数通常与浏览器屏幕刷新次数相匹配
+ 为了提高性能和电池寿命，因此在大多数浏览器里，当`requestAnimationFrame()`运行在后台标签页或者隐藏的`<iframe>`里时，`requestAnimationFrame()`会被暂停调用以提升性能和电池寿命
+ 参数
	> `callback`，下一次重绘之前更新动画帧所调用的函数(即上面所说的回调函数)
	> 该回调函数会被传入`DOMHighResTimeStamp`参数，该参数与`performance.now()`的返回值相同，它表示`requestAnimationFrame()`开始去执行回调函数的时刻  
+ 返回值
	> 一个`long`整数，请求 ID，是回调列表中唯一的标识  
	> 是个非零值，没别的意义，你可以传这个值给`window.cancelAnimationFrame()`以取消回调函数  

### 使用`setInterval()`和`requestAnimationFrame()`方法绘制的优劣
+ 当然使用`setInterval()`方法可以实现动画效果但是，`setInterval()`方法有一定的缺点
	> `setInterval()`方法，不考虑浏览器中发生的事情，如果你正在浏览其他页面，这个函数仍然会每隔几毫秒就会被调用一次，
	> 除此之外，`setInterval()`方法并没有跟显示器的重画同步，着可能会导致较高的CPU使用，降低系统效率。 —《Three.js 开发指南》
+ 使用`requestAnimationFrame()`函数即可解决上述问题，详情看上方`requestAnimationFrame()`函数描述，这个函数的时间间隔是浏览器定义的，我们可以在指定的函数里面实现绘画操作