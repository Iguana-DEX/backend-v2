# 🦎 IguanaDEX Backend

<p align="center">
  <img width="320" height="246" src="https://user-images.githubusercontent.com/34973295/206001164-103361a4-086e-4e12-83e6-8a2d7ccd4d59.png">
</p>

Contracts for IguanaDEX - a cross-chain derivative exchange.

Docs at https://docs.iguanadex.com

## Development

This project will work properly if you use Node.js version 16.x (Gallium LTS) or newer and NPM version 8+.


To setup the development environment, first clone the repo:

```bash
git clone https://github.com/iguana-dex/backend-v2.git && cd backend-v2
```

### Install Dependencies
If npx is not installed yet:
`npm install -g npx`

Install packages:
`npm i`

### Compile Contracts
`npx hardhat compile`

### Run Tests
`npx hardhat test`


## References

Wrapped Asset Bridge repo by LayerZero:
https://github.com/LayerZero-Labs/wrapped-asset-bridge

GMX Technical Overview:
https://gmx-io.notion.site/gmx-io/GMX-Technical-Overview-47fc5ed832e243afb9e97e8a4a036353

GMX Risk Analysis by Chaos Labs:
https://chaoslabs.xyz/resources/chaos_gmx_genesis_risk_framework_methodology.pdf

ERC20Base contract by thirdweb:
https://github.com/thirdweb-dev/contracts/blob/main/contracts/base/ERC20Base.sol

StaderLabs documentation (Liquid Staking Tokens):
https://www.staderlabs.com/docs-v1/polygon/stader-for-polygon
