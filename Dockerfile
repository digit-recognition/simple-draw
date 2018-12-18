FROM openjdk:8-alpine
ENV SERVICE_NAME=dr-frontend

MAINTAINER Kugatov Maxim <maximkugatov@gmail.com>

COPY /target/${SERVICE_NAME}-0.0.1-SNAPSHOT.jar /app/lib/

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "/app/lib/dr-frontend-0.0.1-SNAPSHOT.jar"]

