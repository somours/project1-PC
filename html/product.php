<?php 
	$action = $_GET["action"];
	$conn = mysql_connect("localhost:3306","root","");
	if(!$conn){
		die("连接错误".mysql_error());
	}
	mysql_select_db("project1",$conn);
	mysql_query("set character set 'utf8'");
	mysql_query("set name 'utf8'");
	//设置sql语句
	if($action == "add"){
		$name = $_GET["username"];
		$id = $_GET["id"];
		$src = $_GET["src"];
		$description = $_GET["description"];
		$price = $_GET["price"];
		$amount = $_GET["amount"];
		$sql = "insert into project1.product 
			values(null,'$name','$id','$src','$description','$price','$amount')";
		$result = mysql_query($sql,$conn);
		if($result){
			echo '{"status":1,"message":"success"}';
		}else{
			echo '{"status":0,"message":"failed"}';
		}
	}else if($action == "delate"){
		$name = $_GET["username"];
		$id = $_GET["id"];
		$sql = "delete from product where username=$name and productid=$id";
		$result = mysql_query($sql,$conn);
		if($result){
			echo '{"status":1,"message":"success"}';
		}else{
			echo '{"status":0,"message":"failed"}';
		}
	}else if($action == "update"){
		$amount = $_GET["amount"];
		$name = $_GET["username"];
		$id = $_GET["id"];
		$sql = "update product
				set amount=$amount
				where username='$name' and productid='$id'";
		$result = mysql_query($sql,$conn);
		if($result){
			echo '{"status":1,"message":"success"}';
		}else{
			echo '{"status":0,"message":"failed"}';
		}
	}else if($action == "select"){
		$name = $_GET["username"];
		$sql = "select * from product
				where username='$name'";
		$result = mysql_query($sql,$conn);
		$arr = array();
		while($rows = mysql_fetch_array($result,MYSQL_ASSOC)){
			$arr[] = $rows;
		}
		echo json_encode($arr);
	}
	mysql_close($conn);
 ?>