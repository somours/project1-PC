		$(function(){
			$.cookie.json = true;
			var user = $.cookie("user") || {};
			if(user.name != undefined){
				$(".nav-right").eq(0).html("<li style='width:200px;'>欢迎你,<em>"+user.name+"<em></li>");
			}

			//给文章头部添加吸顶效果;
			$(window).on("scroll",function(){
				var fixHeight = $("#fix").height();
				var windowHeight = $(window).scrollTop();
				if(windowHeight > fixHeight){
					$("#fix").css({"position":"fixed","background":"#f5f5f5","z-index":1,"width":"100%"});
					$("#main").css({"paddingTop":0})
				}
				if(windowHeight == 0){
					$("#main").css({"paddingTop":fixHeight});
				}
			});
			//商品导航栏的tab切换效果
			$("#main .show-nav").eq(0).on("click","li",function(){
				var index = $(this).index();
				$(this).children("span").css("color","#fc685d").parent().siblings().children("span").css("color","black");
				$(".show .show-content").eq(index).show().siblings().hide();
			});
			//放大镜的效果
			//先给所有的大图片添加一个相同类名
			// $("#large img").addClass("zoom-01");
			$("#mini").on("click","li",function(){
				var index = $(this).index();
				$(this).css("border","1px solid #f00").siblings().css("border-color","#ccc");
				$("#large img").eq(index).show().addClass("zoom-01").siblings().removeClass().hide();
				$(".zoom-01").elevateZoom({
					zoomType : "inner",
					cursor: "crosshair"
				});
			// 	$(".zoomContainer").eq(index).show().siblings(".zoomContainer").hide();
			});
			$(".zoom-01").elevateZoom({
				zoomType : "inner",
				cursor: "crosshair"
			});
			//当页面加载完延迟一定时间自动执行一次点击
			// setTimeout('$("#mini li:first").click();', 100);
			//添加购物车的效果;
			var off = $("#cart").offset();
			$(".add:first").click(function(e){
				e.preventDefault();
				//给图片添加飞入购物车的效果,但是看起来好丑
				var img = $("#large img").eq(0).attr("src");//获取图片路劲
				var flyer = $("<img class='flyer-img' src='"+ img+"' style='width:14px;background:pink;z-index:1'>");//给图片设置样式及创建一个飞的对象
				flyer.fly({
					start: {
						left: e.clientX,
						top: e.clientY
					},
					end: {
						left: off.left - 8,
						top: off.top - 4
					}
				});
				//给商品信息添加到购物车;
				//先判断用户是否有登录,没有则登录,则跳转到登录界面
				var username = $(".nav-right:first").children("li").eq(0).text();
				if(username == "登录"){
					alert("请先登录");
					location = "login.html";
					return ;
				}
				//手机商品信息;
				var info = {
					username: $(".nav-right:first").find("em").eq(0).text(),
					id: 1,//添加商品名称,作为唯一标识符,但是原网页中没有提供,所以这里手动给数字1,2,3,....
					src: $("#large img").eq(0).attr("src"),
					description: $("#descript-info").text(),
					price: $(".mainInfo .price").eq(0).text(),
					amount: 1
				};
				//读取cookie信息,看之前是否有添加此商品,若有,则只把数量加1,若无,则将整个信息存入cookie;后面对于数据的操作也是如此;
				// $.cookie.json = true;
				var _products = $.cookie("products") || [];
				var _index = index(info.id,_products);
				if(_index === -1){
					_products.push(info);
					$.ajax({
						url: "product.php",
						type: "get",
						dataType: "json",
						data: {
								username: info.username,
								id: info.id,
								src: info.src,
								description: info.description,
								price: info.price,
								amount: info.amount,
								action: "add"
						},
						success: function(data){
							console.log(data);
						}
					});
				}else{
					_products[_index].amount++;
					$.ajax({
						url: "product.php",
						type: "get",
						dataType: "json",
						data: {
								username: info.username,
								id: info.id,
								src: info.src,
								description: info.description,
								price: info.price,
								amount: _products[_index].amount,
								action: "update"
						},
						success: function(data){
							console.log(data);
						}
					});
				}
				$.cookie("products",_products,{expires:7,path:"/"});
				console.log($.cookie("products"));
				//在数组中找出是否具有某个元素,有就返回相应的索引,没有则返回-1
				function index(id,arr){
					for(var i=0,len=arr.length;i<len;i++){
						if(id === arr[i].id){
							return i;
						}
					}
					return -1;
				}
			});
		});