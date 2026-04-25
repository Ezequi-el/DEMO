# SAFEFY - Plataforma de Seguridad Digital para Menores

SAFEFY es una solución integral diseñada para proteger a los menores en el entorno digital, fomentando hábitos saludables a través de la gamificación y permitiendo una supervisión activa y preventiva por parte de tutores.

## 🚀 Propósito del Proyecto

El objetivo principal de SAFEFY es crear un puente de confianza entre menores y tutores, transformando la supervisión digital de una tarea restrictiva a una experiencia educativa y gratificante. La plataforma utiliza inteligencia artificial para detectar riesgos en tiempo real y un sistema de recompensas para incentivar el buen comportamiento digital.

## 👥 Roles de Usuario

### 🧒 Menor (Minor)
- **Dashboard Gamificado:** Visualización de puntos, rachas de uso responsable y niveles.
- **Entorno Seguro:** Acceso a aplicaciones verificadas y seguras.
- **Historial de Uso:** Transparencia sobre el tiempo dedicado a cada aplicación.
- **Sistema de Premios:** Canje de puntos obtenidos por beneficios acordados con el tutor.
- **Educación:** Sección dedicada al aprendizaje sobre seguridad digital.

### 🛡️ Tutor (Guardian)
- **Panel de Supervisión:** Monitoreo en tiempo real de la actividad y tiempo de pantalla.
- **Alertas Críticas:** Notificaciones instantáneas sobre riesgos detectados por IA (grooming, contenido violento, estafas, etc.).
- **Gestión de Premios:** Creación y activación de recompensas personalizadas.
- **Vinculación Segura:** Emparejamiento rápido con dispositivos de menores mediante código QR.
- **Configuración de Límites:** Establecimiento de horarios y restricciones de uso.

### 🏛️ Autoridad (Authority)
- Panel diseñado para supervisión de alto nivel o reportes institucionales (disponible en modo demo).

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React 19, TypeScript, Vite.
- **Estilos:** Tailwind CSS v4 (máximo rendimiento y personalización).
- **Animaciones:** Framer Motion (para una interfaz fluida y moderna).
- **Iconografía:** Lucide React.
- **Estado Global:** Zustand (gestión de estado ligera y eficiente).
- **IA:** Integración con Google Generative AI (`@google/genai`) para análisis de contenido (simulado en fase demo).
- **Efectos:** Canvas Confetti para celebraciones de logros.

## 🧠 Características Técnicas Destacadas

- **Análisis de Contenido con IA:** Servicio dedicado (`aiService.ts`) para categorizar y puntuar el riesgo de interacciones digitales.
- **Sincronización Local:** Simulación de comunicación constante entre dispositivos para actualizaciones en tiempo real.
- **Diseño Mobile-First:** Interfaz optimizada para dispositivos móviles con navegación intuitiva y táctil.

## 🏃‍♂️ Cómo Empezar

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Acceder a la aplicación (por defecto en `http://localhost:3000`).

---
*Este proyecto es una demostración funcional de una plataforma de seguridad digital avanzada.*
