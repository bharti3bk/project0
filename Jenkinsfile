pipeline {
   agent any

   stages {
      stage('verify branch name') {
         steps {
            echo "$GIT_BRANCH"
         }
      } 
      stage('build'){
       steps {
          sh "pwd"
          sh "docker build -t project0 ."
       }
      }
   }
}