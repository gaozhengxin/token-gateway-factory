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