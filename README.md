# ⚛️ Vehicle & User Management System (React + TypeScript)

Una aplicación de gestión integral que utiliza una arquitectura avanzada de componentes en **React**, diseñada para administrar múltiples entidades como Vehículos, Usuarios, Marcas y Tipos. Este proyecto destaca por el uso de **TypeScript** para garantizar la seguridad de tipos y una estructura de carpetas altamente escalable.

### 🛠️ Stack Tecnológico
* **Frontend:** React.js con **TypeScript** (.tsx).
* **UI Components:** Implementación de componentes modulares y reutilizables.
* **Architecture:** Patrón de diseño *Container & View* (Separación de lógica y presentación).
* **Herramientas:** Vite / Create React App.

### 🌟 Arquitectura y Patrones Implementados
* **Type Safety:** Uso riguroso de interfaces y tipos de TypeScript para reducir errores en tiempo de desarrollo.
* **Componentización Avanzada:** * **Containers:** Manejan el estado y la lógica de negocio (ej. `UsersContainer.jsx`).
    * **Views:** Se encargan exclusivamente de la renderización visual (ej. `UsersView.jsx`).
* **Modularidad por Entidad:** Organización del código fuente dividida por dominios claros (Users, Vehiculos, Marcas, Tipos).
* **Componentes Globales:** Uso de elementos compartidos como `MyButton.jsx` y utilidades de formato como `FormatDate.jsx`.

### 📁 Estructura del Proyecto (src/)
```
src/
├── Components/
│   ├── Users/       # Gestión de perfiles y autenticación (Login, Create, Edit)
│   ├── Vehiculos/   # Administración de inventario de unidades
│   ├── Marcas/      # Control de fabricantes y marcas
│   └── Tipos/       # Categorización de entidades
├── App.tsx          # Orquestador principal y ruteo
└── main.tsx         # Punto de entrada de la aplicación
```

### 🚀 Funcionalidades Técnicas
* **Flujos de Usuario Completos: Desde el registro y edición de perfiles hasta el inicio de sesión.**

* **Gestión de Inventario Dinámica: Vistas especializadas para la creación y modificación de vehículos y sus atributos.**

* **Lógica Reutilizable: Implementación de componentes de utilidad que mantienen la consistencia visual y funcional en toda la aplicación.**

### ⚙️ Instalación y Despliegue

* **Clonar el repositorio:**
```
git clone [https://github.com/Agus-999/EFI-JavaScript-React.git](https://github.com/Agus-999/EFI-JavaScript-React.git)
```

* **Instalar dependencias:**
```
npm install
```

* **Iniciar entorno de desarrollo:**
```
npm run dev
```

Desarrollado por Agustín Alejandro Fasano Técnico Superior en Desarrollo de Software
