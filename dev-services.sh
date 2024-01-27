if ! command -v node &> /dev/null
then
    echo "Node.js belum terpasang. Silakan instal Node.js terlebih dahulu."
    exit
fi

if ! command -v npm &> /dev/null
then
    echo "npm belum terpasang. Silakan instal npm terlebih dahulu."
    exit
fi

APP_VERSION="default"

while [[ "$#" -gt 0 ]]; do
  case $1 in
    -v|--version)
      APP_VERSION="$2"
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Error: Unknown option $1"
      usage
      exit 1
      ;;
  esac
  shift
done

echo "Runnning application with version $APP_VERSION"

npm start