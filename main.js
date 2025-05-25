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

function previewHTML() {
  const iframe = document.createElement('iframe');
  iframe.style.width = '100%';
  iframe.style.height = '90vh';
  iframe.style.marginTop = '2rem';
  iframe.style.border = '1px solid #ccc';

  const blob = new Blob([gerarHTMLString()], { type: 'text/html' });
  iframe.src = URL.createObjectURL(blob);
  document.body.appendChild(iframe);
}

function gerarHTMLString() {
  let html = window.__templateRaw__;

  const replacements = {
    '{{VALOR_PAGAMENTO}}': document.getElementById('valor').value,
    '{{PIXEL_ID}}': document.getElementById('pixel').value,
    '{{URL_REDIRECT}}': document.getElementById('redirect').value,
    '{{BANNER_ATIVO}}': document.getElementById('bannerAtivo').value,
    '{{CONTADOR_ATIVO}}': document.getElementById('contadorAtivo').value,
    '{{TEMPO_CONTADOR}}': document.getElementById('tempoContador').value,
    '{{COR_TEXTO}}': document.getElementById('corTexto').value,
    '{{COR_BACKGROUND_CONTAINER}}': document.getElementById('corFundoContainer').value
  };

  for (const [chave, valor] of Object.entries(replacements)) {
    const regex = new RegExp(chave, 'g');
    html = html.replace(regex, valor);
  }

  return html;
}

(async function carregarTemplate() {
  const res = await fetch('template.html');
  const text = await res.text();
  window.__templateRaw__ = text;
})();

