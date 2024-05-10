Mi nombre es Román Pereyra y estas son instrucciones para poder ejecutar mi proyecto.

1. Crear con mkdir un directorio con *nombre* de preferencia para despues movernos al directorio creado con el comando cd *nombre*.
2. Dentro del directorio ejecutar el siguiente comando: git clone https://github.com/etec-integration-project/etec-pi-2024-backend-Romanchu.git
3. Entrar a MYSQL Workbench y entrar a 'schemas' donde podremos crear la base de datos con el nombre 'bmustdb'
4. En la parte de Query 1 deberemos proporcionar el siguiente código (refrescar si es necesario):
use mysql;

create user 'root'@'%' identified with mysql_native_password by '1234';

grant all privileges on *.* to 'root'@'%' 
5. Ejecutar en nuestro contenedor el comando: *docker compose up --build*
