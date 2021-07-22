<template>
	<view class="container">
		<view class="container-top">
			<nav-bar>
				<template #header>
					<view>
						<image src="../../static/img/to left.png" @click="back"></image>
					</view>
				</template>
				<template>
					<view>参数设定</view>
				</template>
			</nav-bar>
		</view>
		<template>
			<view class="container-center">
				<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">

					<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text"
						activeColor="#007aff"></uni-segmented-control>
					<view class="content">
						<view v-show="current === 0">
							<view class="block"></view>
							<view class="content-block0">
								<view class="content-block0-title">
									有效信号认定时长大于
								</view>
								<view class="content-block0-block">
									<view class="content-block0-input">
										<view class="content-block0-input-text">
											{{systemList.effectSignalTime}}
										</view>
									</view>
									<view class="content-block0-text">
										秒(默认2秒)
									</view>
								</view>
							</view>
							<view class="content-block0">
								<view class="content-block0-title">
									泵开启后冲水时间
								</view>
								<view class="content-block0-block">
									<view class="content-block0-input">
										<view class="content-block0-input-text">
											{{systemList.pumpFlushTime}}
										</view>
									</view>
									<view class="content-block0-text">
										秒
									</view>
								</view>
							</view>
							<view class="content-block0">
								<view class="content-block0-title">
									不同药剂加料之间的冲水时间
								</view>
								<view class="content-block0-block">
									<view class="content-block0-input">
										<view class="content-block0-input-text">
											{{systemList.reagentFlushTime}}
										</view>
									</view>
									<view class="content-block0-text">
										秒(默认2秒)
									</view>
								</view>
							</view>
							<view class="content-block0">
								<view class="content-block0-title">
									泵体最长执行时间
								</view>
								<view class="content-block0-block">
									<view class="content-block0-input">
										<view class="content-block0-input-text">
											{{systemList.pumpMaxTime}}
										</view>
									</view>
									<view class="content-block0-text">
										秒(超过时间关停)
									</view>
								</view>
							</view>
							<view class="content-block0">
								<view class="content-block0-title">
									气冲时间
								</view>
								<view class="content-block0-block">
									<view class="content-block0-input">
										<view class="content-block0-input-text">
											{{systemList.airFlushTime}}
										</view>
									</view>
									<view class="content-block0-text">
										秒
									</view>
								</view>
							</view>
							<view class="content-block0">
								<view class="content-block0-title">
									最终冲水时间
								</view>
								<view class="content-block0-block">
									<view class="content-block0-input">
										<view class="content-block0-input-text">
											{{systemList.finalFlushTime}}
										</view>
									</view>
									<view class="content-block0-text">
										秒
									</view>
								</view>
							</view>
							<view class="">

							</view>
						</view>
						<view v-show="current === 1">
							<view class="block"></view>
							<view class="content1">
								<view class="content1-block1-buttonS">
									<view class="content1-block1-button" v-for="(item,index) in textList" :key="index"
										:class="{ active: index === currentIndex }" @click="textClick(item,index)">
										{{item}}</view>
								</view>
								<view class="content1-block1-text"  v-show="!tableShow">洗衣机执行配方设定</view>
								<view class="content1-block1-input"  v-show="!tableShow">
									<template>
									   <uni-data-picker :localdata="newArr" @change="onchange" v-model="value"></uni-data-picker>
									</template>
								</view>
								<template>
									<view class="containerr" >
										<view class="d-table"  v-show="!tableShow">
											<view class="d-tr">
												<view class="d-th">洗衣龙</view>
												<view class="d-th">加药量设定(毫升)</view>
												<view class="d-th">{{eq}}</view>
												<view class="d-th">气冲时间(秒)</view>
												<view class="d-th">中间水冲时间(秒)</view>
												<view class="d-th">最终水冲时间(秒)</view>
											</view>
											<view class="d-tr">
												<view class="d-td">
													洗衣仓1
												</view>
												<view class="d-td">
													<view class="d-table" >
														<view class="d-tr" v-for="(itema,indexa) in res_names" :key="indexa"> 
															<view class="d-td border-bottom">{{itema}}</view>
														</view>
													</view>
												</view>
												<view class="d-td">
													<view class="d-table">
														<view class="d-tr" v-for="(itemb,indexb) in res_volume" :key="indexb">
															<view class="d-td border-bottom">{{itemb}}</view>
														</view>
													</view>
												</view>
												<view class="d-td" v-for="(item,index) in res_air" :key="index+4">
													{{item}}
												</view>
												<view class="d-td" v-for="(item,index) in res_water" :key="index+5">
													{{item}}
												</view>
												<view class="d-td" v-for="(item,index) in res_final" :key="index+6">
													{{item}}
												</view>
											</view>
											<view class="d-tr">
												<view class="d-td">
													洗衣仓2
												</view>
												<view class="d-td">
													<view class="d-table">
														<view class="d-tr" v-for="(itemc,indexc) in this.res_names_one" :key="indexc">
															<view class="d-td border-bottom">{{itemc}}</view>
														</view>
													</view>
												</view>
												<view class="d-td">
													<view class="d-table">
														<view class="d-tr" v-for="(itemd,indexd) in this.res_volume_one" :key="indexd">
															<view class="d-td border-bottom">{{itemd}}</view>
														</view>
													</view>
												</view>
												<view class="d-td" v-for="(item,index) in res_air_one" :key="index+7">
													{{item}}
												</view>
												<view class="d-td" v-for="(item,index) in res_water_one" :key="index+8">
													{{item}}
												</view>
												<view class="d-td" v-for="(item,index) in res_final_one" :key="index+9">
													{{item}}
												</view>
											</view>
											<view class="d-tr">
												<view class="d-td">
													洗衣仓3
												</view>
												<view class="d-td">
													<view class="d-table">
														<view class="d-tr" v-for="(iteme,indexe) in res_names_two" :key="indexe">
															<view class="d-td border-bottom">{{iteme}}</view>
														</view>
														
													</view>
												</view>
												<view class="d-td">
													<view class="d-table">
														<view class="d-tr" v-for="(itemf,indexf) in res_volume_two" :key="indexf">
															<view class="d-td border-bottom">{{itemf}}</view>
														</view>
													</view>
												</view>
												<view class="d-td" v-for="(item,index) in res_air_two" :key="index+10">
													{{item}}
												</view>
												<view class="d-td" v-for="(item,index) in res_water_two" :key="index+11">
													{{item}}
												</view>
												<view class="d-td" v-for="(item,index) in res_final_two" :key="index+12">
													{{item}}
												</view>
											</view>
											<view class="d-tr">
												<view class="d-td">
													洗衣仓4
												</view>
												<view class="d-td">
													<view class="d-table">
														<view class="d-tr" v-for="(itemg,index) in res_names_three" :key="index">
															<view class="d-td border-bottom">{{itemg}}</view>
														</view>
													</view>
												</view>
												<view class="d-td">
													<view class="d-table">
														<view class="d-tr" v-for="(itemh,index) in res_volume_three" :key="index">
															<view class="d-td border-bottom">{{itemh}}</view>
														</view>
													</view>
												</view>
												<view class="d-td" v-for="(item,index) in res_air_three" :key="index+1">
													{{item}}
												</view>
												<view class="d-td" v-for="(item,index) in res_water_three" :key="index+2">
													{{item}}
												</view>
												<view class="d-td" v-for="(item,index) in res_final_three" :key="index+3">
													{{item}}
												</view>
											</view>
										</view>
									</view>
								</template>		
									<view class="content1-table" v-show="tableShow">
										<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
										<view class="d-table d-table-a">
											<view class="d-tr">
												<view class="d-th">洗衣龙</view>
												<view class="d-th">加药量设定(毫升)</view>
												<view class="d-th" v-for="(item,index) in peifangName" :key="index">[{{item}}]</view>
												<view class="d-th">气冲时间(秒)</view>
												<view class="d-th">中间水冲时间(秒)</view>
												<view class="d-th">最终水冲时间(秒)</view>
											</view>
											<view class="d-tr">
												<view class="d-td">
													洗衣仓1
												</view>
												<view class="d-td" v-for="i in 16" :key="i">
													<view class="d-table" >
														<view class="d-tr" v-for="(item1,index1) in oneArr" :key ="index1+1"> 
															<view class="d-td border-bottom">{{item1[i-1]}}</view>														</view>
														<view class="d-tr" v-for="(item2,index2) in twoArr" :key ="index2+2">
															<view class="d-td border-bottom">{{item2[i-1]}}</view>
														</view>
														<view class="d-tr" v-for="(item3,index3) in threeArr" :key ="index3+3">
															<view class="d-td border-bottom">{{item3[i-1]}}</view>
														</view>
													</view>
												</view>
												<view class="d-td" v-for="(item,index) in res_air" :key="index+111">
													{{item}}
												</view>
												<view class="d-td" v-for="(item,index) in res_water" :key="index+22">
													{{item}}
												</view>
												<view class="d-td" v-for="(item,index) in res_final" :key="index+33">
													{{item}}
												 </view>
												</view>
											<view class="d-tr">
												<view class="d-td">
													洗衣仓2
												</view>
												<view class="d-td" v-for="i in 16" :key="i">
													<view class="d-table" >
														<view class="d-tr" v-for="(item1,index) in fourArr" :key ="index+4"> 
															<view class="d-td border-bottom">{{item1[i-1]}}</view>														</view>
														<view class="d-tr" v-for="(item2,index) in fiveArr" :key ="index+5">
															<view class="d-td border-bottom">{{item2[i-1]}}</view>
														</view>
														<view class="d-tr" v-for="(item3,index) in sixArr" :key ="index+6">
															<view class="d-td border-bottom">{{item3[i-1]}}</view>
														</view>
													</view>
												</view>
												<view class="d-td" v-for="(item,index) in res_air_one" :key="index+44">
													{{item}}
												</view>
												<view class="d-td" v-for="(item,index) in res_water_one" :key="index+55">
													{{item}}
												</view>
												<view class="d-td" v-for="(item,index) in res_final_one" :key="index+66">
													{{item}}
												</view>
											</view>
											<view class="d-tr">
												<view class="d-td">
													洗衣仓3
												</view>
												<view class="d-td" v-for="i in 16" :key="i">
													<view class="d-table" >
														<view class="d-tr" v-for="(item1,index7) in sevenArr" :key ="index7+7"> 
															<view class="d-td border-bottom">{{item1[i-1]}}</view>														</view>
														<view class="d-tr" v-for="(item2,index8) in eightArr" :key ="index8+8">
															<view class="d-td border-bottom">{{item2[i-1]}}</view>
														</view>
													</view>
												</view>
											
												<view class="d-td" v-for="(item,index) in res_air_two" :key="index+77">
													{{item}}
												</view>
												<view class="d-td" v-for="(item,index) in res_water_two" :key="index+88">
													{{item}}
												</view>
												<view class="d-td" v-for="(item,index) in res_final_two" :key="index+99">
													{{item}}
												</view>
											</view>
											<view class="d-tr">
												<view class="d-td">
													洗衣仓4
												</view>
												<view class="d-td" v-for="i in 16" :key="i">
													<view class="d-table" >
														<view class="d-tr" v-for="(item1,index9) in nineArr" :key ="index9+9"> 
															<view class="d-td border-bottom">{{item1[i-1]}}</view>														</view>
														<view class="d-tr" v-for="(item2,index10) in tenArr" :key ="index10+10">
															<view class="d-td border-bottom">{{item2[i-1]}}</view>
														</view>
													</view>
												</view>
											
												<view class="d-td" v-for="(item,index) in res_air_three" :key="index+1010">
													{{item}}
												</view>
												<view class="d-td" v-for="(item,index) in res_water_three" :key="index+1111">
													{{item}}
												</view>
												<view class="d-td" v-for="(item,index) in res_final_three" :key="index+1212">
													{{item}}
												</view>
											</view> 
										</view>	
										</scroll-view>
									</view>
							</view>
						</view>
						<view v-show="current === 2">
							<view class="block"></view>
							<view class="content-block0">
								<view class="content-block0-title">
									药剂名称1
								</view>
								<view class="content-block0-block">
									<view class="content-block0-input">
										<view class="content-block0-input-text">
											{{PriceList.medicament_1_price}}
										</view>
									</view>
									<view class="content-block0-text">
										RMB/Liter
									</view>
								</view>
							</view>
							<view class="content-block0">
								<view class="content-block0-title">
									药剂名称2
								</view>
								<view class="content-block0-block">
									<view class="content-block0-input">
										<view class="content-block0-input-text">
											{{PriceList.medicament_2_price}}
										</view>
									</view>
									<view class="content-block0-text">
										RMB/Liter
									</view>
								</view>
							</view>
							<view class="content-block0">
								<view class="content-block0-title">
									药剂名称3
								</view>
								<view class="content-block0-block">
									<view class="content-block0-input">
										<view class="content-block0-input-text">
											{{PriceList.medicament_3_price}}
										</view>
									</view>
									<view class="content-block0-text">
										RMB/Liter
									</view>
								</view>
							</view>
							<view class="content-block0">
								<view class="content-block0-title">
									药剂名称4
								</view>
								<view class="content-block0-block">
									<view class="content-block0-input">
										<view class="content-block0-input-text">
											{{PriceList.medicament_4_price}}
										</view>
									</view>
									<view class="content-block0-text">
										RMB/Liter
									</view>
								</view>
							</view>
							<view class="content-block0">
								<view class="content-block0-title">
									药剂名称5
								</view>
								<view class="content-block0-block">
									<view class="content-block0-input">
										<view class="content-block0-input-text">
											{{PriceList.medicament_5_price}}
										</view>
									</view>
									<view class="content-block0-text">
										RMB/Liter
									</view>
								</view>
							</view>
							<view class="content-block0">
								<view class="content-block0-title">
									药剂名称6
								</view>
								<view class="content-block0-block">
									<view class="content-block0-input">
										<view class="content-block0-input-text">
											{{PriceList.medicament_6_price}}
										</view>
									</view>
									<view class="content-block0-text">
										RMB/Liter
									</view>
								</view>
							</view>
							<view class="content-block0">
								<view class="content-block0-title">
									药剂名称7
								</view>
								<view class="content-block0-block">
									<view class="content-block0-input">
										<view class="content-block0-input-text">
											{{PriceList.medicament_7_price}}
										</view>
									</view>
									<view class="content-block0-text">
										RMB/Liter
									</view>
								</view>
							</view>
							<view class="content-block0">
								<view class="content-block0-title">
									药剂名称8
								</view>
								<view class="content-block0-block">
									<view class="content-block0-input">
										<view class="content-block0-input-text">
											{{PriceList.medicament_8_price}}
										</view>
									</view>
									<view class="content-block0-text">
										RMB/Liter
									</view>
								</view>
							</view>
							<view class="content-block0">
								<view class="content-block0-title">
									药剂名称9
								</view>
								<view class="content-block0-block">
									<view class="content-block0-input">
										<view class="content-block0-input-text">
											{{PriceList.medicament_9_price}}
										</view>
									</view>
									<view class="content-block0-text">
										RMB/Liter
									</view>
								</view>
							</view>
							<view class="content-block0">
								<view class="content-block0-title">
									药剂名称10
								</view>
								<view class="content-block0-block">
									<view class="content-block0-input">
										<view class="content-block0-input-text">
											{{PriceList.medicament_10_price}}
										</view>
									</view>
									<view class="content-block0-text">
										RMB/Liter
									</view>
								</view>
							</view>
						</view>
						<view v-show="current === 3">
							<view class="block"></view>
							<view class="content-block4">
								<view class="content-block4-top">
									<view class="content-block4-top1">毫升</view>
									<view class="content-block4-top2">秒</view>
									<view class="content-block4-top3">修正值</view>
								</view>
								<view class="content-block4-center">
									<view class="content-block4-center-title">
										药剂名称1
									</view>
									<view class="content-block4-center-input">
										<view>{{pumbList.medicament_1_capacity}}</view>
									</view>
									<view>
										/
									</view>
									<view class="content-block4-center-input">
										<view>{{pumbList.medicament_1_time}}</view>
									</view>
									<view class="content-block4-center-input">
										<view>{{pumbList.medicament_1_correction}}</view>
									</view>
								</view>
								<view class="content-block4-center">
									<view class="content-block4-center-title">
										药剂名称2
									</view>
									<view class="content-block4-center-input">
										<view>{{pumbList.medicament_2_capacity}}</view>
									</view>
									<view>
										/
									</view>
									<view class="content-block4-center-input">
										<view>{{pumbList.medicament_2_time}}</view>
									</view>
									<view class="content-block4-center-input">
										<view>{{pumbList.medicament_2_correction}}</view>
									</view>
								</view>
								<view class="content-block4-center">
									<view class="content-block4-center-title">
										药剂名称3
									</view>
									<view class="content-block4-center-input">
										<view>{{pumbList.medicament_3_capacity}}</view>
									</view>
									<view>
										/
									</view>
									<view class="content-block4-center-input">
										<view>{{pumbList.medicament_3_time}}</view>
									</view>
									<view class="content-block4-center-input">
										<view>{{pumbList.medicament_3_correction}}</view>
									</view>
								</view>
								<view class="content-block4-center">
									<view class="content-block4-center-title">
										药剂名称4
									</view>
									<view class="content-block4-center-input">
										<view>{{pumbList.medicament_4_capacity}}</view>
									</view>
									<view>
										/
									</view>
									<view class="content-block4-center-input">
										<view>{{pumbList.medicament_4_time}}</view>
									</view>
									<view class="content-block4-center-input">
										<view>{{pumbList.medicament_4_correction}}</view>
									</view>
								</view>
								<view class="content-block4-center">
									<view class="content-block4-center-title">
										药剂名称5
									</view>
									<view class="content-block4-center-input">
										<view>{{pumbList.medicament_5_capacity}}</view>
									</view>
									<view>
										/
									</view>
									<view class="content-block4-center-input">
										<view>{{pumbList.medicament_5_time}}</view>
									</view>
									<view class="content-block4-center-input">
										<view>{{pumbList.medicament_5_correction}}</view>
									</view>
								</view>
								<view class="content-block4-center">
									<view class="content-block4-center-title">
										药剂名称6
									</view>
									<view class="content-block4-center-input">
										<view>{{pumbList.medicament_6_capacity}}</view>
									</view>
									<view>
										/
									</view>
									<view class="content-block4-center-input">
										<view>{{pumbList.medicament_6_time}}</view>
									</view>
									<view class="content-block4-center-input">
										<view>{{pumbList.medicament_6_correction}}</view>
									</view>
								</view>
								<view class="content-block4-center">
									<view class="content-block4-center-title">
										药剂名称7
									</view>
									<view class="content-block4-center-input">
										<view>{{pumbList.medicament_7_capacity}}</view>
									</view>
									<view>
										/
									</view>
									<view class="content-block4-center-input">
										<view>{{pumbList.medicament_7_time}}</view>
									</view>
									<view class="content-block4-center-input">
										<view>{{pumbList.medicament_7_correction}}</view>
									</view>
								</view>
								<view class="content-block4-center">
									<view class="content-block4-center-title">
										药剂名称8
									</view>
									<view class="content-block4-center-input">
										<view>{{pumbList.medicament_8_capacity}}</view>
									</view>
									<view>
										/
									</view>
									<view class="content-block4-center-input">
										<view>{{pumbList.medicament_8_time}}</view>
									</view>
									<view class="content-block4-center-input">
										<view>{{pumbList.medicament_8_correction}}</view>
									</view>
								</view>
								<view class="content-block4-center">
									<view class="content-block4-center-title">
										药剂名称9
									</view>
									<view class="content-block4-center-input">
										<view>{{pumbList.medicament_9_capacity}}</view>
									</view>
									<view>
										/
									</view>
									<view class="content-block4-center-input">
										<view>{{pumbList.medicament_9_time}}</view>
									</view>
									<view class="content-block4-center-input">
										<view>{{pumbList.medicament_9_correction}}</view>
									</view>
								</view>
								<view class="content-block4-center">
									<view class="content-block4-center-title">
										药剂名称10
									</view>
									<view class="content-block4-center-input">
										<view>{{pumbList.medicament_10_capacity}}</view>
									</view>
									<view>
										/
									</view>
									<view class="content-block4-center-input">
										<view>{{pumbList.medicament_10_time}}</view>
									</view>
									<view class="content-block4-center-input">
										<view>{{pumbList.medicament_10_correction}}</view>
									</view>
								</view>
							</view>
						</view>
						<view v-show="current === 4">
							<view class="block"></view>
							<view class="content-block5">
								<view class="content-block0-text1">
									药剂1
								</view>
								<view class="content-block5-input">
									<view>{{feedList.medicamentName_1}}</view>
								</view>
								<view class="content-block5-input">
									<view>{{feedList.medicamentTime_1}}</view>
								</view>
								<view class="content-block0-text1">
									秒
								</view>
							</view>
							<view class="content-block5">
								<view class="content-block0-text1">
									药剂2
								</view>
								<view class="content-block5-input">
									<view>{{feedList.medicamentName_2}}</view>
								</view>
								<view class="content-block5-input">
									<view>{{feedList.medicamentTime_2}}</view>
								</view>
								<view class="content-block0-text1">
									秒
								</view>
							</view>
							<view class="content-block5">
								<view class="content-block0-text1">
									药剂3
								</view>
								<view class="content-block5-input">
									<view>{{feedList.medicamentName_3}}</view>
								</view>
								<view class="content-block5-input">
									<view>{{feedList.medicamentTime_3}}</view>
								</view>
								<view class="content-block0-text1">
									秒
								</view>
							</view>
							<view class="content-block5">
								<view class="content-block0-text1">
									药剂4
								</view>
								<view class="content-block5-input">
									<view>{{feedList.medicamentName_4}}</view>
								</view>
								<view class="content-block5-input">
									<view>{{feedList.medicamentTime_4}}</view>
								</view>
								<view class="content-block0-text1">
									秒
								</view>
							</view>
							<view class="content-block5">
								<view class="content-block0-text1">
									药剂5
								</view>
								<view class="content-block5-input">
									<view>{{feedList.medicamentName_5}}</view>
								</view>
								<view class="content-block5-input">
									<view>{{feedList.medicamentTime_5}}</view>
								</view>
								<view class="content-block0-text1">
									秒
								</view>
							</view>
							<view class="content-block5">
								<view class="content-block0-text1">
									药剂6
								</view>
								<view class="content-block5-input">
									<view>{{feedList.medicamentName_6}}</view>
								</view>
								<view class="content-block5-input">
									<view>{{feedList.medicamentTime_6}}</view>
								</view>
								<view class="content-block0-text1">
									秒
								</view>
							</view>
							<view class="content-block5">
								<view class="content-block0-text1">
									药剂7
								</view>
								<view class="content-block5-input">
									<view>{{feedList.medicamentName_7}}</view>
								</view>
								<view class="content-block5-input">
									<view>{{feedList.medicamentTime_7}}</view>
								</view>
								<view class="content-block0-text1">
									秒
								</view>
							</view>
							<view class="content-block5">
								<view class="content-block0-text1">
									药剂8
								</view>
								<view class="content-block5-input">
									<view>{{feedList.medicamentName_8}}</view>
								</view>
								<view class="content-block5-input">
									<view>{{feedList.medicamentTime_8}}</view>
								</view>
								<view class="content-block0-text1">
									秒
								</view>
							</view>
							<view class="content-block5">
								<view class="content-block0-text1">
									药剂9
								</view>
								<view class="content-block5-input">
									<view>{{feedList.medicamentName_9}}</view>
								</view>
								<view class="content-block5-input">
									<view>{{feedList.medicamentTime_9}}</view>
								</view>
								<view class="content-block0-text1">
									秒
								</view>
							</view>
							<view class="content-block5">
								<view class="content-block0-text1">
									药剂10
								</view>
								<view class="content-block5-input">
									<view>{{feedList.medicamentName_10}}</view>
								</view>
								<view class="content-block5-input">
									<view>{{feedList.medicamentTime_10}}</view>
								</view>
								<view class="content-block0-text1">
									秒
								</view>
							</view>

						</view>
						<view v-show="current === 5">
							<view class="block"></view>
							<view class="content-block4-top">
								<view class="content-block4-top1">A</view>
								<view class="content-block4-top2"></view>
								<view class="content-block4-top3">B</view>
							</view>
							<view class="content-block5">
								<view class="content-block0-text2">
									药剂名称1
								</view>
								<view class="content-block5-input">
									<view>{{reagentList.medicament_1_A}}</view>
								</view>
								<view>×</view>
								<view>+</view>
								<view class="content-block5-input">
									<view>{{reagentList.medicament_1_B}}</view>
								</view>
							</view>
							<view class="content-block5">
								<view class="content-block0-text2">
									药剂名称2
								</view>
								<view class="content-block5-input">
									<view>{{reagentList.medicament_2_A}}</view>
								</view>
								<view>×</view>
								<view>+</view>
								<view class="content-block5-input">
									<view>{{reagentList.medicament_2_B}}</view>
								</view>
							</view>
							<view class="content-block5">
								<view class="content-block0-text2">
									药剂名称3
								</view>
								<view class="content-block5-input">
									<view>{{reagentList.medicament_3_A}}</view>
								</view>
								<view>×</view>
								<view>+</view>
								<view class="content-block5-input">
									<view>{{reagentList.medicament_3_B}}</view>
								</view>
							</view>
							<view class="content-block5">
								<view class="content-block0-text2">
									药剂名称4
								</view>
								<view class="content-block5-input">
									<view>{{reagentList.medicament_4_A}}</view>
								</view>
								<view>×</view>
								<view>+</view>
								<view class="content-block5-input">
									<view>{{reagentList.medicament_4_B}}</view>
								</view>
							</view>
							<view class="content-block5">
								<view class="content-block0-text2">
									药剂名称5
								</view>
								<view class="content-block5-input">
									<view>{{reagentList.medicament_5_A}}</view>
								</view>
								<view>×</view>
								<view>+</view>
								<view class="content-block5-input">
									<view>{{reagentList.medicament_5_B}}</view>
								</view>
							</view>
							<view class="content-block5">
								<view class="content-block0-text2">
									药剂名称6
								</view>
								<view class="content-block5-input">
									<view>{{reagentList.medicament_6_A}}</view>
								</view>
								<view>×</view>
								<view>+</view>
								<view class="content-block5-input">
									<view>{{reagentList.medicament_6_B}}</view>
								</view>
							</view>
							<view class="content-block5">
								<view class="content-block0-text2">
									药剂名称7
								</view>
								<view class="content-block5-input">
									<view>{{reagentList.medicament_7_A}}</view>
								</view>
								<view>×</view>
								<view>+</view>
								<view class="content-block5-input">
									<view>{{reagentList.medicament_7_B}}</view>
								</view>
							</view>
							<view class="content-block5">
								<view class="content-block0-text2">
									药剂名称8
								</view>
								<view class="content-block5-input">
									<view>{{reagentList.medicament_8_A}}</view>
								</view>
								<view>×</view>
								<view>+</view>
								<view class="content-block5-input">
									<view>{{reagentList.medicament_8_B}}</view>
								</view>
							</view>
							<view class="content-block5">
								<view class="content-block0-text2">
									药剂名称9
								</view>
								<view class="content-block5-input">
									<view>{{reagentList.medicament_9_A}}</view>
								</view>
								<view>×</view>
								<view>+</view>
								<view class="content-block5-input">
									<view>{{reagentList.medicament_9_B}}</view>
								</view>
							</view>
							<view class="content-block5">
								<view class="content-block0-text2">
									药剂名称10
								</view>
								<view class="content-block5-input">
									<view>{{reagentList.medicament_10_A}}</view>
								</view>
								<view>×</view>
								<view>+</view>
								<view class="content-block5-input">
									<view>{{reagentList.medicament_10_B}}</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</template>
	</view>
