<template>
	<div id="model-container" class="model-box"></div>
</template>

<script>
import * as THREE from 'three/build/three.module.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
export default {
	name: 'modelIndex',
	data() {
		return {};
	},
	mounted() {
		this.modelInit();
	},
	methods: {
		modelInit() {
			let camera, scene, renderer, stats;

			const clock = new THREE.Clock();

			let mixer;

			init();
			animate();

			function init() {
				// 模型加载的容器
				const container = document.getElementById('model-container');

				camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
				camera.position.set(100, 200, 300);

				scene = new THREE.Scene();
				scene.background = new THREE.Color(0xa0a0a0);
				scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);
				
				// 创建半球光源用于模拟真实环境
				const ambientLight = new THREE.AmbientLight(0x0c0c0c);
				scene.add(ambientLight); 
				
				// 设置平行光赖添加模型阴影
				const dirLight = new THREE.DirectionalLight(0xffffff);
				dirLight.position.set(0, 200, 100);
				dirLight.castShadow = true;
				dirLight.shadow.camera.top = 180;
				dirLight.shadow.camera.bottom = -100;
				dirLight.shadow.camera.left = -120;
				dirLight.shadow.camera.right = 120;
				scene.add(dirLight);

				// 添加光线辅助线
				// scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

				// ground
				const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
				mesh.rotation.x = -Math.PI / 2;
				mesh.receiveShadow = true;
				scene.add(mesh);

				const grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
				grid.material.opacity = 0.2;
				grid.material.transparent = true;
				scene.add(grid);

				// model
				const loader = new FBXLoader();
				loader.load('models/ceshi.fbx', function(object) {
					mixer = new THREE.AnimationMixer(object);
					
					console.log(object.children[0].geometry.morphAttributes)
					console.log(object.children[0].morphTargetInfluences[0])
					object.children[0].morphTargetInfluences[0] = 0 // 前升
					object.children[0].morphTargetInfluences[1] = 1 // 张嘴
					object.children[0].morphTargetInfluences[2] = 0.9 // 抬头
					
					// const action = mixer.clipAction(object.animations[0]);
					// action.play();

					object.traverse(function(child) {
						if (child.isMesh) {
							child.castShadow = true;
							child.receiveShadow = true;
						}
					});

					scene.add(object);
				});

				renderer = new THREE.WebGLRenderer({ antialias: true });
				renderer.setPixelRatio(window.devicePixelRatio);
				renderer.setSize(window.innerWidth, window.innerHeight);
				renderer.shadowMap.enabled = true;
				container.appendChild(renderer.domElement);

				const controls = new OrbitControls(camera, renderer.domElement);
				controls.target.set(0, -50, 0);
				controls.update();

				window.addEventListener('resize', onWindowResize);

				// stats
				stats = new Stats();
				container.appendChild(stats.dom);
			}

			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize(window.innerWidth, window.innerHeight);
			}

			//

			function animate() {
				requestAnimationFrame(animate);

				const delta = clock.getDelta();

				if (mixer) mixer.update(delta);

				renderer.render(scene, camera);

				stats.update();
			}
		}
	}
};
</script>

<style lang="less" scoped="scoped">
.model-box {
	width: 100%;
	height: 100%;
	// width: calc(~"100% - 2px");
	// height: calc(~"100% - 2px");
	// border: 1px solid red;
	.ban-user-select();
}
</style>
