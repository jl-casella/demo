# Dockerfile for API container

# Use a Node.js base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the API source code
COPY . .

# Install Python and pip
RUN apt-get update && apt-get install -y python3 python3-pip software-properties-common

# Upgrade pip
RUN pip3 install --upgrade pip

# Install Rust nightly and Cargo
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain none && \
    export PATH="$HOME/.cargo/bin:$PATH" && \
    rustup toolchain install nightly && \
    rustup default nightly

# Set environment variables for Rust and Cargo
ENV PATH="/root/.cargo/bin:${PATH}"

# Set environment variables for Rust and Cargo
ENV PATH="/root/.cargo/bin:${PATH}"

# Install system dependencies required for building Python packages
RUN apt-get install -y build-essential libffi-dev

# Install Mythril using pip flag (use --no-cache-dir if needed)
RUN pip3 install mythril

# Install solc
RUN curl -o /usr/bin/solc -fL https://github.com/ethereum/solidity/releases/download/v0.8.20/solc-static-linux
RUN chmod u+x /usr/bin/solc

# Expose the API port
EXPOSE 3000

# Start the API server
CMD ["npm", "start"]