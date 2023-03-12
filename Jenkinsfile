pipeline {
  agent any 
  stages {
    stage('Build webapp') { 
      steps {
        sh "echo hello"
        dir("${env.WORKSPACE}/react-app"){
          sh '../ci/build-react-app "param"'
        }
      }
    }
    
    stage('Deploy webapp') { 
      steps {
        dir("${env.WORKSPACE}/react-app"){
          sh '../ci/deploy-react-app "param"'
        }
      }
    }
  }
}