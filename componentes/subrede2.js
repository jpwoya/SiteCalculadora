function calcular(event) {
  event.preventDefault();

  const ip = document.getElementById("ip").value.trim();
  const cidr = parseInt(document.getElementById("cidr").value);
  const resultado = document.getElementById("resultado");

  if (!validarIP(ip) || cidr < 1 || cidr > 32) {
    resultado.innerHTML = "⚠️ IP ou CIDR inválido.";
    resultado.style.display = "block";
    return;
  }

  const [rede, primeiro, ultimo, broadcast, hosts] = calcularSubrede(ip, cidr);

  resultado.innerHTML = `
    <strong>Endereço de rede:</strong> ${rede}<br>
    <strong>Primeiro IP válido:</strong> ${primeiro}<br>
    <strong>Último IP válido:</strong> ${ultimo}<br>
    <strong>Broadcast:</strong> ${broadcast}<br>
    <strong>Hosts disponíveis:</strong> ${hosts}
  `;
  resultado.style.display = "block";
}

function validarIP(ip) {
  return /^(\d{1,3}\.){3}\d{1,3}$/.test(ip) &&
         ip.split('.').every(oct => parseInt(oct) >= 0 && parseInt(oct) <= 255);
}

function ipParaBinario(ip) {
  return ip.split('.').map(oct => parseInt(oct).toString(2).padStart(8, '0')).join('');
}

function binarioParaIp(bin) {
  const partes = bin.match(/.{1,8}/g);
  return partes.map(b => parseInt(b, 2)).join('.');
}

function calcularSubrede(ip, cidr) {
  const binarioIp = ipParaBinario(ip);
  const redeBin = binarioIp.substring(0, cidr).padEnd(32, '0');
  const broadcastBin = binarioIp.substring(0, cidr).padEnd(32, '1');

  const rede = binarioParaIp(redeBin);
  const broadcast = binarioParaIp(broadcastBin);

  const primeiro = cidr === 32 ? rede : binarioParaIp((BigInt('0b' + redeBin) + 1n).toString(2).padStart(32, '0'));
  const ultimo = cidr === 32 ? rede : binarioParaIp((BigInt('0b' + broadcastBin) - 1n).toString(2).padStart(32, '0'));
  const hosts = cidr === 32 ? 1 : (2 ** (32 - cidr)) - 2;

  return [rede, primeiro, ultimo, broadcast, hosts];
}
