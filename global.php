<?php
if (file_exists('classes/.env.php')) {
  require_once 'classes/.env.php';
} 

function carregarClasse($nomeClasse)
{
  if (file_exists('classes/' . $nomeClasse . '.php')) {
    require_once 'classes/' . $nomeClasse . '.php';
  } else if (file_exists('classes/' . $nomeClasse . '.php')) {
    require_once 'classes/' . $nomeClasse . '.php';
  }
}
spl_autoload_register('carregarClasse');


$conexao = Conexao::pegarConexao();
