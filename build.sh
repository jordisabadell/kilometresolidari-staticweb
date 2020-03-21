# This script receives the environment data by parameter and creates the .env file
echo -e "APIKEYRECAPTCHA=" $1 "\nAPIKEYFIREBASE=" $2 "\nAPIKEYCUSTOMSEARCH=" $3 >> .env