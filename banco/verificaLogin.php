<?php

session_start();

require_once 'global.php';
require_once 'classes/conexao.php';

$conn = Conexao::pegarConexao();

$usuario = $_POST['usuario'];
$senha = $_POST['senha'];

$sql = "SELECT id, NOME FROM Usuarios 
        WHERE NOME = :usuario 
        AND SENHA = :senha";

$stmt = $conn->prepare($sql);

$stmt->bindParam(':usuario', $usuario);
$stmt->bindParam(':senha', $senha);

$stmt->execute();

$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {

    $_SESSION['usuario'] = $user['NOME'];
    $_SESSION['id'] = $user['id'];

    header("Location: jogo.php");
    exit;

} else {

    ;
    exit;

}
