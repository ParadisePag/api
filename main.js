function gerarArquivo() {
  const nome = document.getElementById("nomeProduto").value;
  const valor = document.getElementById("valor").value;
  const pixel = document.getElementById("pixel").value;
  const offerHash = document.getElementById("offerHash").value;
  const productHash = document.getElementById("productHash").value;
  const mensagem = document.getElementById("mensagem").value;

  const htmlGerado = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>${nome}</title>
  <script>
    const VALOR_PAGAMENTO = ${valor};
    const PIXEL_ID = "${pixel}";
    const OFFER_HASH = "${offerHash}";
    const PRODUCT_HASH = "${productHash}";
    const MENSAGEM_CONFIRMACAO = \`${mensagem}\`;
  </script>
  <!-- Resto do conteúdo do gerador.html real aqui -->
</head>
<body>
  <p>${mensagem}</p>
</body>
</html>`;

  const blob = new Blob([htmlGerado], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "gerador.html";
  a.click();
  URL.revokeObjectURL(url);
}
