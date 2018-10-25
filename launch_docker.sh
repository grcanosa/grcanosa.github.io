docker container rm grcanosa_blog
docker container rm grcanosa_blog
#docker image rm grcanosa_blog
docker build -t grcanosa_blog .
docker run -p 4000:4000 -v $PWD:/srv/jekyll grcanosa_blog
