#!/bin/bash
set -e

# Change permissions for the MySQL config file
chmod 644 /etc/mysql/conf.d/my.cnf

# Start MySQL
exec mysqld