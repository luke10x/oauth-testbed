FROM gradle:8.0.0-jdk19-focal

WORKDIR /opt/story-api

# Copy the Gradle wrapper files and build configuration files to the container
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# Copy the application source code to the container
COPY src src

# Build the application using Gradle
RUN chmod +x ./gradlew
RUN ./gradlew bootJar --no-daemon

# Copy the executable JAR file to the container
RUN mkdir -p /app
RUN cp /opt/story-api/build/libs/story-api-0.0.1-SNAPSHOT.jar /app/app.jar

# Set the entrypoint to run the executable JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]