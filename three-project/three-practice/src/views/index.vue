<template>
	<div class="fx67ll-box">
		<div class="fx67ll-title">Threejs代码实战练习</div>
		<router-link class="fx67ll-link" tag="div" to="/note/one">Note One</router-link>
		<router-link class="fx67ll-link" tag="div" to="/practice/basic">Practice Basic</router-link>
	</div>
</template>

<script>
export default {
	name: 'fx67llIndex',
	data() {
		return {};
	},
	methods: {}
};
</script>

<style lang="less" scoped="scoped">
.fx67ll-box {
	width: 100%;
	height: 100%;
	.ban-user-select();
	padding: 20px;
	.fx67ll-title{
		font-size: 24px;
	}
	.fx67ll-link{
		padding: 10px 0 0 0;
		color: @red;
	}
	.fx67ll-link:hover{
		color: @green;
	}
}
</style>
