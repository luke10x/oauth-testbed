pipeline {
  agent any 
  stages {
    stage('Build backend') { 
      steps {
        sh "echo Jenkins pipeline for backend build"
        dir("${env.WORKSPACE}/story-api") {
          sh '../ci/build-in-docker story-api /app ./from_docker'
          sh 'ls'
          sh 'ls -las ./from_docker'
        }
      }
    }
    
    stage('Deploy backend jar') { 
      steps {
        dir("${env.WORKSPACE}/story-api") {
          sh '/scripts/deploy-artifact ./from_docker oauth-testbed+story-api'
        }
      }
    }
    
    
    // stage('Build webapp') { 
    //   steps {
    //     sh "echo hello"
    //     dir("${env.WORKSPACE}/react-app"){
    //       sh '../ci/build-react-app "param"'
    //     }
    //   }
    // }
    
    // stage('Deploy webapp') { 
    //   steps {
    //     dir("${env.WORKSPACE}/react-app"){
    //       sh '../ci/deploy-react-app "param"'
    //     }
    //   }
    // }
    
  }
}