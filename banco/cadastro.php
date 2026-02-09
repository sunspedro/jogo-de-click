<?php

require_once './global.php';
require_once 'classes/conexao.php';

$conn = Conexao::pegarConexao();

$usuario = $_POST['usuario'];
$senha = $_POST['senha'];
$senha2 = $_POST['senha2'];

if ($senha != $senha2) {
    echo "As senhas não coincidem";
    exit;
}

$sql = "INSERT INTO Usuarios (nome, senha)
        VALUES (:usuario, :senha)";

$stmt = $conn->prepare($sql);

$stmt->bindParam(':usuario', $usuario);
$stmt->bindParam(':senha', $senha);

$stmt->execute();
