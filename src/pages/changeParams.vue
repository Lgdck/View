<template>
	<div class="container">
		<div class="top">
			<div class="top-child">
				<div class="text">
					<el-input v-model="num1" placeholder="Please input" clearable />
				</div>
				<div class="btn">
					<el-button type="primary" round @click="increase1('+')">增加</el-button>
					<el-button type="warning" round @click="increase1('-')">减少</el-button>
				</div>
			</div>
			<div class="top-child">
				<div class="text">
					<el-input v-model="num2" placeholder="Please input" clearable />
				</div>
				<div class="btn">
					<el-button type="primary" round @click="increase2('*')">增加</el-button>
					<el-button type="warning" round @click="increase2('/')">减少</el-button>
				</div>
			</div>
			<div class="top-child">
				<div class="text">
					<el-input v-model="num3" placeholder="Please input" clearable />
				</div>
				<div class="btn">
					<el-button type="primary" round @click="increase3('+')">增加</el-button>
					<el-button type="warning" round @click="increase3('-')">减少</el-button>
				</div>
			</div>
		</div>
		<div class="bottom">
			<el-button type="primary" plain @click="changeBtnText">{{text}}</el-button>
		</div>
	</div>
</template>

<script>
import instance from "../network";
export default {
	name:'wangkun',
	data(){
		return{
			num1: 1000,
			num2: 64,
			num3: 1000,
			text: '开始',
			click_count : 1
		}
	},
	methods:{
		// 改变提交按钮
		async changeBtnText(){
			this.click_count += 1
			if (this.click_count % 2 == 0){
				this.text = '关闭'
				await instance.post("/send/opt",{
					"packet" : {
							"message" : "OPEN"
						},
					"command" : "abc"
				}).then((res) => {
					console.log(res.data)
				})
			}else{
				await instance.post("/send/opt",{
					"packet" : {
							"message" : "OPEN"
						},
					"command" : "SHUTDOWN"
				}).then((res) => {
					console.log(res.data)
				}).catch((err) => {
					console.log(err)
				})
				this.text = '开始'
			}
		},
		// 改变第一个参数
		increase1(symbol){
			if (symbol == '+'){
				if (this.num1 >=0 && this.num1 < 100){
					this.num1 += 10
				}else{
					this.num1 += 100
				}
			}else{
				if (this.num1 > 100){
					this.num1 -= 100
				}else{
					if (this.num1 - 10 < 0){
						this.num1 = 0
					}else[
						this.num1 -= 10
					]
				}
			}
			instance.post("/send/socket" , {
				packet:{
					"frequenceend" : String(this.num1),
					"size" : String(this.num2),
					"frequencesyn" : String(this.num3),
				}
			}).then((res) => {
				console.log(res.data)
			}).catch((err) => {
					console.log(err)
			})

		},
		// 改变第二个参数
		increase2(symbol){
			if (symbol == '*'){
				if (this.num2 * 2 <= 4096){
					this.num2 *= 2
				}else{
					this.num2 = 4096
				}
			}else{
				if (this.num2 / 2 >= 8){
					this.num2 /= 2
				}else{
					this.num2 = 8
				}
			}
			instance.post("/send/socket" , {
				packet:{
					"frequenceend" : String(this.num1),
					"size" : String(this.num2),
					"frequencesyn" : String(this.num3),
				}
			}).then((res) => {
				console.log(res.data)
			}).catch((err) => {
					console.log(err)
			})
		},
		// 改变第三个参数
		increase3(symbol){
			if (symbol == '+'){
				this.num3 += 100
			}else{
				if (this.num3 - 100 < 0){
					this.num3 = 0
				}else{
					this.num3 -= 100
				}
			}
			instance.post("/send/socket" , {
				packet:{
					"frequenceend" : String(this.num1),
					"size" : String(this.num2),
					"frequencesyn" : String(this.num3),

				}
			}).then((res) => {
				console.log(res.data)
			}).catch((err) => {
					console.log(err)
			})
		},
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
		display: flex;
	}
	.btn{
		display: flex;
		flex-direction: column;
	}
	.btn > el-button{
		width: 30%;

	}
	.bottom{
		width: 100%;
		height: 50%;
		background-color: black;
		display: flex;
		justify-content: center;
		align-items: center;
	}

</style>>

