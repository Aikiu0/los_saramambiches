const form = document.getElementById('form-gasto');
const lista = document.getElementById('lista-gastos');
const totalEl = document.getElementById('total');
let gastos = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  gastos.push({
    id: Date.now(),
    descripcion: document.getElementById('descripcion').value,
    categoria: document.getElementById('categoria').value,
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
    li.textContent = `[${g.categoria}] ${g.descripcion} — $${g.monto.toFixed(2)}`;
    lista.appendChild(li);
  });
  totalEl.textContent = total.toFixed(2);
  actualizarGrafica()
}

let grafica = null;

function actualizarGrafica() {
  const porCategoria = {};
  gastos.forEach(g => {
    porCategoria[g.categoria] = (porCategoria[g.categoria] || 0) + g.monto;
  });
  if (grafica) grafica.destroy();
  grafica = new Chart(document.getElementById('grafica'), {
    type: 'pie',
    data: {
      labels: Object.keys(porCategoria),
      datasets: [{ data: Object.values(porCategoria) }]
    }
  });
}