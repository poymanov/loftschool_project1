<? 
	$caption = $_POST['caption'];
	$file = $_POST['select_file'];
	$url = $_POST['url'];
	$desc = $_POST['desc'];
	$data = array();

	if ($caption == "" ||
		$file == "" ||
		$url == "" ||
		$desc == "") {
		$data['status'] = "ERR";
		$data['msg'] = "Не заполнены важные поля!";
	}
	else {
		$data['status'] = "OK";
	}

	



	header("Content-Type: application/json");
	echo json_encode($data);
	exit;
?>