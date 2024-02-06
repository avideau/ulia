#! /bin/bash

DOMAIN=obs.ulia.stream

openssl req -x509 \
            -sha256 -days 356 \
            -nodes \
            -newkey rsa:2048 \
            -subj "/CN=${DOMAIN}/C=FR/L=Paris" \
            -keyout rootCA.key -out rootCA.crt


openssl genrsa -out ${DOMAIN}.key 2048

openssl req -new -key ${DOMAIN}.key -out ${DOMAIN}.csr -config csr.conf

openssl x509 -req \
    -in ${DOMAIN}.csr \
    -CA rootCA.crt -CAkey rootCA.key \
    -CAcreateserial -out ${DOMAIN}.crt \
    -days 365 \
    -sha256 -extfile cert.conf
