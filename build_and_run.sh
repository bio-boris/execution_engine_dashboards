myimage=bioboris/dashboard:latest
docker build . -t $myimage
docker rm --force ee_dashboard
docker run -d -p 80:80 --name ee_dashboard $myimage 
open http://localhost/jbl/ee2.html
 
