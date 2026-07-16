const form = document.getElementById('form-gasto');
const lista = document.getElementById('lista-gastos');
const totalEl = document.getElementById('total');
let gastos = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  gastos.push({
    id: Date.now(),
    descripcion: document.getElementById('descripcion').value,
    monto: parseFloat(document.getElementById('monto').value)
  });
  form.reset();
  render();
});

function render() {
  lista.innerHTML = '';
  let total = 0;
  gastos.forEach(g => {
    total += g.monto;
    const li = document.createElement('li');
    li.textContent = `${g.descripcion} — $${g.monto.toFixed(2)}`;
    lista.appendChild(li);
  });
  totalEl.textContent = total.toFixed(2);
}