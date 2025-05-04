export function calculateIRRF(
    salarioBruto: number,
    descontoINSS: number,
    dependentes: number
  ): { salarioBaseIR: number; descontoIRRF: number } {
    const deducaoPorDependente = 189.59;
    const salarioBaseIR = salarioBruto - descontoINSS - dependentes * deducaoPorDependente;
  
    const faixas = [
      { ate: 2259.20, aliquota: 0, deduzir: 0 },
      { ate: 2826.65, aliquota: 0.075, deduzir: 169.44 },
      { ate: 3751.05, aliquota: 0.15, deduzir: 381.44 },
      { ate: 4664.68, aliquota: 0.225, deduzir: 662.77 },
      { ate: Infinity, aliquota: 0.275, deduzir: 896.00 },
    ];
  
    const faixa = faixas.find(f => salarioBaseIR <= f.ate)!;
  
    const descontoIRRF = Math.max(salarioBaseIR * faixa.aliquota - faixa.deduzir, 0);
  
    return {
      salarioBaseIR: parseFloat(salarioBaseIR.toFixed(2)),
      descontoIRRF: parseFloat(descontoIRRF.toFixed(2)),
    };
  }