# Dockerfile for Python app
FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

# Set the working directory
WORKDIR /app

COPY requirements.txt /app/requirements.txt
# Install Python, MySQL, and other dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    mysql-server \
    && rm -rf /var/lib/apt/lists/*


RUN pip3 install -r requirements.txt
# Copy the wait script and give it execute permissions
COPY . /app

RUN mysqld --init-file .\init.sql

CMD ["python3", "app.py"]