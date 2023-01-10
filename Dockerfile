FROM openjdk:19-jdk-alpine
COPY target/todoapp-0.0.1-SNAPSHOT.jar api.jar
ENTRYPOINT ["java","-jar","/api.jar"]