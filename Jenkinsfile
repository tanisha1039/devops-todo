pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git 'https://github.com/tanisha1039/devops-todo.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Security Check') {
            steps {
                sh 'npm audit'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t todoapp .'
            }
        }
    }
}