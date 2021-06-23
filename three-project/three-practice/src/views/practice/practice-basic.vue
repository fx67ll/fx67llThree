<template>
	<div id="three-box" class="fx67ll-box"></div>
</template>

<script>
import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
export default {
	name: 'fx67llIndex',
	data() {
		return {};
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			var scene = new THREE.Scene();
			var sphereGeometry = new THREE.SphereGeometry(60, 40, 40);
			var material = new THREE.MeshLambertMaterial({
				color: 0x0000ff
			});
			var mesh = new THREE.Mesh(sphereGeometry, material);
			scene.add(mesh);

			var point = new THREE.PointLight(0x0000ff);
			point.position.set(400, 200, 300);
			scene.add(point);
			var ombient = new THREE.AmbientLight(0x444444);
			scene.add(ombient);

			var width = window.innerWidth;
			var height = window.innerHeight;
			var k = width / height;
			var s = 200;
			var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
			camera.position.set(200, 200, 200);
			camera.lookAt(scene.position);

			var renderer = new THREE.WebGLRenderer();
			renderer.setSize(width, height);
			renderer.setClearColor(0xb9d3ff, 1);
			const container = document.getElementById('three-box');
			container.appendChild(renderer.domElement);
			
			var axisHelper = new THREE.AxisHelper(200);
			scene.add(axisHelper);

			function render() {
				renderer.render(scene, camera);
			}
			render();
			
			var controls = new OrbitControls(camera, renderer.domElement);
			controls.addEventListener('change', render);
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
