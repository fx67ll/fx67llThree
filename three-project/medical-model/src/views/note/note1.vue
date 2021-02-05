<template>
	<div class="fx67ll-box"></div>
</template>

<script>
import * as THREE from 'three/build/three.module.js';
export default {
	name: 'fx67llIndex',
	data() {
		return {};
	},
	mounted() {
		// this.createScene();
		// this.createVector();
		this.createMesh();
	},
	methods: {
		// 场景 对象
		createScene() {
			console.log('-------------------------------------------');
			var scene = new THREE.Scene();
			console.log('场景对象', scene);
			console.log('-------------------------------------------');
		},
		// 向量 对象
		createVector() {
			console.log('-------------------------------------------');
			// 几维向量就有几个分量，二维向量Vector2有x和y两个分量，也就是Vector2对象具有x和y两个属性，三维向量Vector3有xyz三个分量，四维向量Vector4有xyzw四个分量
			// 在Threejs中一些对象属性值会使用这些向量对象来表示，比如几何体Geometry的顶点UV坐标需要表示一个二维坐标，所以uv坐标使用Vector2对象表示
			// 几何体Geometry的顶点位置坐标在在三维空间笛卡尔坐标系中中坐标需要xyz三个分量，所以顶点坐标使用Vector3对象表示
			// Three.js模型对象的缩放属性可以在xyz三个方向上进行缩放，也就是说有三个分量需要表达，自然使用Vector3对象
			var v3 = new THREE.Vector3(12, 5, 4);
			console.log('向量对象', v3);
			console.log('向量x分量', v3.x);
			// 设置分量的两种方式
			v3.x = 80;
			v3.set(2, 4, 8);
			console.log('向量x分量', v3.x);
			console.log('-------------------------------------------');
			// -------------------------------------------------------------------------------------------------------------

			// clone()
			// 对象执行克隆方法.clone()，返回一个新的对象，和原来对象属性的值一样
			var v3Clone = v3.clone();
			console.log('克隆的向量对象', v3Clone);
			console.log('-------------------------------------------');
			// -------------------------------------------------------------------------------------------------------------

			// copy()
			// 执行.copy()方法，向量v3Copy三个分量xyz的值覆盖向量v3三个分量
			var v3Copy = new THREE.Vector3(333, 333, 333);
			v3.copy(v3Copy);
			console.log('拷贝之后的向量对象', v3Copy);
			console.log('-------------------------------------------');
			// -------------------------------------------------------------------------------------------------------------

			// Threejs中的向量和标量
			// 如果你有一定的数学基础，肯定对向量和标量有一定的概念，比如说空间中一个点的位置是标量，两个点构成一个有方向的量是向量
			// 在Three.js中，不一定要严格区分向量和标量的概念，THREE.Vector3对象既可以表示一个顶点位置，比如网格模型Mesh的位置坐标
			// 也可以表示一个有方向的向量，比如顶点的法向量或光线的方向
			// 虽然Vector字面意思是向量，但是THREE.Vector3对象表示的是向量还是标量，要看它的具体含义
			// -------------------------------------------------------------------------------------------------------------

			// sub()
			// 通过.sub()方法可以对两个向量进行减法运算，比如两个表示顶点坐标的Vector3对象进行减法运算返回一个新的Vector3对象就是两个点构成的向量
			// 直接执行.sub()方法会改变原对象，所以先克隆然后再执行减法运算
			// -------------------------------------------------------------------------------------------------------------

			// length()
			// 向量对象执行.length()方法会返回向量的长度
			var p1 = new THREE.Vector3(1, 1, 1);
			var p2 = new THREE.Vector3(99, 99, 99);
			var p12Length = p1
				.clone()
				.sub(p2)
				.length();
			console.log('两点之间的距离', p12Length);
			console.log('-------------------------------------------');
			// -------------------------------------------------------------------------------------------------------------

			// dot()
			// 向量的.dot()方法用来计算两个向量的点积，计算光线和几何体顶点夹角，几何体体积等等都会用到该方法

			// 示例：已知三角形三个顶点的坐标，计算其中一个顶点对应角度余弦值
			// 说实话不是很明白这个点积的方法，但是先抄一遍，后期运用的时候再去理解就好

			// 三角形的三个点坐标p1，p2，p3
			var p1 = new THREE.Vector3(0, 0, 0); // 点1坐标
			var p2 = new THREE.Vector3(20, 0, 0); // 点2坐标
			var p3 = new THREE.Vector3(0, 40, 0); // 点3坐标

			// p1，p2两个点确定一个向量
			var v1 = p1.clone().sub(p2);
			// p1，p3两个点确定一个向量
			var v2 = p1.clone().sub(p3);
			// .dot()计算两个向量点积
			// .length()计算向量长度
			// 返回三角形顶点p1对应夹角余弦值
			var CosineValue = v1.dot(v2) / (v1.length() * v2.length());
			console.log('三角形两条边夹角余弦值', CosineValue);
			// .acos()：反余弦函数，返回结果是弧度
			console.log('三角形两条边夹角', (Math.acos(CosineValue) * 180) / Math.PI);
			console.log('-------------------------------------------');
			// -------------------------------------------------------------------------------------------------------------

			// cross()&crossVectors()
			// .crossVectors()和.cross()都是向量对象的叉乘计算方法，功能一样，只是使用的细节有些不同，向量对象叉乘的结果仍然是向量对象

			// 向量v2直接执行.cross()方法，叉乘的结果会覆盖向量v2的xyz分量
			// 所以克隆v2避免叉乘后改变原来的v2变量
			var v3 = new THREE.Vector3();
			v3.crossVectors(v1, v2);
			var v3 = v2.clone();
			v3.cross(v1);

			// 示例：已知三角形的三个顶点p1, p2, p3的坐标值，利用三个顶点的坐标计算三角形的面积
			// 此处也不是很理解，后期运用再说

			var v1 = new THREE.Vector3();
			var v2 = new THREE.Vector3();
			// 通过两个顶点坐标计算其中两条边构成的向量
			v1 = p1.clone().sub(p2);
			v2 = p1.clone().sub(p3);

			var v3 = new THREE.Vector3();
			// 三角形面积计算
			v3.crossVectors(v1, v2);
			var s = v3.length() / 2;
			console.log('三角形的面积是' + s);
			console.log('-------------------------------------------');
		},
		// 网格 对象
		createMesh() {
			console.log('-------------------------------------------');
			var mesh = new THREE.Mesh();
			console.log('网格对象', mesh);
			mesh.position.set(100, 200, 300);
			// 在空间位置中的笛卡尔坐标，是一个三维向量来表达；平面坐标系中，就是一个二维向量
			console.log('网格对象位置属性', mesh.position);
			console.log('网格位置x轴坐标', mesh.position.x);
			console.log('网格对象缩放属性', mesh.scale);
			console.log('网格y方向缩放系数', mesh.scale.y);
			console.log('-------------------------------------------');

			// 几何体是不能被渲染的，只有几何体和材质结合成网格才能被渲染到屏幕上

			// 常见的属性和方法
			// 1.position：表示网格的绝对位置
			// 2.rotation：表示物体绕x,y,z轴旋转的弧度(注意是弧度不是角度)，设置方法和position的类似
			// 3.scale：表示物体在x,y,z轴缩放的大小，设置方法和position的类似
			// 4.translate：物体相对于原来的位置在x,y,z轴移动的距离
			// 5.visible：若设置为false，那么将不会被渲染

			// 设置postion的三张方法
			mesh.position.x = 9;
			mesh.position.y = 9;
			mesh.position.z = 9;
			console.log('position方法1修改后', mesh.position);
			mesh.position.set(99, 99, 99);
			console.log('position方法2修改后', mesh.position);
			// 方法3貌似在124版本这里已经无法用了，会导致下面这行报错
			// Cannot assign to read only property 'position' of object '#<Mesh>'
			// mesh.position  = new THREE.Vector3(999, 999, 999);
			// console.log('position方法3修改后', mesh.position);
			console.log('-------------------------------------------');

			// 设置translate的两种方法
			mesh.translate(9, 9, 9);
			console.log('translate方法1修改后', mesh.translate);
			// 方法2貌似在124版本这里也无法用了，会报translateXYZ方法未定义
			// mesh.translateX(99);
			// mesh.trainslateY(99);
			// mesh.translateZ(99)
			// console.log('translate方法2修改后', mesh.translate);
			console.log('-------------------------------------------');
		},
		// 几何体 对象
		createGeometry() {
			
		}
	}
};
</script>

<style lang="less" scoped="scoped">
.fx67ll-box {
	width: 100%;
	height: 100%;
	.ban-user-select();
}
</style>
