#!/bin/bash
# wait-for-it.sh: Espera que un servicio esté disponible en el host:puerto

host="$1"
port="$2"
shift 2

while ! nc -z "$host" "$port"; do
  echo "Esperando a que $host:$port esté disponible..."
  sleep 1
done

echo "$host:$port está disponible"
exec "$@"
