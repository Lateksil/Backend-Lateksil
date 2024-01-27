APP_VERSION="1.0.3"
PROJECT_NAME="project/demo-xendit"
GCLOUD_ID_PROJECT="nomadic-portal-406503"

npm install --verbose
echo "Done installing packages..."

docker buildx build --platform linux/amd64 -t $PROJECT_NAME:$APP_VERSION .
echo "Finished building local docker images..."

docker tag $PROJECT_NAME:$APP_VERSION gcr.io/$GCLOUD_ID_PROJECT/demo-xendit
echo "New Tag building docker images..."

docker push gcr.io/$GCLOUD_ID_PROJECT/demo-xendit
echo "Done pushing docker images..."