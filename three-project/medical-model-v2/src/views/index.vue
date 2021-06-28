<template>
	<div class="model-box">
		<div id="model-container" class="three-box"></div>
		<div class="test-box">
			<div class="tool-box">
				<div class="tool-item-box" style="justify-content: flex-start;">
					<span class="tool-item-title">查看声门：</span>
					<el-button @click="checkGlottis()">{{ checkGlottisText }}</el-button>
				</div>
				<div v-show="isCheckGlottis">
					<div class="tool-item-box">
						<span class="tool-item-title">气管透明：</span>
						<el-slider class="tool-item-slider" v-model="checkOpacityValue[0]" :min="0" :max="1" :step="0.01" @change="setCheckOpacityValA()"></el-slider>
					</div>
					<div class="tool-item-box">
						<span class="tool-item-title">舌头透明：</span>
						<el-slider class="tool-item-slider" v-model="checkOpacityValue[1]" :min="0" :max="1" :step="0.01" @change="setCheckOpacityValB()"></el-slider>
					</div>
					<div class="tool-item-box">
						<span class="tool-item-title">舌骨透明：</span>
						<el-slider class="tool-item-slider" v-model="checkOpacityValue[2]" :min="0" :max="1" :step="0.01" @change="setCheckOpacityValC()"></el-slider>
					</div>
					<div class="tool-item-box">
						<span class="tool-item-title">喉结透明：</span>
						<el-slider class="tool-item-slider" v-model="checkOpacityValue[3]" :min="0" :max="1" :step="0.01" @change="setCheckOpacityValD()"></el-slider>
					</div>
				</div>
				<!-- <div class="tool-item-box" style="justify-content: flex-start;">
					<span class="tool-item-title">测试工具：</span>
					<el-button @click="test">测试</el-button>
				</div> -->
			</div>
			<div class="info-box">
				<el-card class="info-box-card" shadow="hover">
					<div slot="header" class="info-box-title">实时数据演算结果</div>
					<div class="info-item-box">
						<span class="info-item-title">张口角度：</span>
						<span class="info-item-num">{{ (mouseAngle.num * 30).toFixed(0) }}°</span>
					</div>
					<div class="info-item-box">
						<span class="info-item-title">下巴长度：</span>
						<span class="info-item-num">{{ (45 + (chinShift.num / 3) * 15).toFixed(0) }}mm</span>
					</div>
					<div class="info-item-box">
						<span class="info-item-title">仰头角度：</span>
						<span class="info-item-num">{{ ((headAngle.num / 1) * 40 - 5).toFixed(0) }}°</span>
					</div>
					<!-- <div class="info-item-box">
						<span class="info-item-title">甲颏距离：</span>
						<span class="info-item-num">0mm</span>
						<span class="info-item-num">( 后台实时计算 )</span>
					</div>
					<div class="info-item-box">
						<span class="info-item-title">喉结位移距离：</span>
						<span class="info-item-num">0mm</span>
						<span class="info-item-num">( 后台实时计算 )</span>
					</div>
					<div class="info-item-box">
						<span class="info-item-title">颞颌关节位移距离：</span>
						<span class="info-item-num">0mm</span>
						<span class="info-item-num">( 后台实时计算 )</span>
					</div>
					<div class="info-item-box">
						<span class="info-item-title">舌体厚度：</span>
						<span class="info-item-num">0mm</span>
						<span class="info-item-num">( 后台实时计算 )</span>
					</div>
					<div class="info-item-box">
						<span class="info-item-title">声门视野：</span>
						<span class="info-item-num">0cm</span>
						<span class="info-item-num">( 后台实时计算 )</span>
					</div> -->
				</el-card>
			</div>
		</div>
		<div
			class="panel-box"
			v-loading="isCheckGlottis"
			element-loading-text="正在查看声门，禁止调整参数"
			element-loading-spinner="el-icon-lock"
			:element-loading-background="loadingBgc"
		>
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
					<el-input class="tool-item-input tool-item-input-long" v-model="throatShift" :clearable="true" placeholder="请输入喉结位移常数"></el-input>
				</div>
				<div class="tool-item-box">
					<!-- 颞颌关节活动度常数项：15，常数b：b=1 -->
					<span class="tool-item-title tool-item-title-long">颞颌关节活动度常数：</span>
					<el-input class="tool-item-input tool-item-input-long" v-model="jointShiftA" :clearable="true" placeholder="请输入颞颌关节活动常数"></el-input>
				</div>
				<div class="tool-item-box">
					<!-- 颞颌关节张口度常数项：18，常数b：b=3 -->
					<span class="tool-item-title tool-item-title-long">颞颌关节张口度常数：</span>
					<el-input class="tool-item-input tool-item-input-long" v-model="jointShiftB" :clearable="true" placeholder="请输入颞颌关节活动常数"></el-input>
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
					></el-slider>
				</div>
				<div class="tool-item-box">
					<!-- 舌体厚度常数项：10，系数b：b=15 -->
					<span class="tool-item-title tool-item-title-long">舌体厚度常数：</span>
					<el-input class="tool-item-input tool-item-input-long" v-model="tongueThicknessConstant" :clearable="true" placeholder="请输入舌体厚度常数"></el-input>
				</div>
				<div class="tool-item-box">
					<!-- 舌厚度缺失下舌体厚度常数项：20，系数b：b=100 -->
					<span class="tool-item-title tool-item-title-long">舌体厚度缺失下常数：</span>
					<el-input class="tool-item-input tool-item-input-long" v-model="tongueConstantA" :clearable="true" placeholder="请输入舌体厚度缺失下常数"></el-input>
				</div>
				<div class="tool-item-box">
					<!-- 舌颏缺失下舌体厚度常数项：20，系数b：b=140 -->
					<span class="tool-item-title tool-item-title-long">舌颏距离缺失下常数：</span>
					<el-input class="tool-item-input tool-item-input-long" v-model="tongueConstantB" :clearable="true" placeholder="请输入舌颏距离缺失下常数"></el-input>
				</div>
				<div class="tool-item-box">提示：使用透明度设置后，部分模型必须旋转一定角度才可以透视</div>
				<div class="tool-item-box">
					<span class="tool-item-title">人体透明：</span>
					<el-slider class="tool-item-slider" v-model="opacityValue" :min="0" :max="1" :step="0.01" show-input @change="setOpacityVal()"></el-slider>
				</div>
				<!-- <div class="tool-item-box">
					<span class="tool-item-title">气管透明：</span>
					<el-slider class="tool-item-slider" v-model="throatOpacityValue" :min="0" :max="1" :step="0.01" show-input @change="setThroatOpacityVal()"></el-slider>
				</div> -->
				<div class="tool-item-box">
					<span class="tool-item-title">颈椎透明：</span>
					<el-slider class="tool-item-slider" v-model="vertebraeOpacityValue" :min="0" :max="1" :step="0.01" show-input @change="setVertebraeOpacityVal()"></el-slider>
				</div>
				<div class="tool-item-box">
					<span class="tool-item-title">喉结透明：</span>
					<el-slider class="tool-item-slider" v-model="adamOpacityValue" :min="0" :max="1" :step="0.01" show-input @change="setAdamOpacityVal()"></el-slider>
				</div>
				<div class="tool-item-box tool-item-btnbox">
					<el-button :type="isShowHuman ? 'primary' : 'info'" class="tool-item-btn" @click="visHuman()">{{ isShowHumanText }}</el-button>
					<!-- <el-button :type="isShowThroat ? 'primary' : 'info'" class="tool-item-btn" @click="visThroat()">{{ isShowThroatText }}</el-button> -->
					<el-button :type="isShowVertebrae ? 'primary' : 'info'" class="tool-item-btn" @click="visVertebrae()">{{ isShowVertebraeText }}</el-button>
					<el-button :type="isShowAdam ? 'primary' : 'info'" class="tool-item-btn" @click="visAdam()">{{ isShowAdamText }}</el-button>
				</div>
			</div>
		</div>
		<div class="fx67ll-footer">
			Designed & Powered by
			<a href="https://fx67ll.com" target="_blank">fx67ll</a>
			&#12288; Copyright© 2018-{{ this.year }}&#12288;
			<a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">皖ICP备18017174号-2</a>
		</div>
	</div>
