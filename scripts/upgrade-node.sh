#!/bin/sh

echo "Current Node version:

.env file: $(grep NODE_VERSION .env | cut -d '=' -f2)
"

printf "Enter new Node version: "
read -r new_version

sed -i 's/^\(NODE_VERSION=\).*/\1'"$new_version"'/' .env
