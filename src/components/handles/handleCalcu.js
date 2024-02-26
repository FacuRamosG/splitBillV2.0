export const handleCalcu = (formData, items) => {
    const totalComidaPerPerson = formData.totalComida / formData.personComida || 0;
    const totalBebidaPerPerson = formData.totalBebida / formData.personBebida || 0;
    const totalOtherPerPerson = formData.totalOther / formData.personOther || 0;
    const totalAlcoholPerPerson = formData.totalAlcohol / formData.personAlcohol || 0;

    const newPayPerson = items.map((item) => {
      let totalAbonadoComida = 0;
      let diferenciaComida = 0;
      let totalAbonadoBebida = 0;
      let diferenciaBebida = 0;
      let totalAbonadoOther = 0;
      let diferenciaOther = 0;
      let totalAbonadoAlcohol = 0;
      let diferenciaAlcohol = 0;

      
        totalAbonadoComida = parseInt(item.comida.amountComida || 0);
        diferenciaComida = item.comida.comidaTake ? (totalComidaPerPerson - totalAbonadoComida) : -totalAbonadoComida;
      
      
        totalAbonadoBebida = parseInt(item.bebida.amountBebida || 0);
        diferenciaBebida = item.bebida.bebidaTake ? (totalBebidaPerPerson - totalAbonadoBebida) : -totalAbonadoBebida;        
      
      
        totalAbonadoOther = parseInt(item.other.amountOther || 0);
        diferenciaOther = item.other.other ? (totalOtherPerPerson - totalAbonadoOther) : -totalAbonadoOther;
      
      
        totalAbonadoAlcohol = parseInt(item.alcohol.amountAlcohol || 0);
        diferenciaAlcohol = item.alcohol.alcohol ? (totalAlcoholPerPerson - totalAbonadoAlcohol) : -totalAbonadoAlcohol;
      

      return {
        id: item.id,
        person: item.person,
        color: item.color,
        comida: {
          totalAbonadoComida,
          diferenciaComida,
        },
        bebida: {
          totalAbonadoBebida,
          diferenciaBebida,
        },
        other: {
          totalAbonadoOther,
          diferenciaOther,
        },
        alcohol: {
          totalAbonadoAlcohol,
          diferenciaAlcohol,
        },
      };
    });


    const calcularDivisionesMinimizandoTransacciones = (amigos) => {
      let deudas = {};
    
      amigos.forEach((amigo) => {
        deudas[amigo.id] = {
          deuda: 0,
          nombre: amigo.person,
          color: amigo.color,
        }; 
      });
    
      amigos.forEach((amigo) => {
        for (const variante in amigo) {
          if (variante !== 'person' && variante !== 'id') {
            const deudaAmigo = amigo[variante]?.diferenciaComida || 0 + amigo[variante]?.diferenciaBebida || 0 + amigo[variante]?.diferenciaOther || 0 + amigo[variante]?.diferenciaAlcohol || 0;
            deudas[amigo.id].deuda += deudaAmigo;
          }
        }
      });
    
      const pagos = [];
    
      for (const amigoA in deudas) {
        for (const amigoB in deudas) {
          if (amigoA !== amigoB) {
            const deudaAmigoA = deudas[amigoA].deuda;
            const deudaAmigoB = deudas[amigoB].deuda;
    
            if (deudaAmigoA > 0 && deudaAmigoB < 0) {
              const cantidadPagar = Math.min(deudaAmigoA, -deudaAmigoB);
              deudas[amigoA].deuda -= cantidadPagar;
              deudas[amigoB].deuda += cantidadPagar;
              pagos.push({ deudor: {nombre: deudas[amigoA].nombre, color:deudas[amigoA].color}, acreedor: {nombre:deudas[amigoB].nombre, color:deudas[amigoB].color}, cantidad: cantidadPagar,id:`${amigoA}-${amigoB}` });
            }
          }
        }
      }
    
      return pagos;
    };
    
    const pagosOptimizados = calcularDivisionesMinimizandoTransacciones(newPayPerson);
    
    return pagosOptimizados
};