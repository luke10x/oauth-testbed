pipeline {
  agent any 
  stages {
    stage('Build webapp') { 
      steps {
        sh "echo hello"
        dir("${env.WORKSPACE}/react-app"){
          sh 'pwd; ls -las; ../ci/build-react-app "param"'
        }
      }
    }
    
    stage('Deploy webapp') { 
      steps {
        dir("${env.WORKSPACE}/react-app"){
          sh 'pwd; ls -las; ../ci/deploy-react-app "param"'
        }
      }
    }
  }
}