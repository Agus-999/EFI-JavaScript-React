import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import './App.css';

// Usuarios
import CreateUser from './components/Users/CreateUser';
import UserContainer from './components/Users/UsersContainer';
import LoginUser from './components/Users/LoginUser';
import EditUser from './components/Users/EditUser'; // Importa el componente de edición

// Marcas
import MarcasContainer from './Components/Marcas/MarcasConteiner'; // Asegúrate de que el archivo MarcasContainer.jsx esté correctamente importado
import EditarMarca from './Components/Marcas/EditarMarca';

// Tipos
import TiposContainer from './Components/Tipos/TiposContainer.jsx';
import EditarTipo from './Components/Tipos/EditarTipo.jsx';

// Vehiculos
// import VehiculosContainer from './Components/Vehiculos/VehiculosConteiner.jsx'; // Corregido: "VehiculosContainer"
// import EditarVehiculo from './Components/Vehiculos/EditarVehiculo.jsx'; // Corregido: "EditarVehiculo"

function App() {
  // Elementos de la barra de menús
  const items = [
    { label: 'Home', icon: 'pi pi-home', url: '/' },
    { label: 'Usuarios', icon: 'pi pi-users', url: '/usuarios' },
    { label: 'Inicio Sesión', icon: 'pi pi-sign-in', url: '/inicio-sesion' },
    { label: 'Nuevo Usuario', icon: 'pi pi-user-plus', url: '/nuevo-usuario' },
    { label: 'Marcas', icon: 'pi pi-cog', url: '/marcas' }, // Icono cambiado para mejor representación
    { label: 'Tipos', icon: 'pi pi-cog', url: '/tipos' },
    // { label: 'Vehículos', icon: 'pi pi-car', url: '/vehiculos' }
  ];

  return (
    <BrowserRouter>
      {/* Menú de navegación */}
      <Menubar model={items} />

      {/* Rutas de la aplicación */}
      <Routes>
        <Route path="/" element={<h2>Bienvenido a la página principal</h2>} />
        
        {/* Usuarios */}
        <Route path="/usuarios" element={<UserContainer />} />
        <Route path="/nuevo-usuario" element={<CreateUser />} />
        <Route path="/inicio-sesion" element={<LoginUser />} />
        <Route path="/edit-user/:userId" element={<EditUser />} /> {/* Ruta para editar usuario */}
        
        {/* Marcas */}
        <Route path="/marcas" element={<MarcasContainer />} /> {/* Ruta para el componente de marcas */}
        <Route path='/editar-marca/:id' element={<EditarMarca />} />
        
        {/* Tipos */}
        <Route path="/tipos" element={<TiposContainer />} />
        <Route path='/editar-tipo/:id' element={<EditarTipo />} />
        
        {/* Vehiculos */}
        {/* <Route path="/vehiculos" element={<VehiculosContainer />} />
        <Route path="/editar-vehiculo/:id" element={<EditarVehiculo />} /> */}
      </Routes>

      {/* Pie de página */}
      <footer>
        <h2>EFI-Fasano</h2>
      </footer>
    </BrowserRouter>
  );
}

export default App;
