<?php
require 'connect.php';

$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
  $request = json_decode($postdata);

  if ((int)$request->data->id < 1 || (int)$request->data->codproc < 0 || (int)$request->data->idade < 0 || (int)$request->data->sexo < 0 || (int)$request->data->perm < 0) {
    return http_response_code(400);
  }

  $id = mysqli_real_escape_string($con, (int)$request->data->id);
  $codproc = mysqli_real_escape_string($con, (int)$request->data->codproc);
  $idade = mysqli_real_escape_string($con, (int)$request->data->idade);
  $sexo = mysqli_real_escape_string($con, (int)$request->data->sexo);
  $perm = mysqli_real_escape_string($con, (int)$request->data->perm);

  $sql = "
    UPDATE 
      asq 
    SET 
      codproc = $codproc,
      idade = $idade,
      sexo = $sexo,
      perm = $perm 
    WHERE id = $id
  ";

  if (mysqli_query($con, $sql)) {
    http_response_code(204);
  } else {
    return http_response_code(422);
  }
}
