pipeline {
  agent any 
  stages {
    stage('Build backend') { 
      steps {
        sh "Jenkins pipeline for backend build"
        dir("${env.WORKSPACE}/story-api"){
          sh '../ci/build-gradle-app build/libs/ artifact'
          sh 'ls'
          sh 'artifact'
        }
      }
    }
    
    stage('Deploy backend jar') { 
      steps {
        dir("${env.WORKSPACE}/build"){
          sh '../ci/deploy-react-app "param"'
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