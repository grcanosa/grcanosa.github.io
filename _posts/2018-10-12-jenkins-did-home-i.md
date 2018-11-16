---
layout: post
title: Jenkins Docker-in-Docker at home (I)
subtitle: Settings up a Jenkins DiD workflow on a single laptop
gh-repo: grcanosa/jenkins-did
gh-badge: [star, fork, follow]
tags: [devops, jenkins, docker, did]
# bigimg: /static/img/Jenkins_logo_with_title.png
image: /static/img/jenkins.jpeg
---

The goal of this post is to describe the process to set up a complete Jenkins docker-in-docker workflow using a single laptop. But, first of all, you need to describe what a Jenkins Docker in Docker workflow is. To the best of my knowledege the workflow is like this.
* A Jenkins Master (JM) is set up that will coordinate and launch the different pipelines.
* These pipelines will each be launched inside a docker container using a jenkins-ssh-slave image. JM performs this using the Jenkins [Docker Plugin](https://wiki.jenkins.io/display/JENKINS/Docker+Plugin). These containers are usually launched in a remote host via tcp or even in an on-demand host that only launches containers when needed (like AWS). 
* Since we want our deliverable to be a docker image, these docker slaves need to have the capability to build and launch docker images using the hosts capabilities. 

And we want to do this using a single host where the JM, the Jenkins slaves and the final docker images are build and run!!

So, lets get to business! 

## Setting a Jenkins master with docker installed. 

The first step is to have a docker container with Jenkins installed that can access the host capabilities to build and launch other containers.
I already have a Dockerfile that builds such a [Jenkins image](https://hub.docker.com/r/grcanosa/jenkins-master-did):
```Dockerfile
FROM jenkins/jenkins:2.138.2

USER root

RUN apt-get update && \
    apt-get -y install apt-transport-https \
      ca-certificates \
      curl \
      gnupg2 \
      software-properties-common && \
    curl -fsSL https://download.docker.com/linux/$(. /etc/os-release; echo "$ID")/gpg > /tmp/dkey; apt-key add /tmp/dkey && \
    add-apt-repository \
      "deb [arch=amd64] https://download.docker.com/linux/$(. /etc/os-release; echo "$ID") \
      $(lsb_release -cs) \
      stable" && \
   apt-get update && \
   apt-get -y install docker-ce
```

To start this image and retain the data you will also need a volume and to expose some ports. You could run this image as:
```bash
docker run --name jenkins-did -v jenkins_data:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock -p 8080:8080 -p 50000:50000 grcanosa/jenkins-did:jenkins2.138.2
```
Or you could just use this docker-compose.yml file:
```yaml
version: '3.4'
services:
  jenkins:
    container_name: devops_jenkins
    #image: jenkins/jenkins:lts
    image: grcanosa/jenkins-did:jenkins2.138.2
    hostname: jenkins
    volumes:
      - jenkins_data:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock
    ports:
      - 8080:8080
      - 50000:50000
    networks:
      - net_devops

networks:
  net_devops:
    driver: bridge
    
volumes:
  jenkins_data:
    name: jenkins_data

```

If you do *docker-compose up -d* now the Jenkins master is not going to be able to use the host docker daemon because it's socket is not accepting request by default. You need to enable the docker daemon unix socket.

## Enable docker daemon socket

You need to enable you docker daemon socket (in your host) so that the JM can build and launch images. To do it you need to modify the docker daemon launch command. 
To find out where your docker daemon file is do:
```bash
systemctl cat docker.service
```
The first line will indicate you where the file is and then edit it so that the *ExecStart* line looks like this:
```
ExecStart=/usr/bin/dockerd -H unix:///var/run/docker.sock 
```
Then you just need to do:
```bash
systemctl daemon-reload
systemctl restart docker-service
```

Up to this point we have a Jenkins running in a container that can use the host's docker capabilities to build and run containers. However, we still cannot build and run Docker images inside this slave container since the [jenkins/ssh-slave](https://hub.docker.com/r/jenkins/ssh-slave/) docker image does not have docker installed. We need to do the same with the Jenkins [ssh-slave](https://hub.docker.com/r/jenkins/ssh-slave/) official image. I have built a [modificated image](https://hub.docker.com/r/grcanosa/jenkins-ssh-slave-did) with docker installed:


```Dockerfile
FROM jenkins/ssh-slave RUN apt-get update

RUN apt-get install -y ca-certificates curl
RUN apt-get install -y gnupg2 apt-transport-https software-properties-common
RUN apt-get install -y iptables
RUN curl -S -o /home/jenkins/docker.deb https://download.docker.com/linux/debian/dists/stretch/pool/stable/amd64/docker-ce_18.06.1~ce~3-0~debian_amd64.deb && \
    ls -lah /home/jenkins/docker.deb && \
    dpkg -i /home/jenkins/docker.deb
```

The [next post](/post/2018-10-13-jenkins-did-home-ii/) will show how configure Jenkins to execute a complete pipeline using these images.
