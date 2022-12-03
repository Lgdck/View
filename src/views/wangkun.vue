<template>
	<div class="container">
		<div class="top">
			<div class="top-child">
				<el-input v-model="input" placeholder="Please input" clearable />
			</div>
			<div class="top-child">
				
			</div>
			<div class="top-child">
				
			</div>
		</div>
		<div class="bottom">

		</div>
	</div>
</template>

<script>
export default {
	name:'wangkun',
	data(){
		return{
			num1:1000, 
		}
	}
	
};
</script>

<style scoped>
	.container{
		width: 100%;
		height: 100%;
		background-color: aqua;
	}
	.top{
		width: 100%;
		height: 50%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: aqua;
	}
	.top-child{
		width: 25%;
		height: 50%;
		background-color: black;
	}
	.bottom{
		width: 100%;
		height: 50%;
		background-color: black;
	}
</style>>

