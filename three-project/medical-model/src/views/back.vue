<template>
	<div class="model-box">
		<div id="model-container" class="three-box"></div>
		<div class="panel-box">
			<div class="tool-box">
				<div class="tool-item-box">
					<span class="tool-item-title">前升系数：</span>
					<el-slider class="tool-item-slider" v-model="chinValue" :min="0" :max="3" :step="0.01" show-input @change="setChinVal()"></el-slider>
				</div>
				<div class="tool-item-box">
					<span class="tool-item-title">张嘴系数：</span>
					<el-slider class="tool-item-slider" v-model="mouseValue" :min="0" :max="2" :step="0.01" show-input @change="setMouseVal()"></el-slider>
				</div>
				<div class="tool-item-box">
					<span class="tool-item-title">抬头系数：</span>
					<el-slider class="tool-item-slider" v-model="raiseValue" :min="0" :max="1" :step="0.01" show-input @change="setRaiseVal()"></el-slider>
				</div>
				<div class="tool-item-box">
					<span class="tool-item-title">透明系数：</span>
					<el-slider class="tool-item-slider" v-model="opacityValue" :min="0" :max="1" :step="0.01" show-input @change="setOpacityVal()"></el-slider>
				</div>
				<div class="tool-item-box" style="justify-content: flex-start;">
					<span class="tool-item-title">材质性状：</span>
					<!-- <el-slider class="tool-item-slider" v-model="raiseValue" :min="0" :max="1" :step="0.1" show-input @change="setRaiseVal()"></el-slider> -->
					<el-button @click="showVis">{{ btnText }}</el-button>
					<el-color-picker v-model="modelColor" style="margin: 0 10px;" @change="colorChange($event)"></el-color-picker>
					<el-button @click="test">测试</el-button>
				</div>
				<div class="tool-item-box">
					<span class="tool-item-title">喉咙系数：</span>
					<el-slider class="tool-item-slider" v-model="throatValue" :min="0" :max="1" :step="0.01" show-input @change="setThroatVal()"></el-slider>
				</div>
				<!-- <div class="tool-item-box">
					<span class="tool-item-title">脊椎系数：</span>
					<el-slider class="tool-item-slider" v-model="neckValue" :min="-1" :max="1" :step="0.01" show-input @change="setNeckVal()"></el-slider>
				</div> -->
				<div class="tool-item-box" style="justify-content: flex-start;">
					<span class="tool-item-title">材质性状：</span>
					<el-button @click="showVisThroat">{{ btnTextThroat }}</el-button>
					<el-button @click="showVisNeck">{{ btnTextNeck }}</el-button>
				</div>
				<!-- <div class="tool-item-box">
					<span class="tool-item-title">测试系数：</span>
					<el-slider class="tool-item-slider" v-model="testValue" :min="0" :max="1" :step="0.01" show-input @change="setTest()"></el-slider>
				</div> -->
			</div>
			<div class="info-box">
				<el-card>
					<div class="info-item-box">
						<span class="info-item-title">仰头角度：</span>
						<span class="info-item-num">25°</span>
					</div>
					<div class="info-item-box">
						<span class="info-item-title">张口角度：</span>
						<span class="info-item-num">25°</span>
					</div>
					<div class="info-item-box">
						<span class="info-item-title">下巴长度：</span>
						<span class="info-item-num">13mm</span>
					</div>
					<div class="info-item-box">
						<span class="info-item-title">甲颏距离：</span>
						<span class="info-item-num">15mm</span>
					</div>
					<div class="info-item-box">
						<span class="info-item-title">喉结位移距离：</span>
						<span class="info-item-num">0.53mm</span>
					</div>
					<div class="info-item-box">
						<span class="info-item-title">颞颌关节位移距离：</span>
						<span class="info-item-num">0.66mm</span>
					</div>
					<div class="info-item-box">
						<span class="info-item-title">舌体厚度：</span>
						<span class="info-item-num">0.36mm</span>
					</div>
					<div class="info-item-box">
						<span class="info-item-title">声门视野：</span>
						<span class="info-item-num">3cm</span>
					</div>
				</el-card>
			</div>
		</div>
	</div>
</template>

<script>
import * as THREE from 'three/build/three.module.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

