chmod -R 777 Main
curl -LO http://archive.ubuntu.com/ubuntu/pool/main/libf/libffi/libffi6_3.2.1-8_amd64.deb
chmod 777 ../var/cache
mkdir -p /var/cache/apt/archives/partial
apt install ./libffi6_3.2.1-8_amd64.deb
