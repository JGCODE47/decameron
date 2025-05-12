# Frontend Plan: Hoteles Decameron de Colombia

## 1. Overview

Desarrollaremos un **frontend desacoplado** en **Next.js** para consumir el API RESTful existente en PHP/PostgreSQL. El objetivo es permitir:

* Crear, listar y editar hoteles
* Asignar tipos de habitación y acomodaciones válidas por hotel
* Validar que no se exceda el número máximo de habitaciones
* Evitar duplicados de hoteles y de combinaciones habitación-acomodación

## 2. Stack Tecnológico

* **Framework**: Next.js (React)
* **Linting/Format**: ESLint + Prettier (config `eslint-config-next`)
* **Estilos**: Tailwind CSS
* **Petición HTTP**: axios o `fetch`
* **Gestión de estados**: React hooks + SWR (opcional)
* **Formularios**: React Hook Form + Yup para validaciones

## 3. Estructura de Carpetas
Proyecto Decameron

```
decameron.com
├── public
│   └── favicon.ico
├── src
│   ├── app
│   │   ├── page.tsx           # Dashboard principal
│   │   ├── layout.tsx         # Layout global
│   │   ├── hoteles
│   │   │   ├── page.tsx       # Lista de hoteles
│   │   │   ├── nuevo
│   │   │   │   └── page.tsx   # Formulario crear hotel
│   │   │   ├── [id]
│   │   │   │   └── page.tsx   # Detalle/editar hotel + listado habitaciones
│   │   │   └── habitaciones   # Módulo habitaciones anidado en hoteles
│   │   │       ├── index.tsx        # Lista de asignaciones para el hotel
│   │   │       ├── nuevo
│   │   │       │   └── page.tsx     # Formulario crear asignaciones de habitación
│   │   │       └── [asigId]
│   │   │           └── page.tsx     # Detalle/editar asignación individual
│   │   └── habitaciones             # Módulo global de habitaciones si es necesario
│   │       ├── page.tsx             # Lista global de asignaciones
│   │       └── nuevo
│   │           └── page.tsx         # Formulario crear asignación independiente
│   ├── components
│   │   ├── HotelCard.tsx
│   │   ├── HotelForm.tsx
│   │   ├── HabitacionForm.tsx
│   │   └── Layout.tsx
├── styles
│   └── globals.css
├── .eslintrc.json
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```


## 4. Páginas y Componentes Páginas y Componentes

### 4.1 `/pages/hoteles/index.tsx`

* Obtiene lista de hoteles (GET `/api/hoteles`)
* Muestra en cards con botones `Ver` y `Editar`
* Botón `Nuevo Hotel` redirige a `/hoteles/nuevo`

### 4.2 `/pages/hoteles/nuevo.tsx`

* Formulario: nombre, dirección, ciudad, NIT, número\_habitaciones
* Validaciones con React Hook Form + Yup
* POST a `/api/hoteles`

### 4.3 `/pages/hoteles/[id].tsx`

* GET `/api/hoteles/{id}` para datos hotel
* GET `/api/habitaciones?hotel_id={id}` para lista de habitaciones
* **HotelForm** (edición) y **HabitacionForm** para agregar nuevas habitaciones
* Validar tipo vs acomodación según reglas:

  * Estándar → Sencilla, Doble
  * Junior → Triple, Cuádruple
  * Suite → Sencilla, Doble, Triple
* POST `/api/habitaciones` con `hotel_id`

## 5. Validaciones de Formulario

* **HotelForm**: todos campos requeridos, NIT formato `^[0-9]{7,}-[0-9]$`
* **HabitacionForm**:

  * `tipo`: select (estandar, junior, suite)
  * `acomodacion`: select dinámico basado en `tipo`
  * `cantidad`: integer >0

Esquema Yup ejemplo (`lib/validation.ts`):

```ts
import * as yup from 'yup';

export const hotelSchema = yup.object({
  nombre: yup.string().required(),
  direccion: yup.string().required(),
  ciudad: yup.string().required(),
  nit: yup.string().required().matches(/^[0-9]{7,}-[0-9]$/),
  numero_habitaciones: yup.number().required().min(1),
});

export const habitacionSchema = yup.object({
  tipo: yup.mixed<'estandar'|'junior'|'suite'>().required(),
  acomodacion: yup.string().required(),
  cantidad: yup.number().required().min(1),
});
```

## 6. Setup Inicial

1. Inicia el proyecto con:

   ```bash
   npx create-next-app@latest decameron.com
   cd decameron.com
   ```
2. Instala dependencias:

   ```bash
   npm install axios react-hook-form yup @hookform/resolvers swr tailwindcss postcss autoprefixer
   ```
3. Configura Tailwind CSS:

   ```bash
   npx tailwindcss init -p
   ```

   * En `globals.css`, importa los estilos de Tailwind:

     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```
4. Configura ESLint extendiendo la preset de Next.js en `.eslintrc.json`:

   ```json
   {
     "extends": ["next/core-web-vitals"]
   }
   ```
5. Crea `lib/api.ts` para el cliente Axios:

   ```ts
   import axios from 'axios';

   const api = axios.create({
     baseURL: process.env.NEXT_PUBLIC_API_URL,
   });
   export default api;
   ```

## 7. Responsive y UX Responsive y UX

* Usar Layout con contenedor centrado, max-width `2xl`
* Formularios con espaciamiento, feedback de error inline
* Diseño adaptativo: usar `sm`, `md`, `lg` en Tailwind para escalar a 13"/15"

## 8. Próximos Pasos

* Desplegar frontend en Vercel/Netlify apuntando a tu API en la nube
* Documentación UML: Diagrama de componentes y flujo de datos
* Crear dump de BD y guías de despliegue (README completo)

```bash
pg_dump -U user -h host dbname > dump.sql
```

Con este plan tienes la hoja de ruta para construir el frontend de manera **RESTful**, desacoplada y alineada con los criterios de aceptación. ¡A codificar! 🚀
