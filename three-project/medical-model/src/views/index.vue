<template>
	<div class="model-box">
		<div id="model-container" class="three-box"></div>
		<div class="test-box">
			<div class="tool-box">
				<div class="tool-item-box">
					<span class="tool-item-title">透明系数：</span>
					<el-slider class="tool-item-slider" v-model="opacityValue" :min="0" :max="1" :step="0.01" @change="setOpacityVal(opacityValue)"></el-slider>
				</div>
				<!-- <div class="tool-item-box" style="justify-content: flex-start;">
					<span class="tool-item-title">群组显隐：</span>
					<el-button @click="showModel(1, fbxGroupKeys.a.isShow)">A</el-button>
					<el-button @click="showModel(2, fbxGroupKeys.b.isShow)">B</el-button>
					<el-button @click="showModel(3, fbxGroupKeys.c.isShow)">C</el-button>
					<el-button @click="showModel(4, fbxGroupKeys.d.isShow)">D</el-button>
				</div> -->
				<div class="tool-item-box" style="justify-content: flex-start;">
					<span class="tool-item-title">测试工具：</span>
					<el-button @click="showModel()">全部</el-button>
					<el-button @click="test">测试</el-button>
				</div>
				<div class="info-box">
					<el-card>
						<div class="info-item-box">
							<span class="info-item-title">张口角度：</span>
							<span class="info-item-num">{{ (mouseAngle.num * 30).toFixed(2) }}°</span>
						</div>
						<div class="info-item-box">
							<span class="info-item-title">下巴长度：</span>
							<span class="info-item-num">{{ (45 + (chinShift.num / 3) * 15).toFixed(2) }}mm</span>
						</div>
						<div class="info-item-box">
							<span class="info-item-title">仰头角度：</span>
							<span class="info-item-num">{{ headAngle.num }}°</span>
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
		<div class="panel-box">
			<div class="tool-box">
				<div class="tool-item-box">
					<!-- 张口角度0-30° -->
					<span class="tool-item-title">张口角度：</span>
					<el-slider
						class="tool-item-slider"
						v-model="mouseAngle.num"
						:min="mouseAngle.minnum"
						:max="mouseAngle.maxnum"
						:step="mouseAngle.stepnum"
						show-input
						@change="setMouseAngle()"
					></el-slider>
				</div>
				<div class="tool-item-box">
					<!-- 下巴长度起始值45mm，轻度35mm，重度55mm -->
					<span class="tool-item-title tool-item-title-middle">模拟下巴前伸：</span>
					<el-slider
						class="tool-item-slider tool-item-slider-middle"
						v-model="chinShift.num"
						:min="chinShift.minnum"
						:max="chinShift.maxnum"
						:step="chinShift.stepnum"
						show-input
						@change="setChinShift()"
					></el-slider>
				</div>
				<div class="tool-item-box">
					<!-- 仰头角度，1级25-35°，2级25-15°，3级15-5°，4级5-(-5)° -->
					<span class="tool-item-title">仰头分级：</span>
					<el-select class="tool-item-select" v-model="headLevel" :clearable="true" placeholder="请选择仰头分级" @change="headLevelChange()" @clear="headLevelClear()">
						<el-option label="1级" :value="1"></el-option>
						<el-option label="2级" :value="2"></el-option>
						<el-option label="3级" :value="3"></el-option>
						<el-option label="4级" :value="4"></el-option>
					</el-select>
				</div>
				<div class="tool-item-box">
					<span class="tool-item-title">仰头角度：</span>
					<el-slider
						class="tool-item-slider"
						v-model="headAngle.num"
						:min="headAngle.minnum"
						:max="headAngle.maxnum"
						:step="headAngle.stepnum"
						:disabled="headAngle.isoff"
						show-input
						@change="setHeadAngle()"
					></el-slider>
				</div>
				<div class="tool-item-box">
					<!-- 喉位移常数项：6，喉位移常数项：X，暂为0 -->
					<span class="tool-item-title tool-item-title-long">喉结位移常数：</span>
					<el-input class="tool-item-input tool-item-input-long" v-model="throatShift" :clearable="true" placeholder="请输入喉结位移常数" @change=""></el-input>
				</div>
				<div class="tool-item-box">
					<!-- 颞颌关节活动度常数项：15，常数b：b=1 -->
					<span class="tool-item-title tool-item-title-long">颞颌关节活动度常数：</span>
					<el-input class="tool-item-input tool-item-input-long" v-model="jointShiftA" :clearable="true" placeholder="请输入颞颌关节活动常数" @change=""></el-input>
				</div>
				<div class="tool-item-box">
					<!-- 颞颌关节张口度常数项：18，常数b：b=3 -->
					<span class="tool-item-title tool-item-title-long">颞颌关节张口度常数：</span>
					<el-input class="tool-item-input tool-item-input-long" v-model="jointShiftB" :clearable="true" placeholder="请输入颞颌关节活动常数" @change=""></el-input>
				</div>
				<div class="tool-item-box">
					<span class="tool-item-title">舌体厚度：</span>
					<el-slider
						class="tool-item-slider"
						v-model="tongueThickness.num"
						:min="tongueThickness.minnum"
						:max="tongueThickness.maxnum"
						:step="tongueThickness.stepnum"
						show-input
						@change=""
					></el-slider>
				</div>
				<div class="tool-item-box">
					<!-- 舌体厚度常数项：10，系数b：b=15 -->
					<span class="tool-item-title tool-item-title-long">舌体厚度常数：</span>
					<el-input
						class="tool-item-input tool-item-input-long"
						v-model="tongueThicknessConstant"
						:clearable="true"
						placeholder="请输入舌体厚度常数"
						@change=""
					></el-input>
				</div>
				<div class="tool-item-box">
					<!-- 舌厚度缺失下舌体厚度常数项：20，系数b：b=100 -->
					<span class="tool-item-title tool-item-title-long">舌体厚度缺失下常数：</span>
					<el-input class="tool-item-input tool-item-input-long" v-model="tongueConstantA" :clearable="true" placeholder="请输入舌体厚度缺失下常数" @change=""></el-input>
				</div>
				<div class="tool-item-box">
					<!-- 舌颏缺失下舌体厚度常数项：20，系数b：b=140 -->
					<span class="tool-item-title tool-item-title-long">舌颏距离缺失下常数：</span>
					<el-input class="tool-item-input tool-item-input-long" v-model="tongueConstantB" :clearable="true" placeholder="请输入舌颏距离缺失下常数" @change=""></el-input>
				</div>
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
	name: 'modelIndex',
	data() {
		return {
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
			// FBX模型对象群组
			fbxGroup: null,
			// FBX模型对象编组，根据模型序列编组
			fbxGroupKeys: {
				// 模组01
				a: {
					keys: [0, 1, 2, 6, 18],
					isShow: true
				},
				// 模组02
				b: {
					keys: [3, 4, 5, 7, 16],
					isShow: true
				},
				// 模组03
				c: {
					keys: [8, 10, 11, 12, 15],
					isShow: true
				},
				// 模组04
				d: {
					keys: [9, 13, 14, 17, 19],
					isShow: true
				},
				// 人体外壳编组
				human: {
					keys: [0, 4, 10],
					isShow: true
				}
			},
			// 是否显示全部模型
			isShowAll: true,
			// 张口角度
			mouseAngle: {
				num: 0,
				minnum: 0,
				maxnum: 1,
				stepnum: 0.01
			},
			// 下巴前伸
			chinShift: {
				num: 0,
				minnum: -2,
				maxnum: 2,
				stepnum: 0.02
			},
			// 仰头角度级别
			headLevel: null,
			// 仰头角度
			headAngle: {
				num: 0,
				minnum: 0,
				maxnum: 1,
				stepnum: 0.01,
				isoff: false
			},
			// 喉结位移常数
			throatShift: 6,
			// 颞颌关节活动度常数
			jointShiftA: 15,
			// 颞颌关节张口度常数
			jointShiftB: 18,
			// 舌体厚度
			tongueThickness: {
				num: 0,
				minnum: 0,
				maxnum: 10,
				stepnum: 1
			},
			// 舌体厚度常数
			tongueThicknessConstant: 10,
			// 舌体厚度缺失下常数
			tongueConstantA: 20,
			// 舌颏距离缺失下常数
			tongueConstantB: 20,
			// 透明系数
			opacityValue: 0.3
		};
	},
	mounted() {
		this.modelInit();
	},
	methods: {
		// 测试用例
		test() {
			// 周六之前的任务是完成第一阶段前端代码的交付
			// console.log(this.scene);
			// this.getModelGroup();
			
			// this.showModel(0, false);
			// this.showModel(2, true);
			// _.each(this.getEachItem(this.fbxGroupKeys.b.keys), function(item, key) {
			// 	console.log(key, item);
			// });
			// console.log(this.getEachItem(this.fbxGroupKeys.b.keys).length);
			// this.getEachItem(this.fbxGroupKeys.a.keys)[0].visible = false;
			// this.getEachItem(this.fbxGroupKeys.a.keys)[1].visible = false;
			// this.getEachItem(this.fbxGroupKeys.a.keys)[2].morphTargetInfluences[0] = 5;
			// this.getEachItem(this.fbxGroupKeys.a.keys)[3].visible = false;
			// this.getEachItem(this.fbxGroupKeys.a.keys)[4].morphTargetInfluences[0] = 5;

			// this.getEachItem(this.fbxGroupKeys.a.keys)[0].visible = false;
			// this.getEachItem(this.fbxGroupKeys.a.keys)[0].morphTargetInfluences[0] = 1;
		},
		// 修改材质透明度，第一个参数是FBX模型群组，第二个参数是透明系数（0-1）
		setOpacityVal(opacityValue) {
			_.each(this.getEachItem(this.fbxGroupKeys.human.keys), function(item, key) {
				item.material.transparent = true;
				item.material.opacity = opacityValue;
			});
		},
		// 修改张口角度
		setMouseAngle() {
			this.showModel(0, false);
			this.showModel(1, true);
			this.getEachItem(this.fbxGroupKeys.a.keys)[0].morphTargetInfluences[0] = this.mouseAngle.num;
			this.getEachItem(this.fbxGroupKeys.a.keys)[1].morphTargetInfluences[0] = this.mouseAngle.num;
		},
		// 修改下巴前伸
		setChinShift() {
			this.showModel(0, false);
			this.showModel(2, true);
			this.getEachItem(this.fbxGroupKeys.b.keys)[1].morphTargetInfluences[0] = this.chinShift.num;
			this.getEachItem(this.fbxGroupKeys.b.keys)[2].morphTargetInfluences[0] = this.chinShift.num;
		},
		// 修改头部仰头动作
		setHeadAngle() {
			this.showModel(0, false);
			this.showModel(3, true);
			this.getEachItem(this.fbxGroupKeys.c.keys)[1].morphTargetInfluences[0] = this.headAngle.num;
			this.getEachItem(this.fbxGroupKeys.c.keys)[2].morphTargetInfluences[0] = this.headAngle.num;
		},
		// 仰头分级与角度联动
		headLevelChange() {
			var self = this;
			switch (self.headLevel) {
				case 1:
					self.headAngle = {
						num: 25,
						minnum: 25,
						maxnum: 35,
						stepnum: 5,
						isoff: false
					};
					break;

				case 2:
					self.headAngle = {
						num: 15,
						minnum: 15,
						maxnum: 25,
						stepnum: 5,
						isoff: false
					};
					break;

				case 3:
					self.headAngle = {
						num: 5,
						minnum: 5,
						maxnum: 15,
						stepnum: 5,
						isoff: false
					};
					break;

				case 4:
					self.headAngle = {
						num: -5,
						minnum: -5,
						maxnum: 5,
						stepnum: 5,
						isoff: false
					};
					break;

				default:
					self.headAngle = {
						num: 0,
						minnum: 0,
						maxnum: 0,
						stepnum: 0,
						isoff: true
					};
			}
		},
		// 清除仰头分级
		headLevelClear() {
			this.headAngle = {
				num: 0,
				minnum: 0,
				maxnum: 0,
				stepnum: 0,
				isoff: true
			};
		},
		// 修改群组的显示隐藏，传群组下标和是否显隐的布尔值，不可以使用'a=!a'表达式，在循环过程中会有重复'!'的过程，导致显隐结果不一致
		showModel(index, isShow) {
			var self = this;
			switch (index) {
				case 1:
					this.forEachItem(this.getEachItem(this.fbxGroupKeys.a.keys), isShow);
					break;
				case 2:
					this.forEachItem(this.getEachItem(this.fbxGroupKeys.b.keys), isShow);
					break;
				case 3:
					this.forEachItem(this.getEachItem(this.fbxGroupKeys.c.keys), isShow);
					break;
				case 4:
					this.forEachItem(this.getEachItem(this.fbxGroupKeys.d.keys), isShow);
					break;
				case 0:
					this.forEachItem(this.fbxGroup.children, isShow);
					break;
				default:
					self.isShowAll = !self.isShowAll;
					_.each(this.fbxGroupKeys, function(item, key) {
						item.isShow = !self.isShowAll;
					});
					this.forEachItem(this.fbxGroup.children, this.isShowAll);
			}
		},
		// 获取指定下标的模型对象群组
		getEachItem(arr) {
			var objArr = [];
			_.each(this.fbxGroup.children, function(item, key) {
				_.each(arr, function(obj, index) {
					if (key === obj) {
						objArr.push(item);
					}
				});
			});
			return objArr;
		},
		// 处理复杂模型显隐
		forEachItem(arr, isShow) {
			var self = this;
			_.each(arr, function(item, key) {
				if (Array.isArray(item.material)) {
					_.each(item.material, function(obj, index) {
						obj.visible = isShow;
					});
				} else {
					item.material.visible = isShow;
				}
			});
		},
		// 初始化的时候处理所有模型统一显示，其实不需要，保险起见还是启用
		initVisible() {
			var self = this;
			_.each(this.fbxGroup.children, function(item, key) {
				if (Array.isArray(item.material)) {
					_.each(item.material, function(obj, index) {
						obj.visible = self.isShowAll;
					});
				} else {
					item.material.visible = self.isShowAll;
				}
			});
		},
		getModelGroup() {
			// 查看模型序列，待会写一个方法截取结尾01020304以及没有结尾的自动分abcd多组
			_.each(this.fbxGroup.children, function(item, key) {
				console.log(key, item.name);
			});
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
			self.fbxloader.load('models/Human-005.fbx', function(object) {
				self.mixer = new THREE.AnimationMixer(object);

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

				self.scene.add(object);

				// 添加fbx模型对象群组，并完成各类初始化
				self.fbxGroup = self.scene.children[4];

				// 全部显示
				self.initVisible();

				// 设置初始化透明度
				self.setOpacityVal(self.opacityValue);

				// 默认显示第一个张口角度的模型
				self.showModel(0, false);
				self.showModel(1, true);

				// 仅在开发中测试用
				self.test();
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
.model-box {
	width: 100%;
	height: 100%;
	.ban-user-select();
	.three-box {
		width: 100%;
		height: 100%;
	}
	.test-box {
		width: 400px;
		padding: 20px;
		position: absolute;
		top: 70px;
		left: 30px;
	}
	.panel-box {
		width: 500px;
		padding: 20px;
		position: absolute;
		top: 30px;
		right: 30px;
	}
}

// 本页面中工具盒子公共样式
@tooltitleWidth: 120px;
@tooltitleWidthMid: 160px;
@tooltitleWidthLong: 300px;
.tool-box {
	.tool-item-box {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		margin-bottom: 10px;
		// 标题样式
		.tool-item-title {
			width: @tooltitleWidth;
			color: #727479;
			font-size: 20px;
			line-height: 40px;
			font-weight: 600;
		}
		.tool-item-title-middle {
			width: @tooltitleWidthMid;
		}
		.tool-item-title-long {
			width: @tooltitleWidthLong;
		}

		// 选择器样式
		.tool-item-select {
			width: calc(70% - @tooltitleWidth);
		}

		// 拖动条样式
		.tool-item-slider {
			width: calc(100% - @tooltitleWidth);
			position: relative;
			left: 12px;
		}
		.tool-item-slider-middle {
			width: calc(100% - @tooltitleWidthMid);
		}
		.tool-item-slider-long {
			width: calc(100% - @tooltitleWidthLong);
		}

		// 输入样式
		.tool-item-input {
			width: calc(70% - @tooltitleWidth);
			position: relative;
			left: 12px;
		}
		.tool-item-input-long {
			width: calc(130% - @tooltitleWidthLong);
		}
	}
}

// 实时数据盒子公共样式
@infotitleWidth: 170px;
.info-box {
	margin-top: 50px;
	padding: 20px 0 10px 0;
	.info-item-box {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
		font-size: 18px;
		line-height: 20px;
		.info-item-title {
			width: @infotitleWidth;
			color: #727479;
			text-align: right;
		}
		.info-item-num {
			width: calc(100% - @infotitleWidth);
			text-indent: 20px;
		}
	}
	.info-item-box:nth-child(1) {
		margin-top: 10px;
	}
}
</style>
