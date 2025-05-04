import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { formatCPF } from "../utils/formatCPF";
import { deleteEmployee } from "../store/employee/slice";
import { Employee } from '../store/employee/types';
import EditModal from './EditModal';
import EmployeeForm from './EmployeeForm';
import { useState } from "react";

import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline'
import ConfirmDialog from "./ConfirmDialog";

export default function EmployeeTable() {
  const dispatch = useDispatch<AppDispatch>();

  const [modalOpen, setModalOpen] = useState(false);
  const [employeeEdit, setEmployeeEdit] = useState<Employee | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [idDelete, setIdDelete] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setIdDelete(id);
    setConfirmDelete(true);
  };

  const confirmEmployeeDelete = () => {
    if (idDelete) {
      dispatch(deleteEmployee(idDelete));
    }
    setIdDelete(null);
    setConfirmDelete(false);
  };

  const handleEditar = (employee: Employee) => {
    setEmployeeEdit(employee);
    setModalOpen(true);
  };

  const employee = useSelector((state: RootState) => state.employee.employee);

  const [filtroNome, setFiltroNome] = useState("");
  const [filtroCpf, setFiltroCpf] = useState("");

  const filterEmployee = employee.filter((f) => {
    return (
      f.nome.toLowerCase().includes(filtroNome.toLowerCase()) &&
      f.cpf.replace(/\D/g, '').includes(filtroCpf.replace(/\D/g, ''))
    );
  });

  return (
    <div className="bg-white p-4 rounded-sm shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-black">Funcionários Cadastrados</h2>
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="mt-2">
          <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-fuchsia-800">
            <input
              type="text"
              placeholder="Filtrar por nome"
              value={filtroNome}
              onChange={(e) => setFiltroNome(e.target.value)}
              className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 md:w-1/2"
            />
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-fuchsia-800">
            <input
              type="text"
              placeholder="Filtrar por CPF"
              value={filtroCpf}
              onChange={(e) => setFiltroCpf(e.target.value)}
              className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 md:w-1/2"
            />
          </div>
        </div>    
        
        <button
            onClick={() => {
              setFiltroNome('');
              setFiltroCpf('');
            }}
            className="px-4 py-2 bg-red-500  rounded hover:bg-red-600 w-fit"
          >
            <TrashIcon className="size-5 text-white" />
        </button>
      </div>

      {filterEmployee.length === 0 ? (
        <p className="text-gray-500">Nenhum funcionário encontrado.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-center">
            <thead>
              <tr className="border-b">
                <th className="p-2">Nome</th>
                <th className="p-2">CPF</th>
                <th className="p-2">Salário Bruto</th>
                <th className="p-2">INSS</th>
                <th className="p-2">Dependentes</th>
                <th className="p-2">Base IR</th>
                <th className="p-2">IRRF</th>
                <th className="p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filterEmployee.map((f) => (
                <tr key={f.id} className="border-b">
                  <td className="p-2">{f.nome}</td>
                  <td className="p-2">{formatCPF(f.cpf)}</td>
                  <td className="p-2">R$ {f.salarioBruto.toFixed(2)}</td>
                  <td className="p-2">R$ {f.descontoINSS.toFixed(2)}</td>
                  <td className="p-2">{f.dependentes}</td>
                  <td className="p-2">R$ {f.salarioBaseIR.toFixed(2)}</td>
                  <td className="p-2">R$ {f.descontoIRRF.toFixed(2)}</td>
                  <td className="p-2 flex-wrap space-x-2 ">
                    <button
                      onClick={() => handleEditar(f)}
                      className="px-2 py-1 text-sm bg-fuchsia-800 text-white rounded hover:bg-fuchsia-600"
                    >
                      <PencilIcon className="size-6 text-white" />
                    </button>
                    <button
                      onClick={() => handleDelete(f.id)}
                      className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      <TrashIcon className="size-6 text-white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <EditModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <EmployeeForm
          existentEmployee={employeeEdit}
          onFinish={() => {
            setModalOpen(false);
            setEmployeeEdit(null);
          }}
        />
      </EditModal>
      <ConfirmDialog
        isOpen={confirmDelete}
        mensagem="Tem certeza que deseja excluir este funcionário?"
        onCancel={() => setConfirmDelete(false)}
        onConfirm={confirmEmployeeDelete}
      />
    </div>
    
  );
}
