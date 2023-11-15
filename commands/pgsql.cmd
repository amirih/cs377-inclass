sudo apt update && sudo apt upgrade -y

sudo apt install postgresql postgresql-contrib
sudo systemctl status postgresql
sudo systemctl enable postgresql

sudo -i -u postgres

psql
CREATE ROLE cs377_students WITH LOGIN PASSWORD 'cs377_students_password';
CREATE DATABASE demo;
CREATE DATABASE demo3;
GRANT ALL PRIVILEGES ON DATABASE demo TO cs377_students;
GRANT ALL PRIVILEGES ON DATABASE demo3 TO cs377_students;


\q #exit from psql
exit # from postgres

sudo nano /etc/postgresql/13/main/pg_hba.conf
then add:
host    all             all             0.0.0.0/0               md5


CTRL + S
CTRL + X

sudo nano /etc/postgresql/13/main/postgresql.conf
CTRL + W to search 

listen_addresses = '*'


CTRL + S
CTRL + X

sudo systemctl restart postgresql

------END-------




















psql -h 20.98.38.207 -U cs377-students -d demo

cs377-students-password

REVOKE ALL PRIVILEGES ON DATABASE demo FROM cs377_students;

\c demo
REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA university FROM cs377_students;
REVOKE ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA university FROM cs377_students;

GRANT SELECT ON ALL TABLES IN SCHEMA university TO cs377_students;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA university TO cs377_students;

ALTER DEFAULT PRIVILEGES IN SCHEMA university GRANT SELECT ON TABLES TO cs377_students;
ALTER DEFAULT PRIVILEGES IN SCHEMA university GRANT USAGE ON SEQUENCES TO cs377_students;


GRANT INSERT ON ALL TABLES IN SCHEMA university TO cs377_students;
REVOKE DELETE ON ALL TABLES IN SCHEMA university FROM cs377_students;

ALTER DEFAULT PRIVILEGES IN SCHEMA university GRANT INSERT ON TABLES TO cs377_students;
ALTER DEFAULT PRIVILEGES IN SCHEMA university REVOKE DELETE ON TABLES FROM cs377_students;


Name: anything
Host: 20.98.38.207
port: 5432

Username: cs377_students
Password: cs377_students_password


psql -h 20.98.38.207 -U cs377_students -d demo
