FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Copiar archivos de configuración de Gradle
COPY gradle gradle
COPY gradlew .
COPY build.gradle .
COPY settings.gradle .

# Dar permisos de ejecución al wrapper de Gradle
RUN chmod +x gradlew

# Copiar el código fuente
COPY src src

# Compilar el proyecto
RUN ./gradlew build -x test

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "build/libs/backend-0.0.1-SNAPSHOT.jar"]