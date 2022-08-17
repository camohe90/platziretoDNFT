#!/bin/bash

cd ./build
FILES=$(find * -type f | awk -v q="'" '{print " -F " q "file=@\"" $0 "\";filename=\"" $0 "\"" q}')
# curl -X POST -F file='Hola mundo' -u "2DQEQZRAaAdrLXnWf0SUQLmng0j:a4ea750d8efd36735976ddf2b037e848" "https://ipfs.infura.io:5001/api/v0/add"
curl -u "2DQEQZRAaAdrLXnWf0SUQLmng0j:a4ea750d8efd36735976ddf2b037e848" "https://ipfs.infura.io:5001/api/v0/add?pin=true&recursive=true&wrap-with-directory=true&cid-version=1" -vv -X POST $FILES
cd ..