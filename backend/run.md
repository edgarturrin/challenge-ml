# Guía de Ejecución

Esta guía explica cómo ejecutar la API, correr los tests y visualizar los reportes de cobertura.

## Requisitos Previos

- Java 17 o superior
- Gradle (o puedes usar el wrapper incluido en el proyecto)

## Ejecutar la API

Para levantar la API con Gradle, ejecuta el siguiente comando en la terminal desde el directorio raíz del proyecto:

```bash
./gradlew bootRun
```

La API estará disponible en `http://localhost:8080` (o el puerto configurado en application.yaml).

## Ejecutar los Tests

Para ejecutar todos los tests del proyecto:

```bash
./gradlew test
```

Este comando ejecutará todos los tests y generará automáticamente el reporte de cobertura con Jacoco.

## Visualizar el Reporte de Cobertura

Después de ejecutar los tests, el reporte de cobertura se genera en formato HTML. Para visualizarlo:

1. Navega a la carpeta del proyecto
2. Abre el archivo `build/reports/jacoco/test/html/index.html` en tu navegador web

Puedes hacerlo de las siguientes maneras:

### En Linux:
```bash
xdg-open build/reports/jacoco/test/html/index.html
```

### En macOS:
```bash
open build/reports/jacoco/test/html/index.html
```

### En Windows:
```bash
start build/reports/jacoco/test/html/index.html
```

O simplemente abre el archivo manualmente con tu navegador web favorito.

## Comandos Adicionales

- Para limpiar el proyecto:
  ```bash
  ./gradlew clean
  ```

- Para construir el proyecto sin ejecutarlo:
  ```bash
  ./gradlew build
  ```

- Para ejecutar solo los tests sin generar el reporte de cobertura:
  ```bash
  ./gradlew test -x jacocoTestReport
  ```