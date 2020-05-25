pipeline {
   agent any

   stages {
      stage('verify branch name') {
         steps {
            echo "$GIT_BRANCH" 
            echo "$BUILD_NUMBER"
         } 
      }  
      stage('build'){
       steps {
          sh "pwd"
          sh "docker build -t project0$BUILD_NUMBER ."
       } 
       stage('uploadImageToECR') {
          steps {
            withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: '8e9a15f4-e28c-4e4b-8e82-4a9421e2c963', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                  sh '''export AWS_REGION=us-east-2
                  export PATH=$PATH:/usr/local/bin
                  aws --version
                  aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 676534916920.dkr.ecr.us-east-2.amazonaws.com
                  docker tag project0:latest 676534916920.dkr.ecr.us-east-2.amazonaws.com/project0:latest
                  docker push 676534916920.dkr.ecr.us-east-2.amazonaws.com/project0:latest
                  '''
               }
          }
       }
       post {
            success {
               echo "bulid successful" 
            } 
             failure {
               echo "bulid failed" 
            }
         }
      }
   }
}