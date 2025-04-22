# 🛠️ Flujo de trabajo

Este proyecto está configurado para desplegar automáticamente en Netlify cuando se hacen cambios en la rama `main`.

## 📦 Rama principal

- `main`: Contiene el código en producción. Solo se debe actualizar después de probar localmente.

## 🌱 Convención de ramas

| Tipo       | Ejemplo                 | ¿Cuándo usarla?                         |
| ---------- | ----------------------- | --------------------------------------- |
| `dev/*`    | `dev/whatsapp-bot`      | Para desarrollar nuevas funcionalidades |
| `fix/*`    | `fix/validacion-litros` | Para corregir errores o bugs            |
| `hotfix/*` | `hotfix/reconexion-api` | Para cambios urgentes en producción     |

## 🔁 Flujo sugerido

1. Crear rama nueva para cada cambio:

```bash
git checkout -b dev/nombre-del-feature
```

2. Trabajar localmente y testear con:
   npm run dev

3. Subir la rama al repositorio:
   git push origin dev/nombre-del-feature

4. (Opcional) Revisar en GitHub o abrir Pull Request

5. Hacer merge a main:
   git checkout main
   git merge dev/nombre-del-feature
   git push origin main
