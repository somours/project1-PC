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
		$pass = $_GET["password"];
		$phone = $_GET["phone"];
		// $price = $_GET["price"];
		// $id = $_GET["prod_id"];
		// $amount = $_GET["amount"];
		$sql = "insert into project1.user 
			values(null,'$name','$pass','$phone')";
		$result = mysql_query($sql,$conn);
		if($result){
			echo '{"status":1,"message":"success"}';
		}else{
			echo '{"status":0,"message":"failed"}';
		}
	}else if($action == "delate"){
		$name = $_GET["name"];
		$id = $_GET["prod_id"];
		$sql = "delete from cart where name=$name and prod_id=$id";
		$result = mysql_query($sql,$conn);
		if($result){
			echo '{"status":1,"message":"success"}';
		}else{
			echo '{"status":0,"message":"failed"}';
		}
	}else if($action == "update"){
		$amount = $_GET["amount"];
		$name = $_GET["name"];
		$id = $_GET["prod_id"];
		$sql = "update cart
				set amount=$amount
				where name='$name' and prod_id=$id";
		$result = mysql_query($sql,$conn);
		if($result){
			echo '{"status":1,"message":"success"}';
		}else{
			echo '{"status":0,"message":"failed"}';
		}
	}else if($action == "select"){
		// $name = $_GET["username"];
		// $pass = $_GET["password"];
		$sql = "SELECT * FROM `user` WHERE 1";
		$result = mysql_query($sql,$conn);
		$arr = array();
		while($rows = mysql_fetch_array($result,MYSQL_ASSOC)){
			$arr[] = $rows;
		}
		echo json_encode($arr);
	}
	mysql_close($conn);
 ?>