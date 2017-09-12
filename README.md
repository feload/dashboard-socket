# Dashboard socket.
This is an example about dockerizing a socket.io service for a generic application.

### Usage.

#### Clone and build.
```
$ git clone https://github.com/feload/dashboard-socket.git  
$ cd dashboard-socket  
$ docker build -t dashboard .  
$ docker run -d -p 8181:8181 dashboard-socket  
$ docker logs dashboard -f  
```

#### Give it a try.
```
$ http-server
```
Reference: [http-server](https://github.com/indexzero/http-server)   
"user connected" will prompt in the logs from dashboard container.  