</template>

<script>
import * as THREE from 'three/build/three.module.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

import _ from 'underscore';
import moment from 'moment';
export default {
	name: 'modelIndex',
	data() {
		return {
			// footer
			year: moment().format('YYYY'),
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
			// 加载的模型地址
			modelUrl: 'models/Human-004.fbx',
			// FBX模型对象编组
			// 替换模型后，用`getModelGroup()`方法根据模型序列编组
			// 还需要修改下方：setMouseAngle()方法、setChinShift()方法、setHeadAngle()方法、checkGlottis()方法 的相关可以变形的模型下标，需要自己用`test()`方法尝试
			fbxGroupKeys: {
				// 模组01，张口分组，用于显示隐藏分组
				a: {
					keys: [7, 6, 8, 11, 18],
					isShow: true
				},
				// 模组02，下巴前伸分组，用于显示隐藏分组
				b: {
					keys: [0, 10, 3, 9, 16],
					isShow: true
				},
				// 模组03，仰头分组，用于显示隐藏分组
				c: {
					keys: [2, 13, 1, 14, 15],
					isShow: true
				},
				// 模组04，声门演示模组，包含一个喉结
				d: {
					keys: [4, 5, 12, 17, 19],
					isShow: true
				},
				// 人体外壳编组，用于透明度修改
				human: {
					keys: [7, 9, 13]
				},
				// 喉咙编组，用于透明度修改
				throat: {
					keys: [6, 2, 3]
				},
				// 颈椎编组，用于透明度修改
				vertebrae: {
					keys: [0, 1, 10, 11, 8, 14]
				},
				// 喉结编组，用于透明度修改
				adam: {
					keys: [15, 16, 18]
				},
				// 查看声门透明度编组，目前用的是shange和喉结
				check: {
					keys: [12, 19]
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
				isoff: true
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
				stepnum: 0.1
			},
			// 舌体厚度常数
			tongueThicknessConstant: 10,
			// 舌体厚度缺失下常数
			tongueConstantA: 20,
			// 舌颏距离缺失下常数
			tongueConstantB: 20,
			// 人体透明
			opacityValue: 0.3,
			// 气管透明
			throatOpacityValue: 1,
			// 颈椎透明
			vertebraeOpacityValue: 1,
			// 喉结透明
			adamOpacityValue: 1,
			// 是否显示人体
			isShowHuman: true,
			// 是否显示人体提示文字
			isShowHumanText: '隐藏人体',
			// 是否显示气管
			isShowThroat: true,
			// 是否显示气管提示文字
			isShowThroatText: '隐藏气管',
			// 是否显示颈椎
			isShowVertebrae: true,
			// 是否显示颈椎提示文字
			isShowVertebraeText: '隐藏颈椎',
			// 是否显示喉结
			isShowAdam: true,
			// 是否显示喉结提示文字
			isShowAdamText: '隐藏喉结',
			// 是否正在查看声门
			isCheckGlottis: false,
			// 查看声门按钮文字
			checkGlottisText: '点击开始查看声门',
			// 禁止面板背景色
			loadingBgc: 'rgba(0,0,0,0.5)',
			// 查看声门后各种透明度参数，顺序是气管，舌头，舌骨，喉结
			checkOpacityValue: [0.5, 1, 1, 1],
			// 模型是否加载完成
			modelLoading: false,
			// 模型加载进度提示
			modelLoadingText: '0%'
		};
	},
	mounted() {
		this.modelInit();
	},
	methods: {
		// 测试用例
		test() {
			// 打印模型下标与名称
			this.getModelGroup();
			// 测试模型参数
			// this.showModel(0, false);
			// this.showModel(4, true);
			// _.each(this.getEachItem(this.fbxGroupKeys.d.keys), function(item, key) {
			// 	console.log(key, item.name, item.material);
			// });
			// console.log(this.getEachItem(this.fbxGroupKeys.d.keys).length);
			// console.log(this.getEachItem(this.fbxGroupKeys.d.keys)[2].material);
		},
		getModelGroup() {
			// 查看模型序列，待会写一个方法截取结尾01、02、03、04以及没有结尾的自动分abcd多组
			_.each(this.fbxGroup.children, function(item, key) {
				// console.log(key, item.name);
			});
		},
		// 查看声门气管透明度调节
		setCheckOpacityValA() {
			this.showModel(0, false);
			this.showModel(4, true);
			this.getEachItem(this.fbxGroupKeys.check.keys)[0].material[0].transparent = true;
			this.getEachItem(this.fbxGroupKeys.check.keys)[0].material[0].opacity = this.checkOpacityValue[0];
			this.getEachItem(this.fbxGroupKeys.check.keys)[0].material[1].transparent = true;
			this.getEachItem(this.fbxGroupKeys.check.keys)[0].material[1].opacity = this.checkOpacityValue[0];
			this.getEachItem(this.fbxGroupKeys.check.keys)[0].material[2].transparent = true;
			this.getEachItem(this.fbxGroupKeys.check.keys)[0].material[2].opacity = this.checkOpacityValue[0];
		},
		// 查看声门舌头透明度调节
		setCheckOpacityValB() {
			this.showModel(0, false);
			this.showModel(4, true);
			this.getEachItem(this.fbxGroupKeys.check.keys)[0].material[3].transparent = true;
			this.getEachItem(this.fbxGroupKeys.check.keys)[0].material[3].opacity = this.checkOpacityValue[1];
		},
		// 查看声门舌骨透明度调节
		setCheckOpacityValC() {
			this.showModel(0, false);
			this.showModel(4, true);
			this.getEachItem(this.fbxGroupKeys.check.keys)[0].material[4].transparent = true;
			this.getEachItem(this.fbxGroupKeys.check.keys)[0].material[4].opacity = this.checkOpacityValue[2];
		},
		// 查看声门喉结透明度调节
		setCheckOpacityValD() {
			this.showModel(0, false);
			this.showModel(4, true);
			this.getEachItem(this.fbxGroupKeys.check.keys)[1].material.transparent = true;
			this.getEachItem(this.fbxGroupKeys.check.keys)[1].material.opacity = this.checkOpacityValue[3];
		},
		// 查看声门
		checkGlottis() {
			this.isCheckGlottis = !this.isCheckGlottis;
			if (this.isCheckGlottis) {
				this.showModel(0, false);
				this.showModel(4, true);
				this.checkGlottisText = '退出声门查看';
				this.getEachItem(this.fbxGroupKeys.check.keys)[0].visible = false;
				this.setCheckOpacityValA();
			} else {
				this.showModel(0, false);
				this.showModel(3, true);
				this.setHeadAngle();
				this.checkGlottisText = '点击开始查看声门';
				this.getEachItem(this.fbxGroupKeys.check.keys)[0].visible = true;
				this.checkOpacityValue = [0.5, 1, 1, 1];
			}
		},
		// 修改人体透明度
		setOpacityVal() {
			var self = this;
			_.each(this.getEachItem(this.fbxGroupKeys.human.keys), function(item, key) {
				item.material.transparent = true;
				item.material.opacity = self.opacityValue;
			});
		},
		// 修改气管透明度
		setThroatOpacityVal() {
			var self = this;
			_.each(this.getEachItem(this.fbxGroupKeys.throat.keys), function(item, key) {
				_.each(item.material, function(obj, index) {
					obj.transparent = true;
					obj.opacity = self.throatOpacityValue;
				});
			});
		},
		// 修改颈椎透明度
		setVertebraeOpacityVal() {
			var self = this;
			_.each(this.getEachItem(this.fbxGroupKeys.vertebrae.keys), function(item, key) {
				item.material.transparent = true;
				item.material.opacity = self.vertebraeOpacityValue;
			});
		},
		// 修改喉结透明度
		setAdamOpacityVal() {
			var self = this;
			_.each(this.getEachItem(this.fbxGroupKeys.adam.keys), function(item, key) {
				item.material.transparent = true;
				item.material.opacity = self.adamOpacityValue;
			});
		},
		// 修改人体显隐
		visHuman() {
			var self = this;
			this.isShowHuman = !this.isShowHuman;
			if (!this.isShowHuman) {
				this.isShowHumanText = '显示人体';
			} else {
				this.isShowHumanText = '隐藏人体';
			}
			_.each(this.getEachItem(this.fbxGroupKeys.human.keys), function(item, key) {
				item.visible = self.isShowHuman;
			});
		},
		// 修改气管显隐
		visThroat() {
			var self = this;
			this.isShowThroat = !this.isShowThroat;
			if (!this.isShowThroat) {
				this.isShowThroatText = '显示气管';
			} else {
				this.isShowThroatText = '隐藏气管';
			}
			_.each(this.getEachItem(this.fbxGroupKeys.throat.keys), function(item, key) {
				_.each(item.material, function(obj, index) {
					obj.visible = self.isShowThroat;
				});
			});
		},
		// 修改颈椎显隐
		visVertebrae() {
			var self = this;
			this.isShowVertebrae = !this.isShowVertebrae;
			if (!this.isShowVertebrae) {
				this.isShowVertebraeText = '显示颈椎';
			} else {
				this.isShowVertebraeText = '隐藏颈椎';
			}
			_.each(this.getEachItem(this.fbxGroupKeys.vertebrae.keys), function(item, key) {
				item.visible = self.isShowVertebrae;
			});
		},
		// 修改喉结显隐
		visAdam() {
			var self = this;
			this.isShowAdam = !this.isShowAdam;
			if (!this.isShowAdam) {
				this.isShowAdamText = '显示喉结';
			} else {
				this.isShowAdamText = '隐藏喉结';
			}
			_.each(this.getEachItem(this.fbxGroupKeys.adam.keys), function(item, key) {
				item.visible = self.isShowAdam;
			});
		},
		// 修改张口角度
		setMouseAngle() {
			this.isCheckGlottis = false;
			this.showModel(0, false);
			this.showModel(1, true);
			this.getEachItem(this.fbxGroupKeys.a.keys)[0].morphTargetInfluences[0] = this.mouseAngle.num;
			this.getEachItem(this.fbxGroupKeys.a.keys)[1].morphTargetInfluences[0] = this.mouseAngle.num;
		},
		// 修改下巴前伸
		setChinShift() {
			this.isCheckGlottis = false;
			this.showModel(0, false);
			this.showModel(2, true);
			this.getEachItem(this.fbxGroupKeys.b.keys)[1].morphTargetInfluences[0] = this.chinShift.num;
			this.getEachItem(this.fbxGroupKeys.b.keys)[2].morphTargetInfluences[0] = this.chinShift.num;
		},
		// 修改头部仰头动作
		setHeadAngle() {
			this.isCheckGlottis = false;
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
						num: 0.75,
						minnum: 0.75,
						maxnum: 1,
						stepnum: 0.0025,
						isoff: false
					};
					break;

				case 2:
					self.headAngle = {
						num: 0.5,
						minnum: 0.5,
						maxnum: 0.75,
						stepnum: 0.0025,
						isoff: false
					};
					break;

				case 3:
					self.headAngle = {
						num: 0.25,
						minnum: 0.25,
						maxnum: 0.5,
						stepnum: 0.0025,
						isoff: false
					};
					break;

				case 4:
					self.headAngle = {
						num: 0,
						minnum: 0,
						maxnum: 0.25,
						stepnum: 0.0025,
						shownum: -5,
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

			// 设置相机对象初始参数
			self.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
			self.camera.position.set(-20, 30, 150);

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
			
			// 开始加载模型
			this.modelLoading = true;
			// 使用FBXLoader加载模型
			self.fbxloader.load(
				self.modelUrl,
				function(object) {
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
					object.position.x = -12;
					object.position.y = 10;

					// 场景对象中添加FBX模型对象
					self.scene.add(object);

					// 添加fbx模型对象群组，并完成各类初始化
					self.fbxGroup = self.scene.children[4];

					// 全部显示
					self.initVisible();

					// 设置初始化透明度
					self.setOpacityVal();

					// 默认显示第一个张口角度的模型
					self.showModel(0, false);
					self.showModel(1, true);

					// 测试方法，仅在开发中使用
					// self.test();
				},
				function(xhr) {
					// console.log('加载完成的百分比' + (xhr.loaded / xhr.total) * 100 + '%');
					self.modelLoadingText = (xhr.loaded / xhr.total) * 100 + '%';
					if((xhr.loaded / xhr.total) * 100 + '%' === '100%'){
						self.modelLoading = false;
					}
				}
			);

			self.renderer = new THREE.WebGLRenderer({ antialias: true });
			self.renderer.setPixelRatio(window.devicePixelRatio);
			self.renderer.setSize(window.innerWidth, window.innerHeight);
			self.renderer.shadowMap.enabled = true;
			container.appendChild(self.renderer.domElement);

			const controls = new OrbitControls(self.camera, self.renderer.domElement);
			controls.target.set(0, 0, 0);
			controls.update();

			window.addEventListener('resize', self.onWindowResize);

			// 监测模块引入
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
@import '@a/styles/index.less';
</style>