import _ from 'underscore';
export default {
	name: 'modelIndex-back',
	data() {
		return {
			// 人物模型的前升、张嘴、抬头大小
			chinValue: 0,
			mouseValue: 0,
			raiseValue: 0,
			// 相机对象
			camera: null,
			// 场景对象
			scene: null,
			// 渲染器对象
			renderer: null,
			// 状态对象
			stats: null,
			// 混淆器对象？？？
			mixer: null,
			// 时间对象
			clock: null,
			// FBX模型加载对象
			fbxloader: null,
			// 按钮文字
			btnText: '隐藏人物',
			// 取色器默认颜色
			modelColor: '#ff0000',
			// 模型透明度
			opacityValue: 0.5,
			// 喉咙变形系数
			throatValue: 0,
			// 脊椎变形系数
			neckValue: 0,
			// 喉咙显隐文字
			btnTextThroat: '隐藏喉咙',
			// 脊椎显隐文字
			btnTextNeck: '隐藏脊椎',
			// 测试系数
			testValue: 0 
		};
	},
	mounted() {
		this.modelInit();
	},
	methods: {
		// 系数测试
		setTest() {
			this.scene.children[4].children[10].morphTargetInfluences[0] = this.testValue;
		},
		// 测试
		test() {
			// 周六之前的任务是参照UE修改当前功能，完成第一阶段前端代码的交付
			// console.log(this.scene);
			// _.each(this.scene.children[4].children, function(item, key) {
			// 	console.log(key, item.name);
			// });
		},
		// 修改喉咙显隐
		showVisThroat() {
			this.scene.children[4].children[2].material[5].visible = !this.scene.children[4].children[2].material[5].visible;
			this.scene.children[4].children[2].material[4].visible = !this.scene.children[4].children[2].material[4].visible;
			this.scene.children[4].children[2].material[3].visible = !this.scene.children[4].children[2].material[3].visible;
			this.scene.children[4].children[2].material[2].visible = !this.scene.children[4].children[2].material[2].visible;
			this.scene.children[4].children[2].material[1].visible = !this.scene.children[4].children[2].material[1].visible;
			this.scene.children[4].children[2].material[0].visible = !this.scene.children[4].children[2].material[0].visible;
			this.scene.children[4].children[2].material[0].visible ? (this.btnTextThroat = '隐藏喉咙') : (this.btnTextThroat = '显示喉咙');
		},
		// 修改脊椎显隐
		showVisNeck() {
			this.scene.children[4].children[0].material.visible = !this.scene.children[4].children[0].material.visible;
			this.scene.children[4].children[1].material.visible = !this.scene.children[4].children[1].material.visible;
			this.scene.children[4].children[1].material.visible ? (this.btnTextNeck = '隐藏脊椎') : (this.btnTextNeck = '显示脊椎');
		},
		// 修改喉咙变形数据
		setThroatVal() {
			this.scene.children[4].children[2].morphTargetInfluences[0] = this.throatValue;
		},
		// 修改脊椎变形数据
		setNeckVal() {
			this.scene.children[4].children[1].morphTargetInfluences[0] = -this.neckValue;
		},
		// 修改前升变形数据
		setChinVal() {
			this.scene.children[4].children[3].morphTargetInfluences[0] = this.chinValue;
		},
		// 修改张嘴变形数据
		setMouseVal() {
			this.scene.children[4].children[3].morphTargetInfluences[1] = this.mouseValue;
		},
		// 修改抬头变形数据
		setRaiseVal() {
			this.scene.children[4].children[3].morphTargetInfluences[2] = this.raiseValue;
		},
		// 显示隐藏模型
		showVis() {
			this.scene.children[4].children[3].material.visible = !this.scene.children[4].children[3].material.visible;
			this.scene.children[4].children[3].material.visible ? (this.btnText = '隐藏人物') : (this.btnText = '显示人物');
		},
		// 修改材质颜色
		colorChange(val) {
			this.scene.children[4].children[3].material.color.set(val);
		},
		// 修改材质透明度
		setOpacityVal() {
			this.scene.children[4].children[3].material.transparent = true;
			this.scene.children[4].children[3].material.opacity = this.opacityValue;
		},
		modelInit() {
			this.clock = new THREE.Clock();
			this.fbxloader = new FBXLoader();
			this.init();
			this.animate();
		},
		init() {
			let self = this;

			// 模型加载的容器
			const container = document.getElementById('model-container');

			self.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
			self.camera.position.set(100, 200, 300);

			self.scene = new THREE.Scene();
			self.scene.background = new THREE.Color(0xa0a0a0);
			self.scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);

			// 创建半球光源用于模拟真实环境
			const ambientLight = new THREE.AmbientLight('#FFFFFF');
			self.scene.add(ambientLight);

			// 设置平行光赖添加模型阴影
			const dirLight = new THREE.DirectionalLight(0xffffff);
			dirLight.position.set(0, 200, 100);
			// 添加平行光但是去掉阴影
			// dirLight.castShadow = true;
			dirLight.shadow.camera.top = 180;
			dirLight.shadow.camera.bottom = -100;
			dirLight.shadow.camera.left = -120;
			dirLight.shadow.camera.right = 120;
			self.scene.add(dirLight);

			// 添加光线辅助线
			// self.scene.add( new THREE.CameraHelper( dirLight.shadow.self.camera ) );

			// ground
			const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
			mesh.rotation.x = -Math.PI / 2;
			mesh.receiveShadow = true;
			self.scene.add(mesh);

			const grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
			grid.material.opacity = 0.2;
			grid.material.transparent = true;
			self.scene.add(grid);

			// 使用FBXLoader加载模型
			self.fbxloader.load('models/Human-002.fbx', function(object) {
				self.mixer = new THREE.AnimationMixer(object);

				// console.log(object.children[0].geometry.morphAttributes);
				// console.log(object.children[0].morphTargetInfluences[0]);
				// object.children[0].morphTargetInfluences[0] = 0; // 前升
				// object.children[0].morphTargetInfluences[1] = 1; // 张嘴
				// object.children[0].morphTargetInfluences[2] = 0.9; // 抬头

				// const action = self.mixer.clipAction(object.animations[0]);
				// action.play();

				object.traverse(function(child) {
					if (child.isMesh) {
						child.castShadow = true;
						child.receiveShadow = true;
					}
				});

				// 调整模型的初始中心点
				// object.position.y = 220;

				// 调整模型初始透明度
				object.children[3].material.transparent = true;
				object.children[3].material.opacity = 0.5;

				// console.log(object)
				self.scene.add(object);
			});

			self.renderer = new THREE.WebGLRenderer({ antialias: true });
			self.renderer.setPixelRatio(window.devicePixelRatio);
			self.renderer.setSize(window.innerWidth, window.innerHeight);
			self.renderer.shadowMap.enabled = true;
			container.appendChild(self.renderer.domElement);

			const controls = new OrbitControls(self.camera, self.renderer.domElement);
			controls.target.set(0, -50, 0);
			controls.update();

			window.addEventListener('resize', self.onWindowResize);

			// 帧率监测模块引入
			self.stats = new Stats();
			container.appendChild(self.stats.dom);
		},
		onWindowResize() {
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();

			this.renderer.setSize(window.innerWidth, window.innerHeight);
		},
		animate() {
			let self = this;

			requestAnimationFrame(self.animate);

			// 获得前后两次执行的时间间隔
			const delta = self.clock.getDelta();

			if (self.mixer) self.mixer.update(delta);

			self.renderer.render(self.scene, self.camera);

			// 更新帧率监测
			self.stats.update();
		}
	}
};
</script>

