import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";


export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl text-black font-bold mb-6">Gestão de Funcionários e IRRF</h1>
      <EmployeeForm />
      <div className="mt-8 w-full ">
        <EmployeeTable />
      </div>
    </div>
  );
}
