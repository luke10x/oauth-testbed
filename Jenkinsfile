pipeline {
  agent any 
  stages {
    stage('Build') {
      parallel {
        stage('Build BFF jar') {
          steps {
            dir("${env.WORKSPACE}/story-api") {
              sh '../ci/build-in-docker /app ./temp'
            }
          }
        }
        stage('Build WepApp') {
          steps {
            dir("${env.WORKSPACE}/react-app"){
              sh '../ci/build-in-docker /workdir/build ./temp'
            }
          }
        }
      }
    }
    stage('Deploy') {
      parallel {
        stage('Deploy BFF jar') {
          steps {
            dir("${env.WORKSPACE}/story-api") {
              sh '/scripts/deploy-artifact ./temp oauth-testbed+story-api'
            }
          }
        }
        stage('Deploy WebApp') { 
          steps {
            dir("${env.WORKSPACE}/react-app"){
              sh '/scripts/deploy-artifact ./temp oauth-testbed+react-app'
            }
          }
        }
      }
    }
  }
}