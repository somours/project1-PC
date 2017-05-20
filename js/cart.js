$(function(){
	$.cookie.json = true;
		var user = $.cookie("user") || {};
		if(user.name != undefined){
			$(".nav-right").eq(0).html("<li style='width:200px;'>欢迎你,<em>"+user.name+"<em></li>");
	}
	console.log($(".nav-right:first").find("em").eq(0).text());
	function loadProduct(){
		$.ajax({
			url: "product.php",
			type: "get",
			dataType: "json",
			data: {
				username : $(".nav-right:first").find("em").eq(0).text(),
				action: "select"
			},
			success: function(data){
				console.log(data);
				$(".product-info").empty();
				data.forEach(function(curr){
					var xiaoji = (curr.price.slice(1) * curr.amount).toFixed(2);
					console.log(xiaoji);
					$(".moban2:last").clone(true).show()
						.appendTo(".product-info").find(".moban2-src").attr("src",curr.src)
						.end().find(".description").text(curr.description)
						.end().find(".price").text(curr.price)
						.end().find("input[name='amount']").val(curr.amount)
						.end().find(".subtotal").text(xiaoji)
						.end().find(".productid").text(curr.productid);
				});
			}
		});
	}
	//页面初始化时初始化数据里边的数据
	loadProduct();
	total();
	//给购物车添加一些功能;
	//全选框功能:
	$("#all,#del-all").on("click",function(){

		// var status = document.getElementById("all").checked;
		status = $(this).prop("checked");
		if(status === "true"){
			$(".selects").prop("checked","true");
		}else{
			$(".selects").removeAttr("checked");
		}
		total();
	});
	//当在数量框中输入数字时,相应的的小计值变化,
	$("input[name='amount']").on("blur",function(){
		var amount = $(this).val();
		// console.log(amount);
		var price = $(this).parent().prev().find(".price").text();
		// console.log(price);
		var subtotal = (price.slice(1) * amount).toFixed(2);
		$(this).parent().next().find(".subtotal").text(subtotal);
	});
	//减少商品数量
	$(".reduces").on("click",function(){
		var amount = $(this).next().val() - 1;
		if(amount <= 0){
			amount = 1;
		}
		$(this).next().val(amount);
		var price = $(this).parent().prev().find(".price").text();
		// console.log(price,amount);
		var subtotal = (price.slice(1) * amount).toFixed(2);
		$(this).parent().next().find(".subtotal").text(subtotal);
	});
	//增加商品数量
	$(".adds").on("click",function(){
		var amount = parseInt($(this).prev().val()) + 1;
		$(this).prev().val(amount);
		var price = $(this).parent().prev().find(".price").text();
		var subtotal = (price.slice(1) * amount).toFixed(2);
		$(this).parent().next().find(".subtotal").text(subtotal);
	});
	//自动计算总计的函数
	function total(){
		var num = 0;
		$(".subtotal").each(function(index,curr){
			console.log($(".selects").eq(index).prop("checked"));
			if($(".selects").eq(index).prop("checked") === true){
				num += parseInt($(this).text());
				// console.log("55555");
			}
		});
		// console.log(num);
		$(".total").text(num.toFixed(2));
	}
	//给框框添加点击事件
	$(".selects").on("click",function(){
		// console.log("222222");
		total();
	});
	//给删除按钮添加点击事件,
	$(".dele").on("click",function(){
		$(this).parent().parent().parent().hide();
		total();
	});
});