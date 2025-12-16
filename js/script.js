// ---------- MÁSCARA CPF ----------
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

// ---------- ENVIO COM RECAPTCHA ----------
document.getElementById('form-cpf').addEventListener('submit', async function (e) {
  e.preventDefault();
  const cleaned = cpfInput.value.replace(/\D/g, '');
  if (cleaned.length !== 11){ alert('CPF inválido'); return; }

  await grecaptcha.ready();
  const token = await grecaptcha.execute('6LcyLCosAAAAAIDEKRlketKSPHZdL-BMfcRZT8dF', {action: 'submit'});

  // numero ofuscado (55 11 95639-1683)
  const hash = 'NTUxMTk1NjM5MTY4Mw=='; // base64 de 5511956391683
  const tel  = atob(hash);
  const msg  = `Olá, quero a 2ª via do boleto – CPF ${cleaned}`;
  window.open(`https://wa.me/${tel}?text=${encodeURIComponent(msg)}`, '_blank');
});
// alteracao-forcada-git-999
