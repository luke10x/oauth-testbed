pipeline {
  agent any 
  stages {
    stage('Build webapp') { 
      steps {
        sh "echo hello"
        dir("${env.WORKSPACE}/react-app"){
          sh 'pwd; la -l; ../ci/build-react-app "param"'
        }
      }
    }
    
    stage('Deploy webapp') { 
      steps {
          // 
      }
    }
  }
}