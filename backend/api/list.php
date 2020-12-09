<?php
require 'connect.php';

$asq = [];

$sql = "
  SELECT 
    * 
  FROM 
    asq
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
} else {
  http_response_code(404);
}
