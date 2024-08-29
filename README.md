# Kreative Capital - A Smart Contract-Based Crowdfunding Platform

UM FinTech Bootcamp Final Project (Project-3)

## Table of Contents

1. [Overview](#overview)
2. [Project Objectives](#project-objectives)
3. [Key Features](#key-features)
4. [Project Architecture](#project-architecture)
5. [Technologies and Tools](#technologies-and-tools)
6. [Expected Outcomes](#expected-outcomes)
7. [Project Evaluation Criteria](#project-evaluation-criteria)
8. [Conclusion](#conclusion)
9. [Setup and Installation](#setup-and-installation)
10. [Usage Instructions](#usage-instructions)
11. [Contributing](#contributing)
12. [License](#license)
13. [Acknowledgments](#acknowledgments)
14. [Author](#author)

---

## Overview

Kreative Capital is a groundbreaking, decentralized crowdfunding platform built on the Ethereum blockchain, designed to empower users with a more cost-effective and transparent way to raise and contribute funds. Unlike traditional crowdfunding platforms that can charge fees upwards of 5% or higher, Kreative Capital ensures that campaign creators can keep more of their hard-earned funds by charging only a minimal 1% fee. These savings allow creators to allocate more resources directly to their projects, rather than losing them to fees and gas costs.

One of the unique features of Kreative Capital is its use of KreativeToken (KT), the native token of the platform. Contributors exchange their Ether (ETH) for KT tokens, which are then used to fund campaigns. This approach minimizes the impact of Ethereum's often volatile gas fees, making the funding process more efficient and predictable. All transactions, from contributions to withdrawals, are managed by immutable smart contracts, ensuring that funds are handled securely and transparently.

With Kreative Capital, campaign creators can set funding goals, deadlines, and provide detailed campaign descriptions, while contributors can support causes they believe in, knowing their funds are protected. If a campaign does not meet its funding goal by the deadline, all contributions are automatically refunded to the contributors, maintaining a high level of trust and fairness.

Kreative Capital represents the future of crowdfunding, leveraging the power of blockchain to create a platform that is secure, cost-effective, and user-centric.

## Project Objectives

Kreative Capital is built with the following key objectives in mind:

1. **Cost-Efficiency**: To create a crowdfunding platform that significantly reduces the cost of raising funds. By charging only a 1% fee, Kreative Capital allows campaign creators to retain more of their funds compared to traditional platforms.

2. **Transparency and Security**: To leverage Ethereum smart contracts to ensure that all transactions, from contributions to fund withdrawals, are transparent and secure. The use of immutable smart contracts guarantees that funds are handled according to predefined rules, without any possibility of interference or fraud.

3. **User Empowerment**: To enable users to easily create and manage their crowdfunding campaigns through a user-friendly interface. Kreative Capital provides all the necessary tools for setting up a campaign, including defining a funding goal, setting deadlines, and describing the project.

4. **Contributor Confidence**: To instill confidence in contributors by ensuring that their funds are securely held in the smart contract until the campaign's funding goal is met. If the goal is not met by the deadline, contributors are automatically refunded their contributions, maintaining trust and fairness.

5. **Decentralized Token Utilization**: To introduce and manage the use of KreativeToken (KT) as the platform's native currency. Contributors exchange their Ether for KT tokens, which minimizes the impact of gas fees and streamlines the funding process.

6. **Scalability and Future Expansion**: To design the platform with scalability in mind, allowing for future enhancements such as the integration of decentralized storage for campaign data, improved user interfaces, and additional functionalities.

## Key Features

Kreative Capital incorporates several innovative features designed to provide a seamless and efficient crowdfunding experience. The platform's key features include:

1. **Campaign Creation**:

   - Users can easily create new crowdfunding campaigns by specifying essential details such as the campaign name, description, funding goal (in KreativeToken), and the duration of the campaign.
   - The platform allows for a flexible timeframe, enabling campaign creators to set the duration in days, hours, and minutes, providing precision in managing the campaign lifecycle.

2. **KreativeToken Exchange**:

   - Contributors exchange Ether for KreativeToken (KT) at a predefined rate (e.g., 100 KT per 1 Ether). This exchange reduces the impact of gas fees on contributions, ensuring that more of the funds go directly towards the campaign.
   - The exchange process is secure and straightforward, with contributors able to view their Ether and KT balances before making contributions.

3. **Contribution Mechanism**:

   - Supporters can contribute to campaigns by sending KT tokens. All contributions are securely recorded on the Ethereum blockchain, ensuring transparency and immutability.
   - Contributors can track the progress of the campaign, including the percentage of the goal reached and the remaining time, through a dynamic and interactive user interface.

4. **Fund Management**:

   - The platform automatically manages the collection and distribution of funds. If the funding goal is reached by the campaign's deadline, the campaign owner can withdraw the collected funds in KT.
   - In the event the funding goal is not met, the platform triggers an automatic refund mechanism, ensuring that all contributors receive their contributions back in KT.

5. **Low Fees**:

   - Kreative Capital charges a minimal fee of 1% on successful campaigns, significantly lower than the industry standard of 5% or more. This fee structure is designed to maximize the amount of funds available for campaign creators to use towards their projects.

6. **Security and Transparency**:

   - The use of Ethereum smart contracts ensures that all transactions are conducted according to predefined rules, with no possibility of manual interference or fraud.
   - Contributors and campaign creators can view transaction histories and verify that funds are being handled as promised, enhancing trust in the platform.

7. **User-Friendly Interface**:
   - The platform is designed with a focus on usability, offering a clean and intuitive interface that allows users to navigate through campaign creation, contribution, and fund management processes with ease.
   - Real-time updates and visual indicators, such as progress bars and countdown timers, provide users with a clear understanding of each campaign's status.

## Project Architecture

Kreative Capital is built on a robust and modular architecture designed to ensure scalability, security, and ease of use. The project is organized into three main components: the Smart Contracts, the Front-End Interface, and the Back-End Integration. Below is a detailed breakdown of each component:

1. **Smart Contracts**:

   - **KreativeToken Contract**: This contract handles the creation and management of the KreativeToken (KT) used within the platform. It includes functionalities for minting tokens, managing balances, and handling token transfers between users.
   - **CrowdfundingFactory Contract**: This contract acts as a factory for creating individual crowdfunding campaigns. Each campaign is deployed as a separate contract, ensuring that each project is isolated and managed independently.
   - **CrowdfundingCampaign Contract**: This contract represents each individual crowdfunding campaign. It includes logic for managing contributions, verifying the campaign's success, and handling fund withdrawals or refunds.

2. **Front-End Interface**:

   - **React Application**: The user interface is built using React, a popular JavaScript library for building interactive UIs. React ensures a responsive and dynamic user experience, allowing users to interact with the platform seamlessly.
   - **Web3 Integration**: The front-end uses Web3.js to connect with the Ethereum blockchain, enabling users to interact with smart contracts directly from their web browsers. This integration allows for real-time updates and ensures that users can manage their campaigns and contributions efficiently.
   - **Wallet Integration**: The platform supports MetaMask, a widely used Ethereum wallet, allowing users to connect their wallets to the platform securely. This integration enables users to exchange Ether for KreativeToken, create campaigns, and contribute to projects directly from their wallets.

3. **Back-End Integration**:

   - **Node.js/Express.js Server**: A lightweight backend server built with Node.js and Express.js is used to serve the front-end application and handle any necessary server-side logic, such as interacting with external APIs or managing user sessions.
   - **Ganache for Local Blockchain**: During development and testing, Ganache is used to simulate a local Ethereum blockchain. This allows developers to test smart contracts and front-end interactions in a controlled environment before deploying them to a live network.
   - **Mocha/Chai Testing Framework** (Optional): For thorough testing, the smart contracts can be tested using the Mocha/Chai framework. This ensures that all functions behave as expected and that the contracts are secure and reliable.

4. **Data Storage** (Optional):

   - **IPFS Integration**: For campaigns requiring the storage of large files or media, the platform can integrate with IPFS (InterPlanetary File System) to store data in a decentralized and tamper-proof manner. This ensures that all campaign-related data is immutable and accessible to users at all times.

5. **Security and Scalability**:
   - **Smart Contract Auditing**: The smart contracts are designed with security as a priority. Regular audits and thorough testing help identify and mitigate potential vulnerabilities.
   - **Modular Design**: The project's modular architecture allows for easy scalability. New features or improvements can be added without disrupting the existing functionality, ensuring that the platform can grow and adapt to future needs.

## Features

Kreative Capital offers a range of features designed to make decentralized crowdfunding accessible, transparent, and efficient. Below is a detailed overview of the platform's key features:

1. **Campaign Creation**:

   - **User-Friendly Interface**: Users can easily create a new crowdfunding campaign by providing essential details such as the campaign name, description, funding goal, and duration. The process is streamlined to ensure that anyone, regardless of technical expertise, can launch a campaign with minimal effort.
   - **Customizable Funding Goals**: Campaign creators can set their funding goals in KreativeToken (KT), ensuring that the campaign's financial needs are clearly defined from the start.
   - **Time-Bound Campaigns**: Creators can specify the duration of their campaigns, ensuring that fundraising efforts are time-bound and focused. This feature helps build urgency and encourages potential backers to contribute before the deadline.

2. **Contribution Mechanism**:

   - **Seamless Wallet Integration**: Contributors can easily connect their Ethereum wallets (e.g., MetaMask) to the platform and contribute Ether to the campaigns of their choice. Contributions are automatically converted to KreativeToken (KT) to ensure uniformity and to minimize gas fees.
   - **Real-Time Contribution Tracking**: The platform provides real-time updates on the amount of KT contributed to each campaign, allowing contributors to see how close a campaign is to reaching its goal.

3. **Goal Verification and Fund Management**:

   - **Automated Goal Verification**: The smart contract automatically verifies whether a campaign's funding goal has been met by the specified deadline. This eliminates the need for manual oversight and ensures that the process is fair and transparent.
   - **Secure Fund Withdrawal**: Once a campaign meets its funding goal, the creator can withdraw the collected funds in KreativeToken (KT). The withdrawal process is secure and straightforward, with all transactions recorded on the blockchain for full transparency.
   - **Refund Mechanism**: If a campaign does not meet its funding goal, contributors can claim refunds for their contributions. The smart contract handles this process automatically, ensuring that refunds are issued promptly and fairly.

4. **Low Transaction Fees**:

   - **1% Platform Fee**: Unlike traditional crowdfunding platforms that charge fees of 5% or more, Kreative Capital charges a minimal 1% fee on all funds raised. This ensures that campaign creators keep more of their funds, maximizing the impact of each campaign.
   - **Efficient Gas Usage**: By using KreativeToken (KT) for all transactions, the platform minimizes gas fees, making it more cost-effective for users.

5. **Dashboard and Campaign Management**:

   - **Comprehensive Dashboard**: Campaign creators and contributors can access a detailed dashboard that provides insights into campaign performance, including the amount of KT raised, the number of contributors, and the time remaining.
   - **Campaign Monitoring**: The platform allows users to monitor the progress of their campaigns in real-time, making it easy to track contributions, manage funds, and communicate with backers.

6. **Security and Transparency**:

   - **Immutable Blockchain Records**: All transactions on the platform are recorded on the Ethereum blockchain, ensuring that the data is immutable, transparent, and secure.
   - **Decentralized Data Storage** (Optional): For campaigns that require additional data storage, the platform can integrate with IPFS, providing a decentralized solution that guarantees data integrity and accessibility.

7. **Support for Future Enhancements**:
   - **Modular Design for Expansion**: The platform is designed with scalability in mind, allowing for future enhancements and new features without disrupting the existing functionality. Whether it's integrating with new wallets or adding support for additional tokens, Kreative Capital is built to evolve.

## Technologies and Tools

The Kreative Capital platform was built using a combination of cutting-edge technologies and tools to ensure a seamless, secure, and efficient user experience. Below is a list of the primary technologies and tools used in the development of this project:

### 1. Solidity

- **Purpose:** Solidity is the primary programming language used for writing the smart contracts that govern the crowdfunding process on the Ethereum blockchain.
- **Role:** The smart contracts manage campaign creation, contribution handling, goal verification, fund withdrawals, and refunds, ensuring that all transactions are automated and secure.

### 2. Remix IDE

- **Purpose:** Remix IDE is an online development environment used for writing, compiling, deploying, and testing Solidity smart contracts.
- **Role:** Remix was used extensively during the development phase to write and debug the smart contracts before deploying them to the Ethereum network.

### 3. MetaMask

- **Purpose:** MetaMask is a browser extension that allows users to interact with Ethereum-based decentralized applications (DApps) directly from their web browser.
- **Role:** MetaMask was used to manage accounts, sign transactions, and connect to the Ethereum network, enabling users to interact with the Kreative Capital platform.

### 4. Ethers.js

- **Purpose:** Ethers.js is a lightweight library used for interacting with the Ethereum blockchain from the front-end.
- **Role:** This library was used to connect the front-end interface with the Ethereum blockchain, allowing users to interact with the smart contracts through the web application.

### 5. React.js

- **Purpose:** React.js is a popular JavaScript library for building user interfaces.
- **Role:** React.js was used to develop the front-end of the Kreative Capital platform, ensuring a responsive and dynamic user experience.

### 6. Node.js & Express.js

- **Purpose:** Node.js is a JavaScript runtime, and Express.js is a web application framework for Node.js.
- **Role:** These technologies were used to build a simple backend server to serve the front-end and handle any additional logic required by the platform.

### 7. Ganache

- **Purpose:** Ganache is a personal Ethereum blockchain used for testing smart contracts locally.
- **Role:** Ganache was used during development to simulate the Ethereum network, allowing for the testing of smart contracts without the need to deploy them on the mainnet.

### 8. IPFS (Optional)

- **Purpose:** The InterPlanetary File System (IPFS) is a protocol and network designed to create a peer-to-peer method of storing and sharing hypermedia in a distributed file system.
- **Role:** Although not fully implemented, IPFS was considered for decentralized storage of campaign data, ensuring immutability and accessibility.

## Expected Outcomes

Kreative Capital aims to deliver the following outcomes:

1. **Functional Decentralized Crowdfunding Platform:**

   - A working platform that allows users to create, manage, and contribute to crowdfunding campaigns using Ethereum smart contracts and KreativeToken (KT).

2. **Seamless User Experience:**

   - A user-friendly interface that enables easy interaction with the platform, including campaign creation, fund contribution, and progress tracking, all within a decentralized environment.

3. **Secure and Transparent Fund Management:**

   - Transparent handling of funds through smart contracts, ensuring that contributions are securely managed, and refunds are automatically processed if a campaign's goal is not met.

4. **Low-Cost Crowdfunding:**

   - A platform that minimizes fees, charging only a 1% fee on successful campaigns, thus allowing campaign creators to retain more funds compared to traditional crowdfunding platforms.

5. **Comprehensive Documentation:**
   - Detailed documentation outlining the deployment, use, and technical aspects of the platform, ensuring that other developers can understand and build upon the project.

## Project Evaluation Criteria

The success of Kreative Capital will be evaluated based on the following criteria:

1. **Technical Implementation:**

   - The correctness and efficiency of the smart contracts, including their ability to manage contributions, verify goals, and handle fund withdrawals or refunds as intended.
   - The integration of the front-end with the Ethereum blockchain, ensuring seamless interaction between users and the smart contracts.

2. **User Interface and Experience:**

   - The usability and design of the platform's front-end, including ease of navigation, responsiveness, and clarity of information provided to users.

3. **Security and Transparency:**

   - The robustness of the smart contracts against common vulnerabilities, ensuring the security of funds and transparency in all transactions.
   - The transparency of the platform in handling contributions, withdrawals, and refunds, with all actions recorded on the blockchain.

4. **Documentation Quality:**
   - The completeness and clarity of the project documentation, including code comments, the README file, and any additional documentation that explains how to deploy and use the platform.

## Conclusion

Kreative Capital is an innovative decentralized crowdfunding platform that leverages blockchain technology to create a more transparent, secure, and cost-effective way to raise and contribute funds. By minimizing fees and using KreativeToken (KT) for contributions, the platform empowers users to maximize the impact of their campaigns while ensuring that contributors' funds are managed with the highest level of integrity. Through its seamless user interface and robust smart contracts, Kreative Capital represents the future of crowdfunding, offering a compelling alternative to traditional platforms.

## Setup and Installation

To get started with the Kreative Capital platform, follow these steps to set up and deploy the project on your local machine or a test Ethereum network.

### 1. Clone the Repository

First, clone the Kreative Capital repository from GitHub:

```bash
git clone https://github.com/AlexC3105/KreativeCapital.git
cd KreativeCapital
```

### 2. Install Dependencies

Install the necessary dependencies for both the front-end and back-end of the project. Ensure you have Node.js and npm (or Yarn) installed on your machine.

```bash
# Install dependencies for the smart contracts and backend
npm install

# Navigate to the React app directory and install dependencies
cd kreativecapital  # Navigate to the kreativecapital React app folder
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory of the project. This file will store your environment variables, such as the RPC URL for Ganache and the private keys for your test accounts. Below is an example of what your `.env` file might look like:

```env
# Ganache RPC access point
REACT_APP_GANACHE_RPC_URL=http://127.0.0.1:7545

# Ganache test accounts private keys (for reference)
REACT_APP_GANACHE_PRIVATE_KEY_1=your-private-key-here
REACT_APP_GANACHE_PRIVATE_KEY_2=your-private-key-here
REACT_APP_GANACHE_PRIVATE_KEY_3=your-private-key-here
# ... add more as needed

# Corresponding Addresses (For reference only)
REACT_APP_GANACHE_ADDRESS_1=your-address-here
REACT_APP_GANACHE_ADDRESS_2=your-address-here
REACT_APP_GANACHE_ADDRESS_3=your-address-here
# ... add more as needed

# KreativeToken (KT) token address
REACT_APP_KREATIVE_TOKEN_ADDRESS=your-token-address-here

# CrowdfundingFactory contract address
REACT_APP_CROWDFUNDING_FACTORY_ADDRESS=your-factory-address-here
```

Ensure that you replace the placeholder values with your actual private keys and addresses (Note: If using Ganache, replace with Ganache provided addresses and private keys).

### 4. Compile and Deploy Smart Contracts

Using the Remix IDE or a local development environment, compile and deploy the smart contracts to your local Ganache instance or a testnet like Ropsten or Rinkeby.

```bash
# In your project directory
npx hardhat compile

# Deploy the contracts
npx hardhat run scripts/deploy.js --network localhost
```

After deploying, update your `.env` file with the addresses of the deployed contracts.

### 5. Start the Local Development Server

Navigate to the front-end directory and start the React development server:

```bash
cd kreativecapital
npm start
```

This will launch the application in your web browser, connected to your local Ganache instance.

### 6. Interact with the Platform

Once the application is running, you can:

- **Create a campaign**: Navigate to the "Create Campaign" page, fill in the required details, and deploy a new campaign contract.
- **Contribute to a campaign**: Use the "Contribute" functionality to exchange Ether for KreativeToken (KT) and support a campaign.
- **Manage campaigns**: Access the admin panel to monitor and withdraw funds from successful campaigns or receive refunds for failed campaigns.

### 7. Testing

To ensure the functionality of the platform, you can run unit tests on the smart contracts:

```bash
npx hardhat test
```

These tests will verify that the contracts behave as expected, including the proper handling of contributions, refunds, and withdrawals.

## Usage Instructions

Kreative Capital is designed to be intuitive and easy to use for both campaign creators and contributors. Follow the steps below to get started:

### 1. Connect Your Wallet

- **Install MetaMask**: If you haven't already, install the MetaMask extension in your web browser.
- **Connect to Kreative Capital**: Open the Kreative Capital platform and connect your MetaMask wallet. Ensure that your wallet is connected to the appropriate Ethereum network (e.g., the Ganache local blockchain for testing).

### 2. Exchange Ether for KreativeToken (KT)

- **Navigate to the "My Account" Page**: Access the "My Account" section from the navigation menu.
- **Buy KreativeToken**: Use the provided interface to exchange your Ether (ETH) for KreativeToken (KT) at the predefined rate (e.g., 100 KT per 1 ETH). Your KT balance will be updated in real-time.

### 3. Create a Campaign

- **Navigate to the "Create Campaign" Page**: Click on the "Create Campaign" option from the navigation menu.
- **Fill in Campaign Details**: Provide essential details such as the campaign name, description, funding goal (in KT), and the duration (days, hours, and minutes).
- **Deploy the Campaign Contract**: Once all details are filled in, deploy your campaign to the Ethereum blockchain. Upon successful deployment, you will receive a contract address for your campaign.

### 4. Contribute to a Campaign

- **Visit the Campaign Page**: Navigate to the "Campaigns" section to browse available campaigns or enter a specific campaign's contract address.
- **Support the Campaign**: Use the "Contribute" functionality to send KT tokens to the campaign. Your contribution will be securely recorded on the blockchain, and you can track the campaign's progress in real-time.

### 5. Manage Your Campaign

- **Access the Dashboard**: Go to the "Dashboard" section and enter the contract address of your campaign.
- **Monitor Campaign Progress**: View real-time updates on contributions, remaining time, and whether the campaign goal has been met.
- **Withdraw Funds or Claim Refunds**: If your campaign is successful, you can withdraw the collected KT funds. If the campaign fails to meet its goal, contributors can claim their refunds directly through the dashboard.

### 6. Admin Control Panel (For Platform Administrators)

- **Authenticate**: Triple-click to access the hidden admin control panel. Enter the correct PIN to gain access.
- **Mint Tokens**: As an administrator, you can mint additional KreativeToken (KT) as needed.
- **Monitor Platform Activity**: Use the admin panel to oversee platform-wide activities, manage accounts, and ensure the system is functioning smoothly.

## Contributing

We welcome contributions to the Kreative Capital platform! Whether you're fixing bugs, adding new features, or improving documentation, your efforts are highly appreciated. To contribute, please follow the guidelines below.

### 1. Fork the Repository

Start by forking the Kreative Capital repository on GitHub. This will create a copy of the project under your GitHub account.

### 2. Clone Your Fork

Clone your forked repository to your local machine:

```bash
git clone https://github.com/AlexC3105/KreativeCapital.git
cd KreativeCapital
```

### 3. Create a New Branch

Before making any changes, create a new branch to isolate your work. Use a descriptive name for your branch that reflects the feature or bug you're working on:

```bash
git checkout -b feature/new-feature-name
```

### 4. Make Your Changes

Make the necessary changes in your branch. Be sure to follow the project's coding standards and best practices.

### 5. Test Your Changes

Thoroughly test your changes to ensure they work as expected. This includes running any existing tests and adding new tests if necessary:

```bash
npx hardhat test
```

### 6. Commit and Push Your Changes

Once your changes are ready, commit them to your branch:

```bash
git add .
git commit -m "Description of your changes"
git push origin feature/new-feature-name
```

### 7. Submit a Pull Request

Go to the original Kreative Capital repository on GitHub and submit a pull request (PR) from your branch. Provide a clear and concise description of your changes, including the problem you're solving or the feature you're adding.

### 8. Code Review

Your pull request will be reviewed by the project maintainers. Be open to feedback and make any requested changes. Once your PR is approved, it will be merged into the main branch.

### 9. Stay Updated

After your PR is merged, make sure to stay updated with the latest changes in the main repository. You can do this by regularly pulling updates from the main branch:

```bash
git checkout main
git pull upstream main
```

### 10. Contributor Recognition

All contributors are recognized for their contributions in the CONTRIBUTORS.md file. We appreciate every contribution, no matter how small!

Thank you for contributing to Kreative Capital and helping to make decentralized crowdfunding more accessible and efficient!

## License

Kreative Capital is licensed under the MIT License. This means you are free to use, modify, and distribute this software under certain conditions. The full text of the license is provided below.

```license
MIT License

Copyright (c) 2024 Alexandr Climenco

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Acknowledgments

We would like to express our gratitude to the following individuals and organizations who contributed to the development of Kreative Capital:

- **University of Miami FinTech Bootcamp Instructors and TA's**: For their guidance, support, and expertise throughout the project.
- **OpenZeppelin**: For providing secure and reliable smart contract libraries that helped in the development of our smart contracts.
- **Ethereum Community**: For the wealth of resources, tutorials, and support available, which greatly assisted in understanding and implementing blockchain technology.
- **Ganache and Truffle Teams**: For providing the tools that made local blockchain development and testing seamless.
- **React and Ethers.js Communities**: For creating and maintaining the libraries that powered our front-end and blockchain interactions.

Special thanks to all the contributors and testers who provided valuable feedback, helping to improve the platform.

## Author

**Alexandr Climenco**

This project was built by Alexandr Climenco as the final project for the 2024 UM FinTech Bootcamp. The Kreative Capital platform represents a culmination of the skills and knowledge acquired throughout the bootcamp, showcasing a deep understanding of blockchain technology, smart contract development, and decentralized applications (DApps).

For more information or to connect with the author:

- GitHub: [GitHub Profile](https://github.com/AlexC3105)
- Email: [digital.liberators@gmail.com](mailto:digital.liberators@gmail.com)
