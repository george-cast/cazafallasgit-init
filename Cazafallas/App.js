// Lista de códigos válidos
const codigosValidos = [
  "7708418878862", // CRESTA ALTA 1.06 x 3.93M
  "7708418878886"  // CRESTA ALTA 1.06 x 5.90M
];

// Iniciar el escáner
Quagga.init({
  inputStream: {
    name: "Live",
    type: "LiveStream",
    target: document.querySelector('#scanner-container'),
    constraints: {
      facingMode: "environment" // Usa cámara trasera
    }
  },
  decoder: {
    readers: ["ean_reader"]
  }
}, function(err) {
  if (err) {
    console.error(err);
    return;
  }
  Quagga.start();
});

// Detectar código y verificar
Quagga.onDetected(result => {
  const codigo = result.codeResult.code;
  const resultado = document.getElementById("resultado");

  if (codigosValidos.includes(codigo)) {
    resultado.textContent = `✅ Código válido: ${codigo}`;
    resultado.style.color = "green";
  } else {
    resultado.textContent = `❌ Código inválido: ${codigo}`;
    resultado.style.color = "red";
  }

  // Detener lectura después de detectar
  Quagga.stop();
  setTimeout(() => {
    Quagga.start();
  }, 2000);
});
