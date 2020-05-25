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
          withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: '8e9a15f4-e28c-4e4b-8e82-4a9421e2c963', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
               sh "export AWS_REGION=us-east-2"
               sh "export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID"
               sh "export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY"
               sh "export PATH=$PATH:/usr/local/bin"
               sh "aws --version"
               sh "aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 676534916920.dkr.ecr.us-east-2.amazonaws.com"
            }
          sh "docker build -t project0$BUILD_NUMBER ."
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