#! /bin/bash

rm -r ../max-t-wheeler.github.io/*

cp -r dist/* ../max-t-wheeler.github.io/

cd ../max-t-wheeler.github.io/

git add *
git commit -m "deploy"
git push
cd -
