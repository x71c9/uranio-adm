## URANIO ADM Developing

In order to start developing `uranio-adm` run the following commands:
```
yarn install
```
Copy `sample.env` to `.env` and edit its variable with you local environment.

Then in the root foler:
```bash
yarn build
yarn restart
yarn dev
```

If `uranio.toml` is changed the following command must be run:
```
yarn restart
```

### Generate HTTPS certificare for localhost

https://letsencrypt.org/docs/certificates-for-localhost/

```
openssl req -x509 -out localhost.crt -keyout localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```
