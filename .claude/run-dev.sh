#!/bin/zsh
export PATH="/Users/ldg/.nvm/versions/node/v24.21.0/bin:$PATH"
cd "$(dirname "$0")/.."
exec npm run dev
