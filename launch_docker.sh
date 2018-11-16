#!/bin/bash

docker container rm grcanosa_blog2

#docker image rm grcanosa_blog
docker build -t grcanosa_blog2 .
docker run --rm --name grcanosa_blog2 -p 4001:4000 -v $PWD:/srv/jekyll grcanosa_blog2
