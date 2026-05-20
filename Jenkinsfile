pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Security Check') {
            steps {
                sh 'npm audit || true'
            }
        }

        stage('SonarQube Scan') {
            steps {
                sh 'sonar-scanner'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t todoapp .'
            }
        }
    }
}