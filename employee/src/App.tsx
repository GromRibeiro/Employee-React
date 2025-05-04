import { Toaster } from 'react-hot-toast';
import Home from "./pages/Home";


export default function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Home />;
    </>
  ) 
  
}