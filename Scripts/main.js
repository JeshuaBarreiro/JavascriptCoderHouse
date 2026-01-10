function pedirMonto() {
    let monto = parseFloat(prompt("Ingrese el monto del producto:"));

    if (isNaN(monto)) {
        alert("Eso no es un número");
        return pedirMonto();
    }

    if (monto <= 0) {
        alert("El monto debe ser mayor a 0");
        return pedirMonto();
    }

    return monto;
}
function pedirCuotas() {
    let cuotas = parseInt(prompt(
        "Elija la cantidad de cuotas:\n" +
        "1) 3 cuotas (15% interés)\n" +
        "2) 6 cuotas (30% interés)\n" +
        "3) 12 cuotas (60% interés)"
    ));
    if (cuotas !== 1 && cuotas !== 2 && cuotas !== 3) {
        alert("Opción inválida.");
        return pedirCuotas();
    }
    if (cuotas === 1) return { cuotas: 3, interes: 1.15 };
    if (cuotas === 2) return { cuotas: 6, interes: 1.30 };
    if (cuotas === 3) return { cuotas: 12, interes: 1.55 };
}
function mostrarResultado(monto, cuotas, total, valorCuota) {
    console.log("----- RESULTADO -----");
    console.log("Monto solicitado:", monto);
    console.log("Cuotas:", cuotas);
    console.log("Total a pagar:", total);
    console.log("Monto por cuota:", valorCuota);
    alert(
        "RESULTADO:\n\n" +
        "Monto: $" + monto + "\n" +
        "Cuotas: " + cuotas + "\n" +
        "Total a pagar: $" + total + "\n" +
        "Cada cuota: $" + valorCuota
    );
}
function simulador() {

    let continuar = true;

    while (continuar) {

        let monto = pedirMonto();
        let cantidadCuotas = pedirCuotas();
        let total = monto * cantidadCuotas.interes;
        let valorCuota = (total / cantidadCuotas.cuotas).toFixed(2);
        mostrarResultado(monto, cantidadCuotas.cuotas, total, valorCuota);
        continuar = confirm("¿Querés simular otro producto?");
    }

    alert("Gracias por usar el simulador.");
}
simulador();