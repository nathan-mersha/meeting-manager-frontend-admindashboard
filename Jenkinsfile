pipeline {
    agent any
    stages {

        stage('Install Dep') {
            steps {
                sh "npm install"
            }
        }

        stage('Build') {
            steps {
                sh "npm run build"
            }
        }

    }
}