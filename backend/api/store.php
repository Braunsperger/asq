<?php
require 'connect.php';

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {
  $request = json_decode($postdata);
	
  if((int)$request->data->codproc < 0 || (int)$request->data->idade < 0 || (int)$request->data->sexo < 0 || (int)$request->data->perm < 0) {
    return http_response_code(400);
  }

  $codproc = mysqli_real_escape_string($con, (int)$request->data->codproc);
  $idade = mysqli_real_escape_string($con, (int)$request->data->idade);
  $sexo = mysqli_real_escape_string($con, (int)$request->data->sexo);
  $perm = mysqli_real_escape_string($con, (int)$request->data->perm);
	
  $sql = "
    INSERT INTO 
      asq (codproc, idade, sexo, perm) 
    VALUES 
      ($codproc, $idade, $sexo, $perm)
  ";

  if(mysqli_query($con,$sql)) {
    http_response_code(201);
    
    $asq = [
      'codproc' => $codproc,
      'idade' => $idade,
      'sexo' => $sexo,
      'perm' => $perm
    ];
    
    echo json_encode(['data'=>$asq]);
  } else {
    http_response_code(422);
  }
}