</template>

<script>
	import NavBar from '../../components/NavBar.vue'

	export default {
		data() {
			return {
				textList: ['显示执行配方', '显示所有配方'],
				items: ['基本设定', '配方设定', '化料单价设定', '泵校准', '首次加料', '药剂系数修正', ],
				current: 0,
				colorIndex: 0,
				systemList: [],
				PriceList: [],
				pumbList: [],
				feedList: [],
				reagentList: [],
				formulationList: [],
				rinseList: [],
				currentIndex: 0,
				tableShow: false,
				recipelist:[],
				recipeChoose:[],
				newArr: [],
				eq:"",
				value:'',
				res_names:[],
				res_names_one:[],
				res_names_two:[],
				res_names_three:[],
				res_volume:[],
				res_volume_one:[],
				res_volume_two:[],
				res_volume_three:[],
				res_water:[],
				res_water_one:[],
				res_water_two:[],
				res_water_three:[],
				res_air:[],
				res_air_one:[],
				res_air_two:[],
				res_air_three:[],
				res_final:[],
				res_final_one:[],
				res_final_three:[],
				res_final_two:[],
				peifangName:["配方1名称","配方2名称","配方3名称","配方4名称","配方5名称","配方6名称","配方7名称","配方8名称","配方9名称","配方10名称","配方11名称","配方12名称","配方13名称","配方14名称","配方15名称"],
				oneArr:[],
				twoArr:[],
				threeArr:[],
				fourArr:[],
				fiveArr:[],
				sixArr:[],
				sevenArr:[],
				eightArr:[],
				nineArr:[],
				tenArr:[],
			}
		},
		components: {
			NavBar,
		},
		onLoad() {
			uni.setStorageSync("recipe","recipe_name_1");
			this.getSystem()
			this.getPrice()
			this.getPumb()
			this.getFeed()
			this.getReagent()
			this.getFormulation()
			this.getrinse()
			this.getRecipe()
			this.getRecipeChoose()
			// let a = "1230"
			// let b = "000111"
			//console.log(`${a}${b}`)
		},
		methods: {
			async getSystem() {
				var res = await this.$myRequest({
					url: '/v1/device/get-system',
					data: {
						token: this.$store.state.userInfo.token,
						sn: uni.getStorageSync('sn')
					}
				})
				//console.log(res)
				this.systemList = res.data.data
			},
			async getPrice() {
				var res = await this.$myRequest({
					url: '/v1/device/get-price',
					data: {
						token: this.$store.state.userInfo.token,
						sn: uni.getStorageSync('sn')
					}
				})
				//console.log(res)
				this.PriceList = res.data.data
			},
			async getPumb() {
				var res = await this.$myRequest({
					url: '/v1/device/get-pump-calibration',
					data: {
						token: this.$store.state.userInfo.token,
						sn: uni.getStorageSync('sn')
					}
				})
				//console.log(res)
				this.pumbList = res.data.data
			},
			async getFeed() {
				var res = await this.$myRequest({
					url: '/v1/device/get-first-feed',
					data: {
						token: this.$store.state.userInfo.token,
						sn: uni.getStorageSync('sn')
					}
				})
				//console.log(res)
				this.feedList = res.data.data
			},
			async getReagent() {
				var res = await this.$myRequest({
					url: '/v1/device/get-reagent',
					data: {
						token: this.$store.state.userInfo.token,
						sn: uni.getStorageSync('sn')
					}
				})
				//console.log(res)
				this.reagentList = res.data.data
			},
			async getFormulation() {
				var res = await this.$myRequest({
					url: '/v1/device/get-formulation',
					data: {
						token: this.$store.state.userInfo.token,
						sn: uni.getStorageSync('sn')
					}
				})
				console.log(res)
				this.formulationList = res.data.data
				var arr = []
				let itemKey = 0
				for (let k in this.formulationList) { 
					itemKey++
				}
				//console.log(itemKey),this.formulationList的长度
				let index = 0;
				for (let i = 0; i < itemKey; i += 16) {
					arr[index] = {}
					arr[index]["medicamentName_"+(index+1)] = this.formulationList["medicamentName_"+(index+1)]
					for (let j = 1; j < 16; j ++) {
						arr[index]["medicamentName_"+(index+1)+"_volume_"+j] = this.formulationList["medicamentName_"+(index+1)+"_volume_"+j]
					}
					index++;
				}
				console.log(arr)
				this.firstArr = arr.slice(0,1)
				let b = []
				for(var i = 0;i<this.firstArr.length;i++){
					b.push(Object.values(this.firstArr[i]))
				}
				this.oneArr = b
				this.firstArr = arr.slice(1,2)
				let a = []
				for(var i = 0;i<this.firstArr.length;i++){
					a.push(Object.values(this.firstArr[i]))
				}
				this.twoArr = a
				this.firstArr = arr.slice(2,3)
				let c = []
				for(var i = 0;i<this.firstArr.length;i++){
					c.push(Object.values(this.firstArr[i]))
				}
				this.threeArr = c
				this.firstArr = arr.slice(3,4)
				let d = []
				for(var i = 0;i<this.firstArr.length;i++){
					d.push(Object.values(this.firstArr[i]))
				}
				this.fourArr = d
				this.firstArr = arr.slice(4,5)
				let e = []
				for(var i = 0;i<this.firstArr.length;i++){
					e.push(Object.values(this.firstArr[i]))
				}
				this.fiveArr = e
				this.firstArr = arr.slice(5,6)
				let f = []
				for(var i = 0;i<this.firstArr.length;i++){
					f.push(Object.values(this.firstArr[i]))
				}
				this.sixArr = f
				this.firstArr = arr.slice(6,7)
				let g = []
				for(var i = 0;i<this.firstArr.length;i++){
					g.push(Object.values(this.firstArr[i]))
				}
				this.sevenArr = g
				this.firstArr = arr.slice(7,8)
				let h = []
				for(var i = 0;i<this.firstArr.length;i++){
					h.push(Object.values(this.firstArr[i]))
				}
				this.eightArr = h
				this.firstArr = arr.slice(8,9)
				let l = []
				for(var i = 0;i<this.firstArr.length;i++){
					l.push(Object.values(this.firstArr[i]))
				}
				this.nineArr = l
				this.firstArr = arr.slice(9,10)
				let j = []
				for(var i = 0;i<this.firstArr.length;i++){
					j.push(Object.values(this.firstArr[i]))
				}
				this.tenArr = j
				uni.hideLoading()
			},
			async getrinse() {
				var res = await this.$myRequest({
					url: '/v1/device/get-rinse',
					data: {
						token: this.$store.state.userInfo.token,
						sn: uni.getStorageSync('sn')
					}
				})
				//console.log(res)
				this.rinseList = res.data.data
			},
			async getRecipe() {
				var res = await this.$myRequest({
					url: '/v1/device/recipe-list',
					data: {
						token: this.$store.state.userInfo.token,
						sn: uni.getStorageSync('sn')
					}
				})
				//console.log(res)
				this.recipelist = res.data.data
				var arr = []
				for (let k in this.recipelist) { 
					// console.log(k)
					// console.log(this.recipelist[k])
					arr.push({
						value:k,
						text:this.recipelist[k],
						
					})
				}
				// console.log(arr)
				 this.newArr = arr
				// let index = 0;
				// for (let i = 0; i < itemKey; i += 4) {
				// 	arr[index] = {}
				// 	index++;
				// }
				// console.log(arr)
				
			},
			async getRecipeChoose() {
				uni.showLoading({
					title: '加载中'
				});
				var res = await this.$myRequest({
					url: '/v1/device/recipe-choose',
					data: {
						token: this.$store.state.userInfo.token,
						sn: uni.getStorageSync('sn'),
						recipe:uni.getStorageSync('recipe')
					}
				})
				// console.log(res)
				this.recipeChoose = res.data.data
				//console.log(this.recipeChoose);
				 this.res_names=	res.data.data.names.slice(0,3)
				 this.res_names_one= res.data.data.names.slice(3,6)
				 this.res_names_two= res.data.data.names.slice(6,8)
				 this.res_names_three= res.data.data.names.slice(8,10)
				 this.res_volume=	res.data.data.volume.slice(0,3)
				 this.res_volume_one= res.data.data.volume.slice(3,6)
				 this.res_volume_two= res.data.data.volume.slice(6,8)
				 this.res_volume_three= res.data.data.volume.slice(8,10)
				 this.res_water=	res.data.data.water.slice(0,1)
				 this.res_water_one= res.data.data.water.slice(1,2)
				 this.res_water_two= res.data.data.water.slice(2,3)
				 this.res_water_three= res.data.data.water.slice(3,4)
				 this.res_air=	res.data.data.water.slice(0,1)
				 this.res_air_one= res.data.data.water.slice(1,2)
				 this.res_air_two= res.data.data.water.slice(2,3)
				 this.res_air_three= res.data.data.water.slice(3,4)
				 this.res_final=	res.data.data.final.slice(0,1)
				 this.res_final_one= res.data.data.final.slice(1,2)
				 this.res_final_two= res.data.data.final.slice(2,3)
				 this.res_final_three= res.data.data.final.slice(3,4)
				uni.hideLoading()
			},
			back() {
				uni.redirectTo({
					url: "/pages/equipment/Eqmanage",
				})
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			scroll: function(e) {

			},
			textClick(item, index) {
				uni.showLoading({
					title: '加载中'
				});
				this.currentIndex = index
				switch (item) {
					case '显示所有配方':
						this.tableShow = true
						break;
					case '显示执行配方':
						this.tableShow = false
						break;
				}
				uni.hideLoading()
			},
			onchange(e) {
				this.eq =  e.detail.value[0].text
				console.log(e.detail.value[0].value)
				uni.setStorageSync("recipe",e.detail.value[0].value);
				recipe:uni.getStorageSync('recipe')
				this.getRecipeChoose()
		      },
		}
	}
</script>

<style scoped lang="scss">
	.containerr{
		margin-top: 60rpx;
		padding: 10rpx;
	}
	.container {
		height: 100rpx;
	}

	.container-top {
		margin-top: 100rpx;
		font-family: Arial;
	}

	.container-top image {
		width: 65rpx;
		height: 65rpx;
		margin-top: 18rpx;
	}

	.segmented-control {
		width: 100%;
		overflow-x: auto;
	}

	.content-block0 {
		margin-left: 48rpx;
	}

	.content-block0-title {
		height: 40rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: SourceHanSansSC-regular;
		margin-top: 40rpx;
	}

	.content-block0-input {
		left: 40rpx;
		top: 348rpx;
		width: 456rpx;
		height: 64rpx;
		line-height: 34rpx;
		border-radius: 4rpx;
		background-color: rgba(242, 242, 242, 100);
		color: rgba(16, 16, 16, 100);
		font-size: 24rpx;
		text-align: left;
		font-family: Arial;
		border: 2rpx solid rgba(187, 187, 187, 100);
		display: flex;
		align-items: center;
	}

	.content-block0-input-text {
		margin-left: 40rpx;
	}
	.select{
		margin: 20rpx 0 0 40rpx;
		height: 50rpx;
		width: 300rpx;
	}
	.content-block0-text {
		width: 200rpx;
		height: 40rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: SourceHanSansSC-regular;
	}

	.content-block0-block {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-top: 10rpx;
	}

	.content1-block1-buttonS {
		margin-top: 40rpx;
		display: flex;
		align-items: center;
	}

	.content1-block1-text {
		margin-top: 48rpx;
		margin-left: 40rpx;
	}
	.content1-block1-input{
		margin-left: 35rpx;
		margin-right: 40rpx;
		margin-top: 20rpx;
	}
	.content1-block1-button {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 250rpx;
		height: 62rpx;
		line-height: 40rpx;
		background-color: rgba(227, 227, 227, 100);
		color: rgba(134, 134, 134, 100);
		font-size: 28rpx;
		text-align: center;
		font-family: Arial;
		margin-left: 90rpx;
	}

	.active {
		background-color: rgba(0, 128, 193, 100);
		color: rgba(255, 255, 255, 100);
	}

	.content1-table {
		margin-top: 40rpx;
	}
	.d-table-a{
		width: 2800rpx;
	}
	.content-block4-top {
		display: flex;
		justify-content: space-around;
		margin-top: 40rpx;
	}

	.content-block4-top1 {
		margin-left: 180rpx;
	}

	.content-block4-center {
		margin-top: 40rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.content-block4-center-input {
		display: flex;
		align-items: center;
		justify-content: center;
		left: 218rpx;
		top: 378rpx;
		width: 140rpx;
		height: 64rpx;
		line-height: 34rpx;
		border-radius: 4rpx;
		background-color: rgba(242, 242, 242, 100);
		color: rgba(16, 16, 16, 100);
		font-size: 24rpx;
		text-align: left;
		box-shadow: 0rpx 4rpx 20rpx 0rpx rgba(0, 0, 0, 0.07);
		font-family: Arial;
		border: 2rpx solid rgba(187, 187, 187, 100);
	}

	.content-block5 {
		display: flex;
		justify-content: space-around;
		margin-top: 40rpx;
		align-items: center;
	}

	.content-block5-input {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 206rpx;
		height: 64rpx;
		line-height: 34rpx;
		border-radius: 4rpx;
		background-color: rgba(242, 242, 242, 100);
		color: rgba(16, 16, 16, 100);
		font-size: 24rpx;
		text-align: center;
		box-shadow: 0rpx 4rpx 20rpx 0rpx rgba(0, 0, 0, 0.07);
		font-family: Arial;
		border: 2rpx solid rgba(187, 187, 187, 100);
	}

	.content-block6-input {
		display: flex;
		align-items: center;
		width: 614rpx;
		height: 64rpx;
		line-height: 34rpx;
		border-radius: 4rpx;
		background-color: rgba(242, 242, 242, 100);
		color: rgba(16, 16, 16, 100);
		font-size: 24rpx;
		text-align: left;
		box-shadow: 0px 4rpx 20rpx 0px rgba(0, 0, 0, 0.07);
		font-family: Arial;
		border: 2rpx solid rgba(187, 187, 187, 100);
	}

	.block {
		border: 2rpx solid rgba(187, 187, 187, 100);
	}

	.content-block0-text1 {
		width: 90rpx;
		height: 40rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: SourceHanSansSC-regular;
		margin-top: 40rpx;
	}

	.content-block0-text2 {
		width: 150rpx;
		height: 40rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: SourceHanSansSC-regular;
	}

</style>
