pipeline {
    
    agent {
        docker {
            image 'nikolaik/python-nodejs:python3.6-nodejs14-alpine'
        }
    }

    environment {
        DISCORD_TOKEN=credentials('DISCORD_TOKEN')
        SECRETAUTH=credentials('SECRETAUTH')
        DISCORD_CLIENT_ID=credentials('DISCORD_CLIENT_ID')
        DISCORD_CLIENT_SECRET=credentials('DISCORD_CLIENT_SECRET')
        MONGODB_URL=credentials('MONGODB_URL')
        JENKINS=true
    }

    stages {

        stage("Build") {

            steps {
                echo 'Checking apps.'
                dir("./backend") {
                    sh 'npm --version'
                    sh 'node --version'
                    sh 'npm install'
                    echo 'Installing Typescript'
                    sh 'npm i typescript -g'
                    echo 'Compiling'
                    sh 'tsc'
                }
            }

        }
        
        stage("Checking code") {

            steps {
                echo 'Checking code..'
                echo 'hello'
            }

        }
    }
}