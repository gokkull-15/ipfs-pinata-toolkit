# IPFS Pinata Toolkit

🚀 **Easy IPFS integration with Pinata** - Just provide your keys and start pinning!

A simple, user-friendly npm package that makes it easy to store data on IPFS using Pinata. Perfect for developers who want to quickly integrate IPFS storage without dealing with complex configurations.

## ✨ Features

- 🔐 **Simple Authentication** - Just add your Pinata credentials to `.env`
- 📦 **Easy Data Pinning** - Pin any JSON data with a single function call
- 📁 **File Upload Support** - Pin files directly to IPFS
- 🔍 **Retrieve Content** - Get your pinned content back easily
- 📊 **List Management** - View all your pinned content
- ✅ **Built-in Testing** - Verify your setup works
- 🎯 **TypeScript Ready** - Full TypeScript support (coming soon)

## 🚀 Quick Start

### 1. Install the Package

```bash
npm install ipfs-pinata-toolkit
```

### 2. Create your `.env` file

Create a `.env` file in your project root:

```env
JWT=your_pinata_jwt_token_here
```

**Get your JWT token from [Pinata](https://app.pinata.cloud/):**
1. Sign up/Login to Pinata
2. Go to API Keys section
3. Create a new API key
4. Copy the JWT token

### 3. Start Using It!

```javascript
const IPFSPinataToolkit = require('ipfs-pinata-toolkit');

async function main() {
    // Initialize (automatically reads from .env)
    const ipfs = new IPFSPinataToolkit();
    
    // Pin your data to IPFS
    const result = await ipfs.pinToIPFS({
        name: 'John Doe',
        email: 'john@example.com',
        image: 'https://example.com/photo.jpg',
        bio: 'Software developer',
        data: 'Any additional data you want to store'
    });
    
    if (result.success) {
        console.log('🎉 Pinned to IPFS!');
        console.log('📋 IPFS Hash:', result.ipfsHash);
        console.log('🌐 URL:', result.ipfsUrl);
    }
}

main();
```

## 📖 API Reference

### `new IPFSPinataToolkit()`

Creates a new instance and automatically authenticates with Pinata using credentials from your `.env` file.

### `pinToIPFS(params)`

Pins JSON data to IPFS.

**Parameters:**
- `name` (string, required) - Name for the content
- `email` (string, optional) - Email associated with the content
- `image` (string, optional) - Image URL or base64 data
- `data` (any, optional) - Any additional data to store
- `metadata` (object, optional) - Additional metadata
- `...otherParams` - Any other parameters you want to include

**Returns:** Promise with result object containing `ipfsHash`, `ipfsUrl`, etc.

### `pinFileToIPFS(filePath, options)`

Pins a file to IPFS.

**Parameters:**
- `filePath` (string, required) - Path to the file
- `options` (object, optional) - Additional options and metadata

### `getFromIPFS(ipfsHash)`

Retrieves content from IPFS using its hash.

### `listPins()`

Lists all your pinned content.

## 🔧 Examples

### Pin User Profile Data
```javascript
const result = await ipfs.pinToIPFS({
    name: 'Alice Smith',
    email: 'alice@example.com',
    image: 'https://example.com/alice.jpg',
    bio: 'Blockchain enthusiast',
    social: {
        twitter: '@alice',
        github: 'alice-dev'
    }
});
```

### Pin NFT Metadata
```javascript
const result = await ipfs.pinToIPFS({
    name: 'Cool NFT #001',
    image: 'https://example.com/nft.png',
    description: 'A unique digital collectible',
    attributes: [
        { trait_type: 'Color', value: 'Blue' },
        { trait_type: 'Rarity', value: 'Rare' }
    ]
});
```

### Pin a File
```javascript
const result = await ipfs.pinFileToIPFS('./my-document.pdf', {
    name: 'Important Document',
    metadata: { category: 'documents' }
});
```

## 🧪 Testing

Run the included test to verify everything works:

```bash
npm test
```

Or run the example:

```bash
npm start
```

## 🔐 Environment Variables

Your `.env` file should contain:

```env
# Pinata JWT Token (recommended - only this is needed)
JWT=your_pinata_jwt_token

# Alternative format (also supported)
PINATA_JWT=your_pinata_jwt_token
```

## 🚨 Error Handling

The package includes comprehensive error handling:

```javascript
const result = await ipfs.pinToIPFS({ name: 'Test' });

if (result.success) {
    console.log('Success!', result.ipfsHash);
} else {
    console.error('Error:', result.error);
}
```

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

MIT License - feel free to use in your projects!

## 🔗 Links

- [Pinata Documentation](https://docs.pinata.cloud/)
- [IPFS Documentation](https://docs.ipfs.io/)
- [GitHub Repository](https://github.com/your-username/ipfs-pinata-toolkit)

---

Made with ❤️ for the decentralized web
