## Create a cross-chain token with gateways
Gateways utilize AnyCall cross-chain messaging protocol and help token developers set up token bridges permissionlessly. Gateways will build and send and receive and parse cross-chain messages automatically, and handle tokens by customizable functions `_swapout` and `_swapin`. The token owners have full control of the gateways.

### Deploy standard token gateway network with the factory
1. For the token on each chain, select a gateway type.
2. Create the gateways on the factory portal contract.
3. Take ownership.
4. For each gateway set the other gateways as peers.
5. For minter gateways, give mint/burn permission to the gateways.

### Deploy customized token gateway network
1. For the token on each chain, select a gateway type.
2. Modify the cross-chain transfer logic.
3. Deploy the gateways.
4. For each gateway set the other gateways as peers.
5. For minter gateways, give mint/burn permission to the gateways.

### Gateway types
#### 1. Minter gateways
- Minter gateways mint tokens to the receiver when receiving a bridge-in message.
- Minter gateways burn tokens from the sender when the user initiates a bridge-out message.
- Minter gateways must have permission to mint and burn
#### 2. Pool gateways
- Pool gateways transfer tokens to the receiver when receiving a bridge-in message.
- Pool gateways receive and lock tokens from the sender when the user initiates a bridge-out message.

### Addresses
#### Arbitrum
- factoryPortal - 0x58c1BBb508e96CfEC1787Acf6Afe1C7008A5B064

#### Optimism
- factoryPortal - 0xab41861399eb56896b24FBaaBaA8bce45e4A626B

#### Polygon
- factoryPortal - 0x0084B0c29e25D5CcAeE5465981837eBEF542a262

#### Fantom
- factoryPortal : 0x152c0f9c32C393961e9803a9467B2194E1c00b21

#### AVAX
- factoryPortal - 0x2AC03BF434db503f6f5F85C3954773731Fc3F056

#### BSC
- factoryPortal - 0xfF9c94f5F5A3e3D65d2375215188140E23D604E3

#### XANA
- factoryPortal - 0x6eAE8a269651B9e5238b0886108F80fD4f448Bb9