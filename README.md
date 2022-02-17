<br /><br />

<h1 align="center">txwrapper-nugenesis</h1>
<h4 align="center">Helper functions for Nugenesis offline transaction generation.</h4>

<p align="center">
  <a href="https://www.npmjs.com/package/txwrapper-nugenesis">
    <img alt="npm" src="https://img.shields.io/npm/v/txwrapper-nugenesis.svg" />
  </a>
</p>

<br /><br />

# About

Txwrapper library for nugenesis relay and system chains.

Note: not all methods available apply to all supported chains. To check what methods are supported by a chain consult the pallets included in chain's runtime.


## Get Started

```bash
yarn add txwrapper-nugenesis
```

In a JS/TS file:

```typescript
import {
  construct,
  methods,
} from 'txwrapper-nugenesis';

const unsigned = methods.balance.transfer(
  {
    dest: 'FoQJpPyadYccjavVdTWxpxU7rUEaYhfLCPwXgkfD6Zat9QP',
    value: 100,
  },
  {
    // Additional information needed to construct the transaction offline.
  }
);

const signingPayload = construct.signingPayload(unsigned, { registry });
// On your offline device, sign the payload.
const signature = myOfflineSigning(signingPayload);

// `tx` is ready to be broadcasted.
const tx = construct.signedTx(unsigned, signature, { metadataRpc, registry });
```

Have a look at the [examples](https://github.com/paritytech/txwrapper-core/blob/main/packages/txwrapper-examples/README.md) to see how you can perform the whole lifecycle of a transaction, from generation to signing to broadcast.
