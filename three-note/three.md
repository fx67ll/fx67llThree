# Threejs 学习笔记

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

### 什么是Threejs？
+ Threejs是一个封装好的WebGL库，他使WebGL的学习更为简单
+ 如果我们把WebGL比作汇编语言的话，那么Threejs就是C语言

### Threejs中的基本要素
+ 场景（sence）
+ 相机（camera）
+ 渲染器（render）