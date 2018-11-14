# EthExplorer (In Progress)

![EthExplorer Screenshot](http://i.imgur.com/NHFYq0x.png)

##Geth

Install **Getth**

```
$ sudo apt-get install software-properties-common
$ sudo add-apt-repository -y ppa:ethereum/ethereum
$ sudo apt-get update
$ sudo apt-get install ethereum
```

##Installation

Start the program. All dependencies will be automatically downloaded

`npm start`

Then visit http://localhost:8000 in your browser of choice. You might get an error message:

`geth --rpc --rpccorsdomain "http://localhost:8000"`

Install [geth](https://github.com/ethereum/go-ethereum/wiki/Building-Ethereum "Geth install") if you don't already have it, then run the above command.

Then refresh the page in your browser.
