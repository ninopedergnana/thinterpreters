chmod -R 777 Main
curl -LO http://archive.ubuntu.com/ubuntu/pool/main/libf/libffi/libffi6_3.2.1-8_amd64.deb
ln -s ./app/.apt/usr/lib/x86_64-linux-gnu/libffi.so.7 ./app/.apt/usr/lib/x86_64-linux-gnu/libffi.so.6