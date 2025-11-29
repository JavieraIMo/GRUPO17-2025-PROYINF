// scoringController.js
// Lógica de cálculo de scoring crediticio

exports.calcularScoring = (req, res) => {
  try {
    const {
      dicom, // boolean
      pensionAlimenticia, // boolean
      ingresos, // number
      historial, // string
      antiguedad, // number
      endeudamiento // number (porcentaje)
    } = req.body;
    // DEBUG: log para ver el valor recibido de endeudamiento
    console.log('[ALARA][scoring] Valor recibido de endeudamiento:', endeudamiento, typeof endeudamiento);
    // DEBUG: logs para ver los valores recibidos de dicom y pensionAlimenticia
    console.log('[ALARA][scoring] Valor recibido de dicom:', dicom, typeof dicom);
    console.log('[ALARA][scoring] Valor recibido de pensionAlimenticia:', pensionAlimenticia, typeof pensionAlimenticia);

    // Ponderaciones máximas:
    // DICOM: 30, Pensión: 15, Ingresos: 20, Historial: 20, Antigüedad: 10, Endeudamiento: 5
    // Total máximo: 100
    const breakdown = {}; // Declaración única de breakdown

    // DICOM
      
    breakdown.scoreDICOM = !dicom ? 30 : 0; // Asignación de scoreDICOM

    // Pensión alimenticia
    breakdown.scorePension = !pensionAlimenticia ? 15 : 0;

    // Ingresos
    if (ingresos >= 1500000) breakdown.scoreIngresos = 20;
    else if (ingresos >= 800000) breakdown.scoreIngresos = 15;
    else if (ingresos >= 400000) breakdown.scoreIngresos = 10;
    else breakdown.scoreIngresos = 5;

    // Historial crediticio (acepta códigos cortos y descripciones)
    if (
      historial === 'Sin morosidades / buen comportamiento' || historial === 'bueno'
    ) {
      breakdown.scoreHistorial = 20;
    } else if (
      historial === 'Morosidades leves' || historial === 'leve'
    ) {
      breakdown.scoreHistorial = 10;
    } else if (
      historial === 'Atrasos > 30 días pero sin deudas impagas' || historial === 'atraso'
    ) {
      breakdown.scoreHistorial = 5;
    } else if (
      historial === 'Mal historial (moroso frecuente)' || historial === 'malo'
    ) {
      breakdown.scoreHistorial = 0;
    } else {
      breakdown.scoreHistorial = 0;
    }

    // Antigüedad laboral
    if (antiguedad >= 5) breakdown.scoreAntiguedad = 10;
    else if (antiguedad >= 2) breakdown.scoreAntiguedad = 7;
    else if (antiguedad >= 1) breakdown.scoreAntiguedad = 4;
    else breakdown.scoreAntiguedad = 0;

    // Endeudamiento proporcional (menor % = mayor puntaje)
    if (endeudamiento < 20) breakdown.scoreEndeudamiento = 5;
    else if (endeudamiento < 40) breakdown.scoreEndeudamiento = 4;
    else if (endeudamiento < 60) breakdown.scoreEndeudamiento = 3;
    else if (endeudamiento < 80) breakdown.scoreEndeudamiento = 2;
    else if (endeudamiento <= 100) breakdown.scoreEndeudamiento = 1;
    else breakdown.scoreEndeudamiento = 0;

    // Score es la suma exacta de los valores de breakdown
    const scoringFinal = Object.values(breakdown).reduce((acc, val) => acc + val, 0);

    // Nuevo: lógica de umbral variable según monto solicitado
    const monto = req.body.montoSolicitado || 0;
    let estado = "rechazado";

    if (monto <= 300000) {
      if (scoringFinal >= 55) estado = "aprobado";
      else if (scoringFinal >= 45) estado = "condicionado";
      else estado = "rechazado";
    } else if (monto <= 3000000) {
      if (scoringFinal >= 65) estado = "aprobado";
      else if (scoringFinal >= 55) estado = "condicionado";
      else estado = "rechazado";
    } else if (monto <= 10000000) {
      if (scoringFinal >= 75) estado = "aprobado";
      else if (scoringFinal >= 65) estado = "condicionado";
      else estado = "rechazado";
    } else {
      if (scoringFinal >= 85) estado = "aprobado";
      else if (scoringFinal >= 75) estado = "condicionado";
      else estado = "rechazado";
    }

    res.json({
      ok: true,
      scoring: scoringFinal,
      breakdown,
      estado,
      monto: monto,
      dicom,
      pensionAlimenticia,
      ingresos,
      historial,
      antiguedad,
      endeudamiento
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: 'Error al calcular scoring.' });
  }
}

