# NFTGenerator_NodeJS

# Introduction:

<img src="https://user-images.githubusercontent.com/66758271/142370427-4ef041de-0b6c-4ed1-92a2-d60d64384d9a.png" width="100px"></img>
<img src="https://user-images.githubusercontent.com/66758271/142370473-db4c9f79-dd4f-4c67-95d8-8d809672045e.png" width="100px"></img>

An NFT (Non-Fungible Token) Auto Generator using NodeJS. Simply add the layers of the NFT Art, and the variety of layer properties &amp; generate 1000s of NFTs on the click of a button!
The Program creates generative art by using the Canvas API and NodeJS.

# Installation:

If you are cloning the project then run this first, otherwise you can download the source code on the release page and skip this step.

> git clone https://github.com/RahulSharma-10/NFTGenerator_NodeJS.git

Go to the root of your folder and run this command if you have yarn installed.

> yarn install

Alternatively you can run this command if you have node installed.

> npm install

**Note**
The Project is currently in its interim build stage, hence, it would be recommended to clone & start working on it once the build update is out. 

# Working:

- Every Image can be broken down into multiple layers. The Program randomly deduces these layers and mounts them on top of each other using Canvas. Once the mounting process 
is complete, the canvas saves the image in the output folder.

- The Generation of these layer numbers is completely unique with iterative checks, to reduce the loading & await image time, Promises have been used. 

- The Program can generate upto 10000 images in a short span of time. 

# Preview:


**NFT Collection Icon**:

![image](https://user-images.githubusercontent.com/66758271/142372095-1461dd0e-d057-4136-b46c-1d462fdc0a31.png)

**Output Folder Preview:** 

![image](https://user-images.githubusercontent.com/66758271/142372055-8f7990bc-16ab-4d26-b420-77861546cded.png)


# Why Solana & Key Take-aways:

- Having personally used the Solana Network, Solana promises a far more reduced gas fees over it's counterpart Ethereum.
- Although the scalability of the project is endless, this will be created in the form of it to be a replicable user repository to ease out experience. 
