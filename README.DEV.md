## URANIO ADM Developing

In order to start developing `uranio-adm` run the following commands:
```
yarn install
```
Copy `sample.env` to `.env` and edit its variable with you local environment.

Then in the root foler:
```
yarn build
yarn restart
yarn dev
```

If `uranio.toml` is changed the following command must be run:
```
yarn restart
```
