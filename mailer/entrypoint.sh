#!/bin/sh

# Load environment variables from file
if [ -f .env ]; then
  export $(cat .env | xargs)
fi

# Execute the main container command
exec "$@"
