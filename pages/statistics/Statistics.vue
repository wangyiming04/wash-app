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
					<view>统计报告</view>
				</template>
			</nav-bar>
		</view>
		<template>
			<view class="container-center">
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text"
					activeColor="#007aff"></uni-segmented-control>
				<view class="content">
					<view v-show="current === 0">
						<view class="content-block"></view>
						<view class="content-picker">
							<uni-data-picker v-model="eq" :localdata="newTypeList" @change="onchange"
								placeholder="设备种类">
							</uni-data-picker>
							<uni-data-picker v-model="eq1" :localdata="newNameList" @change="onchangeName"
								placeholder="设备名称">
							</uni-data-picker>
						</view>
						<view class="content-picker">
							<uni-data-picker v-model="eq2" :localdata="newModelList" @change="onchangeModel"
								placeholder="设备型号">
							</uni-data-picker>
							<uni-data-picker v-model="eq3" :localdata="snList" @change="onchangeSn"
								placeholder="设备序列号">
							</uni-data-picker>
						</view>
						<view class="content-footer">
							<view class="content-footer-date" v-for="(item, index) in dates" :key="index"
								:class="{ active: index === currentIndex }" @click="titleClick(item,index)">
								{{item}}
							</view>
							<view class="example-body">
								<uni-datetime-picker v-model="range" type="daterange" start="2021-3-20" end="2022-5-20"
									rangeSeparator="至" @change="chooseMap" class="tianzheng" />
							</view>
						</view>
						<view class="content-block1"></view>
						<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
							<view class="charts-box">
								<qiun-data-charts type="column" :chartData="chartData" :inScrollView="true" />
							</view>
						</scroll-view>
					</view>
					<view v-show="current === 1">
						<view class="content-picker">
							<uni-data-picker v-model="eq" :localdata="newTypeList" @change="onchange"
								placeholder="设备种类">
							</uni-data-picker>
							<uni-data-picker v-model="eq1" :localdata="newNameList" @change="onchangeName"
								placeholder="设备名称">
							</uni-data-picker>
						</view>
						<view class="content-picker">
							<uni-data-picker v-model="eq2" :localdata="newModelList" @change="onchangeModel"
								placeholder="设备型号">
							</uni-data-picker>
							<uni-data-picker v-model="eq3" :localdata="snList" @change="onchangeSn"
								placeholder="设备序列号">
							</uni-data-picker>
						</view>
						<view class="example-body">
							<uni-datetime-picker v-model="range" type="daterange" start="2021-3-20" end="2022-5-20"
								rangeSeparator="至" @change="timeChange" />
						</view>
						<uni-segmented-control :current="currentt" :values="itemms" @clickItem="onClickItemm"
							styleType="button" activeColor="#a6a6a6" class="control"></uni-segmented-control>
						<view class="content">
							<view v-show="currentt === 0">
								<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
										<view class="d-table d-0">
											<view class="d-thead">
												<view class="d-tr">
													<view class="d-th">化料编号</view>
													<view class="d-th">化料名称</view>
													<view class="d-th">总量(Liter)</view>
													<view class="d-th">单价RMB/liter</view>
													<view class="d-th">总价</view>
												</view>
											</view>
											<view class="d-tbody" v-for="(item,index) in costList" :key="index">
												<view class="d-tr">
													<view class="d-td">{{index}}</view>
													<view class="d-td">{{item.medicamentName}}</view>
													<view class="d-td">{{item.consume}}</view>
													<view class="d-td">{{item.price}}</view>
													<view class="d-td">{{item.total}}</view>
												</view>
											</view>
										</view>
								</scroll-view>
							</view>
							<view v-show="currentt === 1">
								<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
									<uni-table border stripe emptyText="暂无更多数据" class="table-1" align="center">
										<uni-tr>
											<uni-th align="center" style="border-bottom:none ;">化料编号</uni-th>
											<uni-th align="center" style="border-bottom:none ;">化料名称</uni-th>
											<uni-th align="right" style="border-right:none ;">洗衣龙仓1</uni-th>
											<uni-th align="center"></uni-th>
											<uni-th align="right" style="border-right:none ;">洗衣龙仓2</uni-th>
											<uni-th align="center"></uni-th>
											<uni-th align="right" style="border-right:none ;">洗衣龙仓3</uni-th>
											<uni-th align="center"></uni-th>
											<uni-th align="right" style="border-right:none ;">洗衣龙仓4</uni-th>
											<uni-th align="center"></uni-th>
											<uni-th align="center" style="border-bottom:none ;">总次数</uni-th>
											<uni-th align="center" style="border-bottom:none ;">总量(升)</uni-th>
										</uni-tr>

										<uni-tr>
											<uni-th align="center" style="border-top:none ;"></uni-th>
											<uni-th align="center" style="border-top:none ;"></uni-th>
											<uni-td align="center">次数</uni-td>
											<uni-td align="center">总量(升)</uni-td>
											<uni-td align="center">次数</uni-td>
											<uni-td align="center">总量(升)</uni-td>
											<uni-td align="center">次数</uni-td>
											<uni-td align="center">总量(升)</uni-td>
											<uni-td align="center">次数</uni-td>
											<uni-td align="center">总量(升)</uni-td>
											<uni-th align="center" style="border-top:none ;"></uni-th>
											<uni-th align="center" style="border-top:none ;"></uni-th>
										</uni-tr>
										<uni-tr v-for="(item1,index1) in chemicalsList" :key="index1">
											<uni-td align="center">{{index1}}</uni-td>
											<uni-td align="center">{{item1.medicamentName}}</uni-td>
											<uni-td align="center">{{item1[1].count}}</uni-td>
											<uni-td align="center">{{item1[1].consume_channel}}</uni-td>
											<uni-td align="center">{{item1[2].count}}</uni-td>
											<uni-td align="center">{{item1[2].consume_channel}}</uni-td>
											<uni-td align="center">{{item1[3].count}}</uni-td>
											<uni-td align="center">{{item1[3].consume_channel}}</uni-td>
											<uni-td align="center">{{item1[4].count}}</uni-td>
											<uni-td align="center">{{item1[4].consume_channel}}</uni-td>
											<uni-td align="center">{{item1.line_count}}</uni-td>
											<uni-td align="center">{{item1.consume_channel}}</uni-td>
										</uni-tr>
									</uni-table>
								</scroll-view>
							</view>
							<view v-show="currentt === 2">
								<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
									<view class="d-table d-2" v-for="(item2,index2) in formulaList" :key="index2">
										<view class="d-tr">
											<view class="d-td">
												<view class="d-table">
													<view class="d-tr">
														<view class="d-td">
															配方{{index2}}
														</view>
														<view class="d-td border-left"  style="width:85%">
															{{item2.recipe_name}}
														</view>
													</view>
												</view>
											</view>
										</view>
										<view class="d-tr">
											<view class="d-td">
												<view class="d-table">
													<view class="d-tr">
														<view class="d-td">
															已执行次数
														</view>
														<view class="d-td border-left"  style="width:85%">
															{{item2.recipe_run_times}}
														</view>
													</view>
												</view>
											</view>
										</view>
										<view class="d-tr">
											<view class="d-td">
												<view class="d-table">
													<view class="d-tr">
														<view class="d-td border-left" style="width:14.8%">
															洗衣龙
														</view>
														<view class="d-td border-left" style="width:25.56%">
															洗衣龙仓1
														</view>
														<view class="d-td border-left" style="width:25.56%">
															洗衣龙仓2
														</view>
														<view class="d-td border-left" style="width:17.04%">
															洗衣龙仓3
														</view>
														<view class="d-td border-left" style="width:17.04%">
															洗衣龙仓4
														</view>
													</view>
												</view>
											</view>
										</view>
										<view class="d-tr">
											<view class="d-td">
												<view class="d-table">
													<view class="d-tr">
														<view class="d-td" style="width:14.8%">化料名称</view>
														<view class="d-td border-left">{{item2.medicamentName_1}}</view>
														<view class="d-td border-left">{{item2.medicamentName_2}}</view>
														<view class="d-td border-left">{{item2.medicamentName_3}}</view>
														<view class="d-td border-left">{{item2.medicamentName_4}}</view>
														<view class="d-td border-left">{{item2.medicamentName_5}}</view>
														<view class="d-td border-left">{{item2.medicamentName_6}}</view>
														<view class="d-td border-left">{{item2.medicamentName_7}}</view>
														<view class="d-td border-left">{{item2.medicamentName_8}}</view>
														<view class="d-td border-left">{{item2.medicamentName_9}}</view>
														<view class="d-td border-left">{{item2.medicamentName_10}}</view>
													</view>
												</view>
											</view>
										</view>
										<view class="d-tr">
											<view class="d-td">
												<view class="d-table">
													<view class="d-tr">
														<view class="d-td" style="width:14.8%" >加药量设定(毫升)</view>
														<view class="d-td border-left">{{item2.medicamentName_1_volume}}</view>
														<view class="d-td border-left">{{item2.medicamentName_2_volume}}</view>
														<view class="d-td border-left">{{item2.medicamentName_3_volume}}</view>
														<view class="d-td border-left">{{item2.medicamentName_4_volume}}</view>
														<view class="d-td border-left">{{item2.medicamentName_5_volume}}</view>
														<view class="d-td border-left">{{item2.medicamentName_6_volume}}</view>
														<view class="d-td border-left">{{item2.medicamentName_7_volume}}</view>
														<view class="d-td border-left">{{item2.medicamentName_8_volume}}</view>
														<view class="d-td border-left">{{item2.medicamentName_9_volume}}</view>
														<view class="d-td border-left">{{item2.medicamentName_10_volume}}</view>
													</view>
												</view>
											</view>
										</view>
										<view class="d-tr">
											<view class="d-td">
												<view class="d-table">
													<view class="d-tr">
														<view class="d-td" style="width:14.8%">加药次数</view>
														<view class="d-td border-left">{{item2.medicamentName_1_times}}</view>
															<view class="d-td border-left">{{item2.medicamentName_2_times}}</view>
																<view class="d-td border-left">{{item2.medicamentName_3_times}}</view>
																	<view class="d-td border-left">{{item2.medicamentName_4_times}}</view>
																		<view class="d-td border-left">{{item2.medicamentName_5_times}}</view>
														<view class="d-td border-left">{{item2.medicamentName_6_times}}</view>
														<view class="d-td border-left">{{item2.medicamentName_7_times}}</view>
														<view class="d-td border-left">{{item2.medicamentName_8_times}}</view>
														<view class="d-td border-left">{{item2.medicamentName_9_times}}</view>
														<view class="d-td border-left">{{item2.medicamentName_10_times}}</view>
													</view>
												</view>
											</view>
										</view>
										<view class="d-tr">
											<view class="d-td">
												<view class="d-table">
													<view class="d-tr">
														<view class="d-td" style="width:14.8%">加药总量(升)</view>
														<view class="d-td border-left">{{item2.medicamentName_1_total}}</view>
														<view class="d-td border-left">{{item2.medicamentName_2_total}}</view>
														<view class="d-td border-left">{{item2.medicamentName_3_total}}</view>
														<view class="d-td border-left">{{item2.medicamentName_4_total}}</view>
														<view class="d-td border-left">{{item2.medicamentName_5_total}}</view>
														<view class="d-td border-left">{{item2.medicamentName_6_total}}</view>
														<view class="d-td border-left">{{item2.medicamentName_7_total}}</view>
														<view class="d-td border-left">{{item2.medicamentName_8_total}}</view>
														<view class="d-td border-left">{{item2.medicamentName_9_total}}</view>
														<view class="d-td border-left">{{item2.medicamentName_10_total}}</view>
													</view>
												</view>
											</view>
										</view>
									</view>
								</scroll-view>
							</view>
							<view v-show="currentt === 3">
								<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
									<uni-table border stripe emptyText="暂无更多数据" class="table-3">
										<uni-tr>
											<uni-th align="center">报警信息种类</uni-th>
											<uni-th align="center">洗衣龙仓1</uni-th>
											<uni-th align="center">洗衣龙仓2</uni-th>
											<uni-th align="center">洗衣龙仓3</uni-th>
											<uni-th align="center">洗衣龙仓4</uni-th>
										</uni-tr>
										<uni-tr>
											<uni-td align="center">信号时间过长</uni-td>
											<uni-td align="center">{{firstWarnList[1]}}</uni-td>
											<uni-td align="center">{{firstWarnList[2]}}</uni-td>
											<uni-td align="center">{{firstWarnList[3]}}</uni-td>
											<uni-td align="center">{{firstWarnList[4]}}</uni-td>
										</uni-tr>
										<uni-tr>
											<uni-td align="center">信号时间过短</uni-td>
											<uni-td align="center">{{secondWarnList[1]}}</uni-td>
											<uni-td align="center">{{secondWarnList[2]}}</uni-td>
											<uni-td align="center"> {{secondWarnList[3]}}</uni-td>
											<uni-td align="center">{{secondWarnList[4]}}</uni-td>
										</uni-tr>
										<uni-tr>
											<uni-td align="center">信号间断过短</uni-td>
											<uni-td align="center">{{thirdWarnList[1]}}</uni-td>
											<uni-td align="center">{{thirdWarnList[2]}}</uni-td>
											<uni-td align="center"> {{thirdWarnList[3]}}</uni-td>
											<uni-td align="center">{{thirdWarnList[4]}}</uni-td>
										</uni-tr>
									</uni-table>
								</scroll-view>
							</view>
							<view v-show="currentt === 4">
								<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
									<view class="containerr">
										<view class="d-table d-4">
											<view class="d-tr">
												<view class="d-td border-bottom tiaozheng border-top">
													配方
												</view>
												<view class="d-td border-bottom tiaozheng border-top">
													数量
												</view>
												<view class="d-td tiaozheng4 border-top clear">
													<view class="d-table">
														<view class="d-tr">
															<view class="d-td border-bottom">通道</view>
														</view>
														<view class="d-tr"> 
															<view class="d-td border-bottom">泵</view>
														</view>
													</view>
												</view>
												<view class="d-tr">
													<view class="d-td tiaozheng1 border-top">
														<view class="d-table">
															<view class="d-tr">
																<view class="d-td border-bottom" >
																	通道1
																</view>
															</view>
														</view>
													</view>
													<view class="d-td tiaozheng1 border-top">
														<view class="d-table">
															<view class="d-tr">
																<view class="d-td border-bottom" >
																	通道2
																</view>
															</view>
														</view>
													</view>
													<view class="d-td tiaozheng1 border-top">
														<view class="d-table">
															<view class="d-tr">
																<view class="d-td border-bottom" >
																	通道3
																</view>
															</view>
														</view>
													</view>
													<view class="d-td tiaozheng1 border-top">
														<view class="d-table">
															<view class="d-tr">
																<view class="d-td border-bottom" >
																	通道4
																</view>
															</view>
														</view>
													</view>
												</view>
												<view class="d-tr">
													<view class="d-td">
														<view class="d-table">
															<view class="d-tr">
																<view class="d-td border-bottom">{{deviceNameList.medicamentName_1}}</view>
																<view class="d-td border-left border-bottom">{{deviceNameList.medicamentName_2}}</view>
																<view class="d-td border-left border-bottom">{{deviceNameList.medicamentName_3}}</view>
															</view>
														</view>
													</view>
													<view class="d-td">
														<view class="d-table">
															<view class="d-tr">
																<view class="d-td border-bottom">{{deviceNameList.medicamentName_4}}</view>
																<view class="d-td border-left border-bottom">{{deviceNameList.medicamentName_5}}</view>
																<view class="d-td border-left border-bottom">{{deviceNameList.medicamentName_6}}</view>
															</view>
														</view>
													</view>
													<view class="d-td">
														<view class="d-table">
															<view class="d-tr">
																<view class="d-td border-bottom">{{deviceNameList.medicamentName_7}}</view>
																<view class="d-td border-left border-bottom">{{deviceNameList.medicamentName_8}}</view>
															</view>
														</view>
													</view>
													<view class="d-td">
														<view class="d-table">
															<view class="d-tr">
																<view class="d-td border-bottom">{{deviceNameList.medicamentName_9}}</view>
																<view class="d-td border-left border-bottom">{{deviceNameList.medicamentName_10}}</view>
															</view>
														</view>
													</view>
												</view>
											</view>
										</view>
										<scroll-view style="height: 800rpx;" class="border-bottom border-right" scroll-y>
											<view class="d-table">
												<view class="d-tr" v-for="(item4,index4) in deviceList" :key="index4">
													<view class="d-tr">
														<view class="d-td tiaozheng border-bottom">
															配方{{index4}}
														</view>
														<view class="d-td tiaozheng border-bottom">
															未知
														</view>
														<view class="d-td tiaozheng4">
															<view class="d-table">
																<view class="d-tr">
																	<view class="d-td border-bottom">设定用量(ml)</view>
																</view>
																<view class="d-tr">
																	<view class="d-td border-bottom">总量(Liter)</view>
																</view>
																<view class="d-tr">
																	<view class="d-td border-bottom">单价(RMB/Liter)</view>
																</view>
																<view class="d-tr">
																	<view class="d-td border-bottom">总价</view>
																</view>
															</view>
														</view>
															<view class="d-td tiaozheng2">
															<view class="d-table"> 
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].medicamentName_1_volume}}</view>
																</view>
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].medicamentName_1_total}}</view>
																</view>
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].price_1}}</view>
																</view>
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].medicamentName_1_total_money}}</view>
																</view>
															</view>
														</view>
														<view class="d-td tiaozheng2">
															<view class="d-table"> 
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].medicamentName_2_volume}}</view>
																</view>
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].medicamentName_2_total}}</view>
																</view>
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].price_2}}</view>
																</view>
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].medicamentName_2_total_money}}</view>
																</view>
															</view>
														</view>
														<view class="d-td tiaozheng2">
															<view class="d-table"> 
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].medicamentName_3_volume}}</view>
																</view>
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].medicamentName_3_total}}</view>
																</view>
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].price_3}}</view>
																</view>
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].medicamentName_3_total_money}}</view>
																</view>
															</view>
														</view>
														<view class="d-td tiaozheng2">
															<view class="d-table"> 
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].medicamentName_4_volume}}</view>
																</view>
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].medicamentName_4_total}}</view>
																</view>
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].price_4}}</view>
																</view>
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].medicamentName_4_total_money}}</view>
																</view>
															</view>
														</view>
														<view class="d-td tiaozheng2">
															<view class="d-table"> 
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].medicamentName_5_volume}}</view>
																</view>
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].medicamentName_5_total}}</view>
																</view>
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].price_5}}</view>
																</view>
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].medicamentName_5_total_money}}</view>
																</view>
															</view>
														</view>
														<view class="d-td tiaozheng2">
															<view class="d-table"> 
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].medicamentName_6_volume}}</view>
																</view>
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].medicamentName_6_total}}</view>
																</view>
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].price_6}}</view>
																</view>
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].medicamentName_6_total_money}}</view>
																</view>
															</view>
														</view>
														<view class="d-td tiaozheng3">
															<view class="d-table"> 
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].medicamentName_7_volume}}</view>
																</view>
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].medicamentName_7_total}}</view>
																</view>
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].price_7}}</view>
																</view>
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].medicamentName_7_total_money}}</view>
																</view>
															</view>
														</view>
														<view class="d-td tiaozheng3">
															<view class="d-table"> 
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].medicamentName_8_volume}}</view>
																</view>
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].medicamentName_8_total}}</view>
																</view>
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].price_8}}</view>
																</view>
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].medicamentName_8_total_money}}</view>
																</view>
															</view>
														</view>
														<view class="d-td tiaozheng3">
															<view class="d-table"> 
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].medicamentName_9_volume}}</view>
																</view>
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].medicamentName_9_total}}</view>
																</view>
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].price_9}}</view>
																</view>
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].medicamentName_9_total_money}}</view>
																</view>
															</view>
														</view>
														<view class="d-td tiaozheng3">
															<view class="d-table"> 
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].medicamentName_10_volume}}</view>
																</view>
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].medicamentName_10_total}}</view>
																</view>
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].price_10}}</view>
																</view>
																<view class="d-tr">
																	<view class="d-td border-bottom">{{deviceList[index4].medicamentName_10_total_money}}</view>
																</view>
															</view>
														</view>
													</view>
												</view>
											</view>
										</scroll-view>
									</view>
								</scroll-view>
							</view>
						</view>
					</view>
					<view v-show="current === 2">
						<view class="content-block"></view>
						<view class="content-picker">
							<uni-data-picker v-model="eq" :localdata="newTypeList" @change="onchange"
								placeholder="设备种类">
							</uni-data-picker>
							<uni-data-picker v-model="eq1" :localdata="newNameList" @change="onchangeName"
								placeholder="设备名称">
							</uni-data-picker>
						</view>
						<view class="content-picker">
							<uni-data-picker v-model="eq2" :localdata="newModelList" @change="onchangeModel"
								placeholder="设备型号">
							</uni-data-picker>
							<uni-data-picker v-model="eq3" :localdata="snList" @change="onchangeSn"
								placeholder="设备序列号">
							</uni-data-picker>
						</view>
						<view class="">
						</view>
						<view class="example-body">
							<uni-datetime-picker v-model="range" type="daterange" start="2021-3-20" end="2022-5-20"
								rangeSeparator="至" @change="datatimeChange" />
						</view>
						<view class="content-block1"></view>
						<view class="center">
							<view class="center-top">
								<view class="">序号</view>
								<view class="" style="margin-right:150rpx ;">日期时间</view>
								<view class="" style="margin-right:100rpx ;">洗衣龙仓编号</view>
							</view>
							<view class="center-main">
								<uni-collapse accordion="true" @change="change">
									<!-- 只能下拉一个 -->
									<uni-collapse-item v-for="(item,index) in dataList" :key="index">
										<template v-slot:title>
											<view class="center-main-title">
												<view class="center-main-title1">{{item.id}}</view>
												<view class="center-main-title2">{{item.up_time}}</view>
												<view class="center-main-title3">{{item.imei}}</view>
											</view>
										</template>
										<template v-slot:content>
											<view class="center-main-content">
												<view class="center-main-content-title">设备名称
													<view class="center-main-content-main">
														{{item.deviceName}}
													</view>
												</view>
												<view class="center-main-content-title">信号详情
													<view class="center-main-content-main">
														{{item.msg}}
													</view>
												</view>
											</view>
										</template>
									</uni-collapse-item>
								</uni-collapse>
							</view>
						</view>
					</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	import NavBar from '../../components/NavBar.vue'
	export default {
		data() {
			return {
				items: ['设备统计', '化料/设备报表', '日志记录'],
				itemms: ['成本统计', '化料统计', '配方统计', '报警信息', '设备统计'],
				current: 0,
				colorIndex: 0,
				currentt: 0,
				colorIndex: 0,
				typeList: [],
				newTypeList: [],
				eq: '',
				nameList: [],
				newNameList: [],
				eq1: '',
				modelList: [],
				newModelList: [],
				eq2: '',
				eq3: '',
				snList: [],
				range: ['', ''],
				mapList: [],
				chartData: {
					categories: [],
					series: [{}]
				},
				costList: [],
				chemicalsList: [],
				formulaList: [],
				firstWarnList: [],
				secondWarnList: [],
				thirdWarnList: [],
				deviceList: [],
				deviceNameList: [],
				dataList: [],
				dates: ["日", "月", "年"],
				currentIndex: 0,
				arr:[],
			}
		},
		components: {
			NavBar,
		},
		onLoad() {
			uni.removeStorageSync("timeType")
			this.getType()
			uni.removeStorageSync("sn")
		},
		methods: {
			scroll() {},
			titleClick(item, index) {
				this.currentIndex = index;
				//console.log(item);
				switch (item) {
					case '日':
						this.item = "day"
						//console.log(this.item)
						break;
					case '月':
						this.item = "month"
						break;
					case '年':
						this.item = "year"
						break;
				}
				uni.setStorageSync("timeType", this.item)
				this.getMap()
			},
			chooseMap(e) {
				let date = new Date(e[0]);
				let date2 = new Date(e[1]);
				let time = date.valueOf();
				let time2 = date2.valueOf();
				let start = new Date(time).getTime() / 1000;
				let end = new Date(time2).getTime() / 1000;
				uni.setStorageSync("start", start)
				uni.setStorageSync("end", end)
				this.getMap()
			},
			change() {},
			onchange(e) {
				//console.log(e.detail.value[0].id)
				let pid = e.detail.value[0].id
				//console.log(pid)
				uni.setStorageSync("pid", pid)
				this.getName()
				this.eq1 = []
				this.eq3 = []
				this.newNameList = []
				this.newModelList = []
			},
			onchangeName(e) {
				// console.log(e.detail.value[0].id)
				let pidd = e.detail.value[0].id
				//console.log(pid)
				uni.setStorageSync("pidd", pidd)
				this.getModel()
				this.eq2 = []
				this.newModelList = []
			},
			onchangeModel(e) {
				this.snList = []
				console.log(e)
				let deviceModelId = e.detail.value[0].id
				uni.setStorageSync("deviceModelId", deviceModelId)
				this.getDropdown()
			},
			onchangeSn(e) {
				console.log(e)
				let sn = e.detail.value[0].value
				uni.setStorageSync("sn", sn)

			},
			popDate(DateList) {
				console.log(DateList)
			},
			changeDate() {
				console.log(this)
			},
			back() {
				uni.redirectTo({
					url: "/pages/home/Home",
				})
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
				this.eq = ''
				this.eq1 = ''
				this.eq3 = ''
				this.eq2 = ''
				this.range = '', ''
			},
			onClickItemm(e) {
				// uni.showLoading({
				// 	title: '加载中'
				// });
				// setTimeout(function() {
				// 	uni.hideLoading();
				// }, 2500);
				console.log(e)
				if (this.currentt !== e.currentIndex) {
					this.currentt = e.currentIndex
				}
				switch (this.currentt) {
					case 0:
						this.getCost()
						break;
					case 1:
						this.getChemicals()
						break;
					case 2:
						this.getFormula()
						break;
					case 3:
						this.getWarn()
						break;
					case 4:
						this.getDevice()
						break;
				}
			},
			datatimeChange(e) {
				let date = new Date(e[0]);
				let date2 = new Date(e[1]);
				let time = date.valueOf();
				let time2 = date2.valueOf();
				let start = new Date(time).getTime() / 1000;
				let end = new Date(time2).getTime() / 1000;
				uni.setStorageSync("start", start)
				uni.setStorageSync("end", end)
				this.getDataList()
			},
			timeChange(e) {
				let date = new Date(e[0]);
				let date2 = new Date(e[1]);
				let time = date.valueOf();
				let time2 = date2.valueOf();
				let start = new Date(time).getTime() / 1000;
				let end = new Date(time2).getTime() / 1000;
				uni.setStorageSync("start", start)
				uni.setStorageSync("end", end)
				this.getCost()
			},
			async getType() {
				//console.log(this.$store.state.userInfo.token)
				const res = await this.$myRequest({
					url: '/v1/device-type/list',
					data: {
						// token: uni.getStorageSync('token')
						token: this.$store.state.userInfo.token,
						type: '1'
					}
				})
				console.log(res)
				this.typeList = res.data.data
				res.data.data.map((event, index) => {
					//console.log(event.id)
					this.newTypeList.push({
						text: event.name,
						value: event.name,
						id: event.id,
					})
				})
			},
			async getName() {
				//console.log(this.$store.state.userInfo.token)
				const res = await this.$myRequest({
					url: '/v1/device-type/list',
					data: {
						// token: uni.getStorageSync('token')
						token: this.$store.state.userInfo.token,
						type: '2',
						pid: uni.getStorageSync('pid'),
					}
				})

				console.log(res)
				this.nameList = res.data.data
				res.data.data.map((event, index) => {
					console.log(event)
					this.newNameList.push({
						text: event.name,
						value: event.name,
						id: event.id,
					})
				})
			},
			async getModel() {
				//console.log(this.$store.state.userInfo.token)
				const res = await this.$myRequest({
					url: '/v1/device-type/list',
					data: {
						// token: uni.getStorageSync('token')
						token: this.$store.state.userInfo.token,
						type: '3',
						pid: uni.getStorageSync('pidd'),
					}
				})
				console.log(res)
				this.modelList = res.data.data
				res.data.data.map((event, index) => {
					console.log(event)
					this.newModelList.push({
						text: event.name,
						value: event.name,
						id: event.id,
					})
				})
			},
			async getDropdown() {
				//console.log(this.$store.state.userInfo.token)
				const res = await this.$myRequest({
					url: '/v1/device/dropdown-list',
					data: {
						deviceModelId: uni.getStorageSync('deviceModelId'),
						// token: uni.getStorageSync('token')
						token: this.$store.state.userInfo.token,
					}
				})
				console.log(res)
				this.deviceSn = res.data.data
				res.data.data.map((event) => {
					console.log(event)
					this.snList.push({
						text: event.sn,
						value: event.sn,
						id: event.sn,
					})
				})
			},
			async getCost() {
				uni.showLoading({
					title: '加载中'
				});
				//console.log(this.$store.state.userInfo.token)
				const res = await this.$myRequest({
					url: '/v1/statistics/cost',
					data: {
						sn: uni.getStorageSync("sn"),
						// token: uni.getStorageSync('token')
						token: this.$store.state.userInfo.token,
						start: uni.getStorageSync("start"),
						end: uni.getStorageSync("end"),
					}
				})
				
				console.log(res)
				this.costList = res.data.data
				uni.hideLoading()
			},
			async getChemicals() {
				uni.showLoading({
					title: '加载中'
				});
				//console.log(this.$store.state.userInfo.token)
				const res = await this.$myRequest({
					url: '/v1/statistics/chemicals',
					data: {
						sn: uni.getStorageSync("sn"),
						// token: uni.getStorageSync('token')
						token: this.$store.state.userInfo.token,
						start: uni.getStorageSync("start"),
						end: uni.getStorageSync("end"),
					}
				})
				
				console.log(res)
				this.chemicalsList = res.data.data
				uni.hideLoading()
			},
			async getWarn() {
				uni.showLoading({
					title: '加载中'
				});
				//console.log(this.$store.state.userInfo.token)
				const res = await this.$myRequest({
					url: '/v1/warn/statistics',
					data: {
						sn: uni.getStorageSync("sn"),
						// token: uni.getStorageSync('token')
						token: this.$store.state.userInfo.token,
						start: uni.getStorageSync("start"),
						end: uni.getStorageSync("end"),
					}
				})
				
				console.log(res)
				this.warnList = res.data.data
				this.firstWarnList = this.warnList[1]
				this.secondWarnList = this.warnList[2]
				this.thirdWarnList = this.warnList[3]
				uni.hideLoading()
			},
			async getFormula() {
				uni.showLoading({
					title: '加载中'
				});
				//console.log(this.$store.state.userInfo.token)
				const res = await this.$myRequest({
					url: '/v1/statistics/formula',
					data: {
						sn: uni.getStorageSync("sn"),
						// token: uni.getStorageSync('token')
						token: this.$store.state.userInfo.token,
						start: uni.getStorageSync("start"),
						end: uni.getStorageSync("end"),
					}
				})
				
				console.log(res)
				this.formulaList = res.data.data
				uni.hideLoading()
			},
			async getDevice() {
				uni.showLoading({
					title: '加载中'
				});
				//console.log(this.$store.state.userInfo.token)
				const res = await this.$myRequest({
					url: '/v1/statistics/device',
					data: {
						sn: uni.getStorageSync("sn"),
						// token: uni.getStorageSync('token')
						token: this.$store.state.userInfo.token,
						start: uni.getStorageSync("start"),
						end: uni.getStorageSync("end"),
					}
				})
				
				console.log(res)
				this.deviceList = res.data.data
				this.device1List = res.data.data[1]
				this.deviceNameList = res.data.data.medicamentName
				console.log(this.deviceNameList)
				console.log(this.deviceList)
				console.log(this.device1List)
				var arr = []
				let itemKey = 0
				for (let k in this.device1List) { 
					itemKey++
				}
				console.log(itemKey)
				let index = 0;
				for (let i = 0; i < itemKey; i += 4) {
					arr[index] = {}
					arr[index]["medicamentName_"+(index+1)+"_total"] = this.device1List["medicamentName_"+(index+1)+"_total"]
					 for (let j = 1; j < 4; j ++) {
					 	arr[index]["medicamentName_"+(index+1)+"_total_money"] = this.device1List["medicamentName_"+(index+1)+"_total_money"]
						arr[index]["medicamentName_"+(index+1)+"_volume"] = this.device1List["medicamentName_"+(index+1)+"_volume"]
						arr[index]["price_"+(index+1)] = this.device1List["price_"+(index+1)]
					 }
					index++;
				}
				console.log(arr)
				uni.hideLoading()
				//console.log(this.deviceNameList)
			},
			async getDataList() {
				uni.showLoading({
					title: '加载中'
				});
				//console.log(this.$store.state.userInfo.token)
				const res = await this.$myRequest({
					url: '/v1/data/list',
					data: {
						sn: uni.getStorageSync("sn"),
						// token: uni.getStorageSync('token')
						token: this.$store.state.userInfo.token,
						start: uni.getStorageSync("start"),
						end: uni.getStorageSync("end"),
					}
				})
				console.log(res)
				this.dataList = res.data.data.info
				uni.hideLoading()
			},
			async getMap() {
				uni.showLoading({
					title: '加载中'
				});
				//console.log(this.$store.state.userInfo.token)
				const res = await this.$myRequest({
					url: '/v1/statistics/map',
					data: {
						sn: uni.getStorageSync("sn"),
						// token: uni.getStorageSync('token')
						token: this.$store.state.userInfo.token,
						start: uni.getStorageSync("start"),
						end: uni.getStorageSync("end"),
						timeType: uni.getStorageSync("timeType"),
					}
				})
				console.log(res)
				this.mapList = res.data.data
				var arr = []
				var values = []
				for (let key in this.mapList) {
					arr.push(key)
					values.push(this.mapList[key])
				}
				this.chartData.categories = arr
				console.log(arr)
				console.log(values)
				for (let i = 0; i < values.length; i++) {
					var arrrr = values.map((item) => {
						return item[i + 1]
					})
					// arrrr = arrrr.map(Number);
					console.log(arrrr)
					this.chartData.series = [{
						name:"化料",
						data: arrrr
					}]
				}
				uni.hideLoading()
			},
		}
	}
