<template>
	<!--
      作者：luoyiming
      时间：2019-10-25
      描述：订单详情
  -->
	<div class="pb50" v-loading="loading">
		<div class="product-content">
			<!--基本信息-->
			<div class="common-form">基本信息</div>
			<div class="table-wrap">
				<el-row>
					<el-col :span="5">
						<div class="pb16">
							<span class="gray9">订单号：</span>
							{{ detail.order_no }}
						</div>
					</el-col>
					<el-col :span="5">
						<div class="pb16">
							<span class="gray9">买家：</span>
							{{ detail.user.nickName }}
							<span>用户ID：({{ detail.user.user_id }})</span>
						</div>
					</el-col>
					<el-col :span="5">
						<div class="pb16">
							<span class="gray9">订单金额 (元)：</span>
							{{ detail.order_price }}
						</div>
					</el-col>
					<el-col :span="5" v-if="detail.express_price > 0">
						<div class="pb16">
							<span class="gray9">配送费 (元)：</span>
							{{ detail.express_price }}
						</div>
					</el-col>
					<el-col :span="5" v-if="detail.bag_price > 0">
						<div class="pb16">
							<span class="gray9">包装费 (元)：</span>
							{{ detail.bag_price }}
						</div>
					</el-col>
					<el-col :span="5">
						<div class="pb16">
							<span class="gray9">实付款金额 (元)：</span>
							{{ detail.pay_price }}
						</div>
					</el-col>
					<el-col :span="5">
						<div class="pb16">
							<span class="gray9">支付方式：</span>
							{{ detail.pay_type.text }}
						</div>
					</el-col>
					<el-col :span="5">
						<div class="pb16">
							<span class="gray9">配送方式：</span>
							{{ detail.delivery_type.text }}
						</div>
					</el-col>
					<el-col :span="5">
						<div class="pb16">
							<span class="gray9">配送状态：</span>
							{{ detail.deliver_text }}
						</div>
					</el-col>
					<el-col :span="5">
						<div class="pb16">
							<span class="gray9" v-if="detail.delivery_type.value==10">配送时间：</span>
							<span class="gray9" v-if="detail.delivery_type.value==20">取餐时间：</span>
							{{ detail.mealtime}}
						</div>
					</el-col>
					<el-col :span="5" v-if="detail.callNo">
						<div class="pb16">
							<span class="gray9">取餐码：</span>
							{{ detail.callNo}}
						</div>
					</el-col>
					<el-col :span="5">
						<div class="pb16">
							<span class="gray9">交易状态：</span>
							{{ detail.order_status.text }}
						</div>
					</el-col>
					<el-col :span="5"
						v-if="detail['pay_status']['value'] == 10 && detail['order_status']['value'] == 10 && detail['order_source'] == 10"
						v-auth="'/takeout/order/updatePrice'">
						<el-button @click="editClick(detail)" size="small">修改价格</el-button>
					</el-col>
				</el-row>
			</div>
			<!--商户信息-->
			<div class="common-form mt16">门店信息</div>
			<div class="table-wrap">
				<el-row>
					<el-col :span="5">
						<div class="pb16">
							<span class="gray9">门店名称：</span>
							{{ detail.supplier.name }}
						</div>
					</el-col>
				</el-row>
			</div>
			<!--商品信息-->
			<div class="common-form mt16">商品信息</div>
			<div class="table-wrap">
				<el-table size="small" :data="detail.product" border style="width: 100%">
					<el-table-column prop="product_name" label="商品" width="400">
						<template #default="scope">
							<div class="product-info">
								<div class="pic"><img v-img-url="scope.row.image.file_path" /></div>
								<div class="info">
									<div class="name">{{ scope.row.product_name }}</div>
									<div class="gray9" v-if="scope.row.product_attr!=''">{{scope.row.product_attr}}
									</div>
									<div class="orange" v-if="scope.row.refund">
										{{ scope.row.refund.type.text }}-{{ scope.row.refund.status.text }}
									</div>
									<div class="price">
										<span
											:class="{'text-d-line':scope.row.is_user_grade==1,'gray6':scope.row.is_user_grade!=1}">￥
											{{ scope.row.line_price }}</span>
										<span class="ml10" v-if="scope.row.is_user_grade==1">
											会员折扣价：￥ {{ scope.row.grade_product_price }}
										</span>
									</div>
								</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="total_num" label="购买数量">
						<template #default="scope">
							<p>x {{ scope.row.total_num }}</p>
						</template>
					</el-table-column>
					<el-table-column prop="total_price" label="商品总价(元)">
						<template #default="scope">
							<p>￥ {{ scope.row.total_price }}</p>
						</template>
					</el-table-column>
				</el-table>
			</div>

			<!--收货信息-->
			<div v-if="detail.delivery_type.value == 10">
				<div class="common-form mt16">配送信息</div>
				<div class="table-wrap">
					<el-row>
						<el-col :span="5">
							<div class="pb16">
								<span class="gray9">联系人：</span>
								{{ detail.address.name }}
							</div>
						</el-col>
						<el-col :span="5">
							<div class="pb16">
								<span class="gray9">联系电话：</span>
								{{ detail.address.phone }}
							</div>
						</el-col>
						<el-col :span="9">
							<div class="pb16">
								<span class="gray9">联系地址：</span>
								{{ detail.address.detail }}{{ detail.address.address }}
							</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="25">
							<div class="pb16">
								<span class="gray9">备注：</span>
								{{ detail.buyer_remark }}
							</div>
						</el-col>
					</el-row>
				</div>
			</div>

			<!--自提门店信息-->
			<template v-if="detail.delivery_type.value == 20">
				<div class="common-form mt16">自提用户信息</div>
				<div class="table-wrap" v-if="detail.extract">
					<el-row>
						<el-col :span="5">
							<div class="pb16">
								<span class="gray9">联系电话：</span>
								{{ detail.extract.phone }}
							</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="25">
							<div class="pb16">
								<span class="gray9">备注：</span>
								{{ detail.buyer_remark }}
							</div>
						</el-col>
					</el-row>
				</div>
			</template>

			<!--付款信息-->
			<div class="table-wrap" v-if="detail.pay_status.value == 20">
				<div class="common-form mt16">付款信息</div>
				<div class="table-wrap">
					<el-row>
						<el-col :span="5">
							<div class="pb16">
								<span class="gray9">应付款金额：</span>
								{{ detail.pay_price }}
							</div>
						</el-col>
						<el-col :span="5">
							<div class="pb16">
								<span class="gray9">支付方式：</span>
								{{ detail.pay_type.text }}
							</div>
						</el-col>
						<el-col :span="5">
							<div class="pb16">
								<span class="gray9">支付流水号：</span>
								{{ detail.transaction_id }}
							</div>
						</el-col>
						<el-col :span="5">
							<div class="pb16">
								<span class="gray9">付款状态：</span>
								{{ detail.pay_status.text }}
							</div>
						</el-col>
						<el-col :span="5">
							<div class="pb16">
								<span class="gray9">付款时间：</span>
								{{ detail.pay_time }}
							</div>
						</el-col>
						<el-col :span="5" v-if="detail.refund_money>0">
							<div class="pb16">
								<span class="gray9">退款金额：</span>
								{{ detail.refund_money }}
							</div>
						</el-col>
					</el-row>
				</div>
			</div>

			<!--发货信息-->
			<div v-if="detail.delivery_type.value == 10">
				<div>
					<div class="common-form mt16">发货信息</div>
					<div class="table-wrap">
						<el-row>
							<el-col :span="5">
								<div class="pb16">
									<span class="gray9">发货状态：</span>
									{{ detail.delivery_status.text }}
								</div>
							</el-col>
						</el-row>
					</div>
				</div>
			</div>

			<!--取消信息-->
			<div class="table-wrap" v-if="detail.order_status.value == 20 && detail.cancel_remark != ''">
				<div class="common-form mt16">取消信息</div>
				<div class="table-wrap">
					<el-row>
						<el-col :span="5">
							<div class="pb16">
								<span class="gray9">商家备注：</span>
								{{ detail.cancel_remark }}
							</div>
						</el-col>
					</el-row>
				</div>
			</div>

			<!--门店自提核销-->
			<div
				v-if="detail.delivery_type.value == 20 && detail.pay_status.value == 20 && detail.order_status.value != 21 && detail.order_status.value != 20">
				<div class="common-form mt16">门店自提核销</div>
				<div class="table-wrap">
					<template>
						<el-row>
							<el-col :span="5">
								<div class="pb16">
									<span class="gray9">核销状态：</span>
									<template v-if="detail.delivery_status.value == 20">
										已核销
									</template>
									<template v-else>
										未核销
									</template>
								</div>
							</el-col>
							<el-col :span="5" v-if="detail.delivery_time">
								<div class="pb16">
									<span class="gray9">核销时间：</span>
									{{ detail.delivery_time }}
								</div>
							</el-col>
						</el-row>
					</template>
				</div>
			</div>
		</div>
		<div class="common-button-wrapper">
			<el-button size="small" type="info" @click="cancelFunc">返回上一页</el-button>
		</div>
	</div>
</template>

<script>
	import OrderApi from '@/api/order.js';
	import {
		deepClone,
	} from '@/utils/base.js';
	export default {
		components: {},
		data() {
			return {
				active: 0,
				/*是否加载完成*/
				loading: true,
				/*订单数据*/
				detail: {
					order_id: 0,
					pay_status: [],
					pay_type: [],
					delivery_type: [],
					user: {},
					address: [],
					product: [],
					order_status: [],
					extract: [],
					delivery_status: [],
					supplier: {
						name: ''
					}
				},
			};
		},
		created() {
			/*获取列表*/
			this.getParams();
		},
		methods: {
			next() {
				if (this.active++ > 4) this.active = 0;
			},
			/*获取参数*/
			getParams() {
				let self = this;
				// 取到路由带过来的参数
				const params = this.$route.query.order_id;
				OrderApi.takeOrderdetail({
							order_id: params
						},
						true
					)
					.then(data => {
						self.loading = false;
						self.detail = data.data.detail;
					})
					.catch(error => {
						self.loading = false;
					});
			},
			/*取消*/
			cancelFunc() {
				this.$router.back(-1);
			},

		}
	};
</script>
<style></style>