<?php

$name = $_POST['usuario'];
$senha = $_POST['senha'];
$senha2 = $_POST['senha2'];

if ($senha == $senha2 && $senha1 != NULL && $usuario != NULL) {
  echo 'deu certo';
}
else{
  echo 'deu errado';
}
