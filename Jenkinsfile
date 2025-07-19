pipeline {
    agent any
    environment {
        PYTHON = 'py'
    }

    stages {
        stage('Prep') {
            steps {
                bat 'where node'
                bat 'node -v'
                bat '%PYTHON% --version'
            }
        }

        stage('npm install') {
            steps {
                bat 'npm ci --loglevel=info --no-audit --no-fund'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }
    }
    options { timeout(time: 15, unit: 'MINUTES') }
}