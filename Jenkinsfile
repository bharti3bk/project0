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
          sh "cd project0"
          sh "docker build -t project0 ."
          sh "cd .."
       }
      }
   }
}