<style lang="less" scoped="scoped">
@tooltitleWidth: 120px;
@infotitleWidth: 150px;
.model-box {
	width: 100%;
	height: 100%;
	.ban-user-select();
	.three-box {
		width: 100%;
		height: 100%;
	}
	.panel-box {
		width: 500px;
		padding: 20px;
		position: absolute;
		top: 30px;
		right: 30px;
		.tool-box {
			.tool-item-box {
				width: 100%;
				display: flex;
				justify-content: space-between;
				margin-bottom: 10px;
				.tool-item-title {
					width: @tooltitleWidth;
					color: #727479;
					font-size: 20px;
					line-height: 40px;
					font-weight: 600;
				}
				.tool-item-slider {
					width: calc(100% - @tooltitleWidth);
				}
			}
		}
		.info-box {
			margin-top: 50px;
			padding: 20px 0 10px 0;
			.info-item-box {
				width: 100%;
				display: flex;
				justify-content: space-between;
				margin-bottom: 10px;
				.info-item-title {
					width: @infotitleWidth;
					color: #727479;
					font-size: 16px;
					line-height: 20px;
					text-align: right;
				}
				.info-item-num {
					width: calc(100% - @infotitleWidth);
					font-size: 16px;
					line-height: 20px;
					text-indent: 20px;
				}
			}
			.info-item-box:nth-child(1) {
				margin-top: 10px;
			}
		}
	}
}
</style>
