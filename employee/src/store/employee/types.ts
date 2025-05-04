export interface Employee {
    id: string;
    nome: string;
    cpf: string;
    salarioBruto: number;
    descontoINSS: number;
    dependentes: number;
    salarioBaseIR: number;
    descontoIRRF: number;
  }