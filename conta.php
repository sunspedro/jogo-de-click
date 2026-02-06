<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="login.css">
  <title>Login</title>
</head>
<body>
  <div class="geral">
    <div class="direita">
      <img src="https://picsum.photos/200/300">
    </div>
    <div class="esquerda">
      <div class="formulario">
        <h2 class="form-title">Jogo de click!</h2>
        <form method="post" action="verificaLogin.php">
          <div class="info-login">
            <label class="label" for="senha">Nome de usuario</label>
            <input type="text" autocomplete="none" name="usuario" required>
          </div>
          <div class="info-login">
            <label class="label" for="senha">Senha</label>
            <input type="password" autocomplete="new-password" name="senha" required>
          </div>
          <div class="info-login">
            <label class="label" for="senha">Repetir a senha</label>
            <input type="password" autocomplete="new-password" name="senha2" required>
          </div>
          <button type="submit">Entrar</button>
          <a href="index.php">Já tenho conta</a>
      </form>
      </div>
    </div>
  </div>
</body>
</html>
