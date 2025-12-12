// ---- MÁSCARA CPF ----
const cpfInput = document.getElementById('cpf');
cpfInput.addEventListener('input', () => {
  let v = cpfInput.value.replace(/\D/g, '');
  if (v.length > 11) v = v.slice(0, 11);
  const part1 = v.slice(0, 3);
  const part2 = v.slice(3, 6);
  const part3 = v.slice(6, 9);
  const part4 = v.slice(9, 11);
  let masked = part1;
  if (part2) masked += '.' + part2;
  if (part3) masked += '.' + part3;
  if (part4) masked += '-' + part4;
  cpfInput.value = masked;
});

// ---- REDIRECIONA ----
document.getElementById('form-cpf').addEventListener('submit', function (e) {
  e.preventDefault();
  const cleaned = cpfInput.value.replace(/\D/g, '');
  if (cleaned.length !== 11) {
    alert('CPF inválido'); return;
  }
  // Codifica CPF + número em base64 pra não ficar plain no href
  const msg = `2via ${cleaned}`;
  const tel = '5511999999999';          // <<< troque pelo seu
  const hash = btoa(`${tel}|${msg}`);   // só pra ofuscar
  // Abre WhatsApp em nova aba
  window.open(`https://wa.me/${tel}?text=${encodeURIComponent(msg)}`, '_blank');
});

