document.getElementById('form-juros').addEventListener('submit', function (e) {
  e.preventDefault();
  const capital = parseFloat(document.getElementById('capital').value);
  const taxa = parseFloat(document.getElementById('taxa').value) / 100;
  const tempo = parseFloat(document.getElementById('tempo').value);

  const juros = capital * taxa * tempo;
  const total = capital + juros;

  document.getElementById('resultado').innerHTML = `
    <p>Juros: R$ ${juros.toFixed(2)}</p>
    <p>Total: R$ ${total.toFixed(2)}</p>
  `;
});
