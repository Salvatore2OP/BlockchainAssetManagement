Blockchain Asset Management
This project implements a blockchain-based system to manage and track assets using Hyperledger Fabric and Node.js.


Requirements
- Node.js
- Hyperledger Fabric Test Network
- Fabric Gateway SDK


Setup

1. Clone this repository.
2. Install dependencies:
   npm install express body-parser fabric-network.
3.Set up the Hyperledger Fabric test network by following the instructions from the Hyperledger documentation.


Running the Application

1.Start the Hyperledger Fabric network.

2.Run the application
    node index.js

3.Send a POST request to create an asset:
    curl -X POST http://localhost:3000/assets -H "Content-Type: application/json" -d '{"DEALERID":"123", "MSISDN":"9876543210", "MPIN":"1234", "BALANCE":"1000", "STATUS":"active"}'