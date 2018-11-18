#!/bin/bash

docker container rm grcanosa_blog

#docker image rm grcanosa_blog
docker build -t grcanosa_blog .
docker run --rm --name grcanosa_blog -p 4001:4000 -v $PWD:/srv/jekyll grcanosa_blog
