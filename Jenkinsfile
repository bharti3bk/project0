pipeline {
   agent any

   stages {
      stage('verify branch name') {
         steps {
            echo "$GIT_BRANCH" 
            echo "$BUILD_VERSION"
         } 
      }  
      stage('build'){
       steps {
          sh "pwd"
          sh "docker build -t project0$PIPELINE_VERSION ."
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