</script>

<style scoped lang="scss">
	.containerr {
		width: 2000rpx;
		padding: 10rpx;
		.d-tr{
			&:first-child{
				.d-td{
					border-top: 0;
				}
			}
			&:last-child{
				.d-td{
					border-bottom: 0;
				}
			}
		}
	}
	.tiaozheng{
		width: 100rpx;
	}
	.tiaozheng1{
		width: 400rpx;
	}
	.tiaozheng2{
		width: 138rpx;
	}
	.tiaozheng3{
		width: 200rpx;
	}
	.tiaozheng4{
		width: 150rpx;
	}
	.clear{
		border-right:none ;
	}
	.charts-box {
		width: 2000rpx;
		height: 900rpx;
	}

	.container {
		height: 100rpx;
	}

	.container-top {
		margin-top: 100rpx;
	}

	.container-top image {
		width: 65rpx;
		height: 65rpx;
		margin-top: 18rpx;
	}

	/deep/.input-value {
		width: 250rpx;
		height: 64rpx;
		margin: 30rpx 0rpx 26rpx 72rpx;
	}

	.content-block {
		width: 100%;
		margin-top: 2rpx;
		border-bottom: 2rpx solid rgba(187, 187, 187, 100);
	}

	.content-block1 {
		width: 100%;
		border-bottom: 2rpx solid rgba(187, 187, 187, 100);
		margin-top: 40rpx;
	}

	.content-picker {
		display: flex;
		flex-direction: row;
	}

	/deep/.segmented-control__text {
		width: 100%;
	}

	/deep/.uni-date-x--border {
		width: 83%;
		margin-left: 72rpx;
	}

	.tianzheng {
		width: 570rpx;
		margin-right: 20rpx;
	}

	.control {
		margin-top: 40rpx;
	}

	.content-text {
		width: 137px;
		height: 17px;
		color: rgba(16, 16, 16, 100);
		font-size: 12px;
		text-align: left;
		font-family: PingFangSC-regular;
		margin-left: 40rpx;
	}
	.d-0{
		margin-top: 42rpx;
		width: 900rpx;
	}
	.d-2{
		margin-top: 42rpx;
		width: 1200rpx;
	}
	.table-1{
		width: 1980rpx;
		margin-top: 42rpx;
	}
	.table-3{
		margin-top: 42rpx;
	}
	.d-4{
		margin-top: 42rpx;
	}
	.center {}

	.center-top {
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-bottom: 5rpx solid #dddddd;
		height: 70rpx;
		font-size: 28rpx;
	}

	.center-main-title {
		display: flex;
		align-items: center;
		height: 70rpx;
		font-size: 28rpx;
		text-align: center;
	}

	.center-main-title1 {
		margin-left: 30rpx;
		width: 60rpx;
	}

	.center-main-title2 {
		width: 320rpx;
	}

	.center-main-title3 {
		width: 200rpx;
	}

	.center-main-content {
		font-size: 30rpx;
		display: flex;
		justify-content: flex-start;
		flex-direction: column;
	}

	.center-main-content-title {
		display: flex;
		justify-content: flex-start;
		color: rgba(149, 149, 149, 100);
		font-size: 14px;
		text-align: left;
		font-family: PingFangSC-regular;
	}

	.center-main-content-main {
		margin-left: 40rpx;
		color: black;
	}

	.content-footer {
		display: flex;
	}

	.content-footer-date {
		margin-left: 10rpx;
		justify-content: center;
		align-items: center;
		display: flex;
		position: relative;
		left: 50rpx;
		width: 76rpx;
		height: 76rpx;
		line-height: 40rpx;
		border-radius: 4rpx;
		background-color: rgba(255, 255, 255, 100);
		color: rgba(187, 187, 187, 100);
		font-size: 28rpx;
		font-family: Arial;
		border: 2rpx solid rgba(187, 187, 187, 100);
	}

	.active {
		background-color: rgba(149, 149, 149, 100);
		color: #f1f0f0;
	}
</style>
