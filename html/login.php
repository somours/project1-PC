<?php 
	// $action = $_GET["action"];
	// $name = $_GET["username"];
	// $pass = $_GET["password"];
	$conn = mysql_connect("localhost:3306","root","");
	if(!$conn){
		die("连接错误".mysql_error());
	}
	mysql_select_db("project1",$conn);
	mysql_query("set character set 'utf8'");
	mysql_query("set name 'utf8'");
	//设置sql语句
	$sql = "SELECT * FROM `user` WHERE 1";
	$result = mysql_query($sql,$conn);
	$arr = array();
	while($rows = mysql_fetch_array($result,MYSQL_ASSOC)){
		$arr[] = $rows;
	}
	echo json_encode($arr);
	mysql_close($conn);
 ?>