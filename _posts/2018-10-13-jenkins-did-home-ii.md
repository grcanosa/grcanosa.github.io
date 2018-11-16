---
layout: post
title: Jenkins Docker-in-Docker at home (II)
subtitle: Configuring Jenkins pipeline.
gh-repo: grcanosa/jenkins-did
gh-badge: [star, fork, follow]
tags: [devops, jenkins, docker, did]
# bigimg: /static/img/Jenkins_logo_with_title.png
image: /static/img/jenkins.jpeg
---

Today I will show you how to configure Jenkins to use the images we prepared in the [previous post](/post/2018-10-13-jenkins-did-home-i/).

You need to launch Jenkins executing @docker-compose up -d@ in the directory where the docker-compose.yaml was created and then go to http://localhost:8080 where Jenkins is going to be running. 

## Configuring Jenkins

First of all, you need to install the [Docker Plugin](https://wiki.jenkins.io/display/JENKINS/Docker+Plugin). There are multiple guides on how to do this so I will not cover this today. 

Then you need to set up a Docker Cloud. Follow these instructions:

* Go to  Manage Jenkins -> Configure System.
* At the bottom of the page search for the *Cloud* section.
* Add a new Docker cloud with the following parameters:
  * Docker Host URI: ```unix:///var/run/docker.sock```
  * Check enabled!!.
* Next Add a Docker template with the following parameters:
  * Labels and Name to docker (or any other string).
  * Docker image: ```grcanosa/jenkins-ssh-slave-did:latest```. 
  * In container settings:
    * Check "Run container privileged".
    * Add ```/var/run/docker.sock:/var/run/docker.sock:ro``` to container settings. 
    * Add enviroment variable JENKINS_SLAVE_SSH_PUBKEY="ssh-rsa XXXXXXXXXXX jenkins@XXXXXX". This public key needs to be generated in the JM:
      * To get into the JM container: ```docker exec -it devops_jenkins bash```.
      * Create .ssh dir: ```mkdir -p /var/jenkins_home/.ssh/```
      * Create key: ```ssh-keygen```. Remember to select ```/var/jenkins_home/.ssh/id_rsa``` as destination file.
      * The public key can be obtained by: ```cat /var/jenkins_home/.ssh/id_rsa.pub```.


## Jenkins pipeline.

Now everything is set up to launch a Jenkins pipeline in a docker container. An example of a Jenkinsfile to be used with this template is:

```Jenkinsfile
node('docker'){  //Same label as in the docker agent configuration.

  stage('greeting'){
     //prepare our slave container
     echo "grcanosa rulez!" 
     echo "new stage!"
  }

  stage('getting code'){
    git 'https://github.com/grcanosa/grcanosa_ci_test.git'
    GIT_COMMIT_HASH = sh (script: "git log -n 1 --pretty=format:'%H'", returnStdout: true)
  }

  stage('Building'){
      sh "docker build -t my_app ."
  }

  stage('Launching'){
      sh "docker run -d my_app"
  }
```

