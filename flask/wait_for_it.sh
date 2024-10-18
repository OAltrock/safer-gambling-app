#!/bin/bash

set -e

host=$SAFER_GAMBLING_DB_HOST
port=$SAFER_GAMBLING_DB_PORT

until nc -z -w30 $host $port; do
  >&2 echo "MySQL is unavailable - sleeping"
  >&2 echo "Database URI: $SAFER_GAMBLING_DB_USER:****@$SAFER_GAMBLING_DB_HOST:$SAFER_GAMBLING_DB_PORT/$SAFER_GAMBLING_DB_NAME"
  sleep 1
done

>&2 echo "MySQL is up - executing command"
>&2 echo "Database URI: $SAFER_GAMBLING_DB_USER:****@$SAFER_GAMBLING_DB_HOST:$SAFER_GAMBLING_DB_PORT/$SAFER_GAMBLING_DB_NAME"

# Execute the command passed as arguments
exec "$@"