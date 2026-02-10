<?php

if (file_exists('../classes/.env.php')) {
    require_once '../classes/.env.php';
    echo 'passou';
} else if(file_exists('classes/.env.php')){
    require_once 'classes/.env.php';
}
else {
    echo 'nao passou';
}

function carregarClasse($nomeClasse)
{
    require_once 'classes/' . $nomeClasse . '.php';
}

spl_autoload_register('carregarClasse');

$conexao = Conexao::pegarConexao();
