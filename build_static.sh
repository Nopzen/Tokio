#!/bin/bash

echo "Remove old 'public' artifacts"
rm -rf ./_site ./dist

echo "Building new artifacts"
yarn build

mkdir ./_site
cp index.html ./_site/index.html
mkdir ./_site/dist
cp ./dist/index.js ./_site/dist/index.js
cp ./dist/src ./_site/dist/src -r
cp ./styles ./_site/styles -r