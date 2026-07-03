import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PrintView } from './components/PrintView.tsx'
import { InventoryIndex } from './components/InventoryIndex.tsx'
import { vehicles, getVehicleByVin } from './data/vehicles'

const params = new URLSearchParams(window.location.search);
const vin = params.get('vin');
const isPrintView = params.get('print') === '1';
const record = getVehicleByVin(vin);

let content;
if (record && isPrintView) {
  content = <PrintView record={record} />;
} else if (record) {
  content = <App record={record} />;
} else {
  content = <InventoryIndex records={vehicles} />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {content}
  </StrictMode>,
)
