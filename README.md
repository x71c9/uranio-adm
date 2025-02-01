# Deprecated

**This repository is deprecated and no longer maintained.**

Please use the new repository for the latest code and updates:  
[https://github.com/x71c9/uranio](https://github.com/x71c9/uranio)

## URANIO ADM: Uranio admin

Uranio Admin extends Uranio TRX (Transreceiver) with a full admin console
built with Nuxt.

### How authentication works for Admin Panel

There is a `init` middleware that is being called when the client starts.

This `init` middleware make a hook call to `/uranio/api/superusers/count` by
using the method `await uranio.trx.hook.superusers.count()`;

If the call succeed, it means the browser still has the HttpOnly cookie with
the auth token, hence the User is still logged in.

The `auth` store will update then the state `logged`.
