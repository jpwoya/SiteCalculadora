document.getElementById('form-financiamento').addEventListener('submit', function (e) {
  e.preventDefault();

  const valor = parseFloat(document.getElementById('valor').value);
  const taxa = parseFloat(document.getElementById('taxa').value) / 100;
  const prazo = parseInt(document.getElementById('prazo').value);

  if (taxa <= 0 || prazo <= 0 || valor <= 0) {
    document.getElementById('resultado').innerHTML = "<p>Preencha todos os campos corretamente.</p>";
    return;
  }

  const parcela = valor * (taxa / (1 - Math.pow(1 + taxa, -prazo)));
  const totalPago = parcela * prazo;
  const totalJuros = totalPago - valor;

  document.getElementById('resultado').innerHTML = `
    <p>Parcela: <strong>R$ ${parcela.toFixed(2)}</strong></p>
    <p>Total pago: <strong>R$ ${totalPago.toFixed(2)}</strong></p>
    <p>Total de juros: <strong>R$ ${totalJuros.toFixed(2)}</strong></p>
  `;
});
