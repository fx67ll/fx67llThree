# Threejs 学习笔记
> 实践出真知，这里只记录一些概念性的内容，查看代码请移步 `three-project -> three-practice -> src -> views -> note`  
> 注意！注意！注意！由于Threejs版本更新过快，很多参考资料和学习笔记都是老版的，会导致有偏差，请自行实践判断  
> 由于Threejs是一个高速迭代的工具，很多内容需要自行去分辨新旧，并且要能够保持一个持续学习的心态，老项目尽量不要尝试新内容

### 什么是WebGL?
+ WebGL是一项可以在浏览器中流畅展示3D模型和场景的一种技术，它使用JavaScript作为编程语言，调用浏览器支持的3D绘制函数，来实现3D模型和场景
+ WebGl可以应用于游戏，家居设计的效果预览，虚拟现实VR/AR，城市地图，以及CAD制图

### 浏览器为什么能够绘制3D?
因为浏览器实现了OpenGLES的规范，这套规范可以直接使用指令操作显卡，使得显卡能够渲染3D，从而使得浏览器能够绘制3D

### 什么是OpenGLES?
+ OpenGL ES（OpenGL for Embeded System）是OpenGL（Open Graphics Library）的精简子集，是以手持和嵌入式设备为目标的高级3D图形API，如现在火爆的智能手机，支持桌面系统
+ 还是浏览器3D图形标准WebGL的基础，支持多个平台，如桌面端的Linux、Windows，移动端的Android、iOS等，无处不在
+ 参考文档
	> [OpenGLES入门简介](https://blog.csdn.net/weixin_38498942/article/details/93652501 "OpenGLES入门简介")  
	> [OpenGLES与EGL的基础概念](https://zhuanlan.zhihu.com/p/74006499 "OpenGLES与EGL的基础概念")  
	> [OpenGL和DirectX如何抉择？](https://www.zhihu.com/question/23975160 "OpenGL和DirectX如何抉择？")  
	> [详细比较DirectX和OpenGL的区别](https://www.cnblogs.com/findumars/p/6339357.html "详细比较DirectX和OpenGL的区别")  
	> [为什么你应该使用OpenGL而不是DirectX?](https://www.cnblogs.com/y114113/p/10676352.html "为什么你应该使用OpenGL而不是DirectX?")  

### 什么是Threejs？
+ Threejs是一个封装好的WebGL库，他使WebGL的学习更为简单
+ 如果我们把WebGL比作汇编语言的话，那么Threejs就是C语言

### Threejs中的基本要素
+ 场景（sence）
+ 相机（camera）
+ 渲染器（render）

### 向量
参考资料
+ [Three.js向量Vector3](http://www.yanhuangxueyuan.com/doc/three.js/vector3.html "Three.js向量Vector3")
+ [Three.js 向量的内积(点积)](http://www.skrjs.com/index.php/2018/12/28/three-js-%E5%90%91%E9%87%8F%E7%9A%84%E5%86%85%E7%A7%AF/ "Three.js 向量的内积(点积)")

### 网格
参考资料
+ [学习Three.js——网格(Mesh)](https://blog.csdn.net/a13602955218/article/details/85222910 "学习Three.js——网格(Mesh)")

### 几何体
参考资料
+ [学习Three.js——几何体(Geometry)](https://blog.csdn.net/a13602955218/article/details/85222878 "学习Three.js——几何体(Geometry)")