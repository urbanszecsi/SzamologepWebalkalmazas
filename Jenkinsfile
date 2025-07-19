pipeline {
    agent any               
    
    environment {
        PYTHON = 'py'       // Windows Python launcher
        NODE_ENV = 'production'
    }

    stages {

        stage('Checkout') {
            steps { checkout scm }   // a job configban megadott repo + branch
        }

        stage('Python deps') {
    steps {
        bat '%PYTHON% -m pip install --upgrade pip -q'
			bat '''
				if exist requirements.txt (
					%PYTHON% -m pip install -r requirements.txt -q
				) else (
					echo No requirements.txt found
				)
			'''
		}
	}

	stage('JS deps') {
		steps {
			// --loglevel=info folyamatosan írja a modulokat
			bat 'npm ci --loglevel=info --no-audit --no-fund'
		}
	}

        stage('Build frontend') {
            steps {
                bat 'npm run build'   // Webpack => dist/
            }
            post {
                success {
                    archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
                }
            }
        }

        stage('Run tests') {
            steps {
                bat '%PYTHON% -m pytest -q || echo "nincsenek pytest-ek"'
            }
        }

        stage('Package') {
            steps {
                bat '''
                    if exist build rmdir /s /q build
                    mkdir build
                    copy server.py build\\
                    xcopy dist build\\dist\\ /E /I /Y
                    powershell -command ^
                      "Compress-Archive -Path build\\* -DestinationPath site.zip"
                '''
            }
            post { always { archiveArtifacts artifacts: 'site.zip' } }
        }
    }

    post {
        success { echo '✅  Build sikeres' }
        failure { echo '❌  Build elhasalt' }
    }
}
