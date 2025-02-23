import { useEffect, useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import TableList from './components/TableList'
import ModelForm from './components/ModelForm'
import axios from 'axios'

function App() {
  const [isOpen,setIsOpen] = useState(false);
  const [modalMode,setModalMode] = useState('add');
  const [searchTerm,setSearchTerm] = useState('');
  const [clientData,setClientData] = useState(null);
  const [tableData,setTableData] = useState([]);

  const fetchClients = async () => {
    try{
      const response = await axios.get('http://localhost:3000/api/clients');
      setTableData(response.data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    fetchClients();
  }, []);

  const handleOpen = (mode,client) => {
    setIsOpen(true);
    setModalMode(mode);
    setClientData(client);
  }

  const handleSubmit = async(newClientData) => {
    if(modalMode == 'add'){
      try{
        const response = await axios.post('http://localhost:3000/api/clients',newClientData);
        setTableData((prevData) => [...prevData, response.data]);
      } catch (err) {
        console.log("updated")
      }
    } else{
      console.log('Updating client with ID:', clientData.id); // Log the ID being updated
      try {
        const response = await axios.put(`http://localhost:3000/api/clients/${clientData.id}`, newClientData);
        console.log('Client updated:', response.data);
        setTableData((prevData) =>
          prevData.map((client) => (client.id === clientData.id ? response.data : client))
        );
      } catch (error) {
        console.error('Error updating client:', error); 
      }
    }
  }

  return (
    <>
      <NavBar onOpen={() => handleOpen('add')}  onSearch={setSearchTerm} />
      <TableList setTableData={setTableData} tableData={tableData}
      handleOpen={handleOpen} searchTerm={searchTerm}/>
      <ModelForm
        isOpen={isOpen} OnSubmit={handleSubmit}
        onClose={() => setIsOpen(false)}
        mode={modalMode} clientData={clientData}
      />
    </>
  )
}

export default App
