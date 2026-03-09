import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
    
ModuleRegistry.registerModules([ AllCommunityModule ]);

const Contacts = () => {
  const [rowData, setRowData] = useState([]);

  // Function to get all contacts on initial rendering, and after editing the spreadsheet
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const baseUrl = import.meta.env.VITE_BACKEND_URL || '';
      const apiPath = `${baseUrl}/get-contacts`;
      const response = await fetch(apiPath, {
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }

      const data = await response.json();
      const contacts = data["data"];

      setRowData(contacts);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // fetch initial contacts from backend
  useEffect(() => {
    fetchData();
  }, []);

  const [columnDefs] = useState([
    { field: 'name', headerName: 'Name', editable: true },
    { field: 'email', headerName: 'Email', editable: true },
    { field: 'phone', headerName: 'Phone', editable: true },
  ]);

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{
          flex: 1,
          minWidth: 100,
        }}
      />
    </div>
  );
};

export default Contacts;
