FROM node:latest

WORKDIR /pygame

COPY . ./

RUN apt-get update
RUN apt install -y python3-pygame 
RUN apt install -y python3-flask 
RUN apt install -y python3-flask-cors

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0" ]