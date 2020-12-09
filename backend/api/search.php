<?php
require 'connect.php';

$postdata = file_get_contents("php://input");

$asq = [];

if (isset($postdata) && !empty($postdata)) {
  $request = json_decode($postdata);

  if ((int)$request->data->id < 1 || (int)$request->data->inputidade < 0 || (int)$request->data->selectsexo < 0) {
    return http_response_code(400);
  }

  $id = mysqli_real_escape_string($con, (int)$request->data->id);

  $sql = "
    SELECT 
      * 
    FROM 
      asq
    WHERE
      id =  $id
      AND perm = 1
  ";

  if ($result = mysqli_query($con, $sql)) {
    $cr = 0;

    while ($row = mysqli_fetch_assoc($result)) {
      $asq[$cr]['id'] = $row['id'];
      $asq[$cr]['codproc'] = $row['codproc'];
      $asq[$cr]['idade'] = $row['idade'];
      $asq[$cr]['sexo'] = $row['sexo'];
      $asq[$cr]['perm'] = $row['perm'];
      $cr++;
    }

    echo json_encode(['data' => $asq]);
  }
}
