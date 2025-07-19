pipeline {
    agent any
    environment {
        PYTHON = 'py'
    }

    stages {
        stage('Prep') {
            steps {
                powershell 'Write-Output "PREP STEP OK"; $PSVersionTable.PSVersion'
            }
        }

        stage('Install Python deps') {
            steps {
                powershell '''
                    & $env:PYTHON -m pip install --upgrade pip
                    if (Test-Path requirements.txt) {
                        & $env:PYTHON -m pip install -r requirements.txt
                    }
                '''
            }
        }
		
		  stage('Install JS deps') {
            steps {
                dir('frontend') {
                    powershell '''
                        npm ci --loglevel=info --no-audit --no-fund
                    '''
                }
            }
        }
		
        stage('Build frontend') {
            steps {
				dir('frontend') {
					powershell 'npm run build'
				}
            }
        }
    }

    options { timeout(time: 15, unit: 'MINUTES') }
}