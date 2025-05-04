import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { createEmployee, updateEmployee } from "../store/employee/slice";
import { Employee } from '../store/employee/types';
import { calculateIRRF } from '../utils/calculations';
import { UserIcon } from '@heroicons/react/24/outline'

interface Props {
  existentEmployee?: Employee | null;
  onFinish?: () => void;
}

export default function EmployeeForm({ existentEmployee = null, onFinish }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    salarioBruto: "",
    descontoINSS: "",
    dependentes: "",
  });

  const [erro, setErro] = useState("");

  useEffect(() => {
    if (existentEmployee) {
      setForm({
        nome: existentEmployee.nome,
        cpf: existentEmployee.cpf,
        salarioBruto: existentEmployee.salarioBruto.toString(),
        descontoINSS: existentEmployee.descontoINSS.toString(),
        dependentes: existentEmployee.dependentes.toString(),
      });
    }
  }, [existentEmployee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const formValidate = () => {
    const { nome, cpf, salarioBruto, descontoINSS, dependentes } = form;
    if (!nome || !cpf || !salarioBruto || !descontoINSS || !dependentes) {
      return "Preencha todos os campos.";
    }
    if (!/^\d{11}$/.test(cpf)) {
      return "CPF deve conter exatamente 11 dígitos numéricos.";
    }
    if (Number(salarioBruto) < 0 || Number(descontoINSS) < 0 || Number(dependentes) < 0) {
      return "Valores não podem ser negativos.";
    }
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const erroValidacao = formValidate();
    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    const payload = {
      id: existentEmployee?.id || '',
      nome: form.nome,
      cpf: form.cpf,
      salarioBruto: Number(form.salarioBruto),
      descontoINSS: Number(form.descontoINSS),
      dependentes: Number(form.dependentes),
    };

    if (existentEmployee) {
      const { salarioBaseIR, descontoIRRF } = calculateIRRF(
        Number(form.salarioBruto),
        Number(form.descontoINSS),
        Number(form.dependentes)
      );
    
      dispatch(updateEmployee({
        id: existentEmployee.id,
        nome: form.nome,
        cpf: form.cpf,
        salarioBruto: Number(form.salarioBruto),
        descontoINSS: Number(form.descontoINSS),
        dependentes: Number(form.dependentes),
        salarioBaseIR,
        descontoIRRF,
      }));
    } else {
      dispatch(createEmployee(payload));
    }

    if (!existentEmployee) {
      setForm({
        nome: "",
        cpf: "",
        salarioBruto: "",
        descontoINSS: "",
        dependentes: "",
      });
    }

    setErro("");
    if (onFinish) onFinish();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white text-black p-6 rounded-sm shadow-md space-y-4 max-w-lg w-full">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">
          {existentEmployee ? "Editar Funcionário" : "Cadastrar Funcionário"}
        </h2>
        <UserIcon className="size-6 text-black" />
      </div>
      <div className="mt-2">
        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-fuchsia-800">
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 "
          />
        </div>
      </div>
      <div className="mt-2">
        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-fuchsia-800">
          <input
            type="text"
            name="cpf"
            placeholder="CPF (apenas números)"
            value={form.cpf}
            onChange={handleChange}
            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          />
        </div>
      </div>
      <div className="mt-2">
        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-fuchsia-800">
          <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">R$</div>
            <input
              type="number"
              name="salarioBruto"
              placeholder="Salário Bruto"
              value={form.salarioBruto}
              onChange={handleChange}
              className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
            />
          </div>
       </div>
      <div className="mt-2">
        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-fuchsia-800">
          <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">R$</div>
            <input
            type="number"
            name="descontoINSS"
            placeholder="Desconto INSS"
            value={form.descontoINSS}
            onChange={handleChange}
            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
            />
          </div>
        </div>
      <div className="mt-2">
        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-fuchsia-800">
          <input
            type="number"
            name="dependentes"
            placeholder="Número de Dependentes"
            value={form.dependentes}
            onChange={handleChange}
            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          />
        </div>
      </div>
      {erro && <p className="text-red-600 text-sm">{erro}</p>}

      <button
        type="submit"
        className="bg-fuchsia-800 text-white px-4 py-2 rounded hover:bg-fuchsia-600 transition w-full"
      >
        {existentEmployee ? "Salvar Alterações" : "Adicionar Funcionário"}
      </button>
    </form>
  );
}
