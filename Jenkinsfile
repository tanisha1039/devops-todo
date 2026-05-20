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
               sh 'sonar-scanner -Dsonar.token=squ_6da23f9083b4d313999acba4a49aa0374396464e'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t todoapp .'
            }
        }
    }
}