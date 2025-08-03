# 🚀 IPFS Pinata Toolkit - Quick Usage Guide

## Installation & Setup

### 1. Install the package
```bash
npm install ipfs-pinata-toolkit
```

### 2. Create your .env file
```bash
# Create .env file
JWT=your_pinata_jwt_token_here
```

Get your JWT from [Pinata](https://app.pinata.cloud/) → API Keys → Create New Key

### 3. Basic Usage

```javascript
const IPFSPinataToolkit = require('ipfs-pinata-toolkit');

// Initialize
const ipfs = new IPFSPinataToolkit();

// Pin your data
const result = await ipfs.pinToIPFS({
    name: 'John Doe',
    email: 'john@example.com', 
    image: 'https://example.com/photo.jpg',
    data: 'Any data you want to store'
});

console.log('IPFS Hash:', result.ipfsHash);
console.log('IPFS URL:', result.ipfsUrl);
```

## 📋 All Available Methods

### `pinToIPFS(params)`
Pin JSON data to IPFS
- `name` (required) - Name for the content
- `email` (optional) - Email associated with content
- `image` (optional) - Image URL or base64
- `data` (optional) - Any additional data
- `...otherParams` - Any other data you want to include

### `pinFileToIPFS(filePath, options)`
Pin a file to IPFS
- `filePath` - Path to the file
- `options` - Additional metadata options

### `getFromIPFS(ipfsHash)`
Retrieve content from IPFS using hash

### `listPins()`
List all your pinned content

## 🎯 Usage Examples

### User Profile
```javascript
const result = await ipfs.pinToIPFS({
    name: 'Alice Smith',
    email: 'alice@example.com',
    image: 'https://example.com/alice.jpg',
    bio: 'Blockchain developer',
    social: { twitter: '@alice', github: 'alice-dev' }
});
```

### NFT Metadata
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

### Any JSON Data
```javascript
const result = await ipfs.pinToIPFS({
    name: 'My App Data',
    appData: {
        version: '1.0',
        settings: { theme: 'dark' },
        userPreferences: ['feature1', 'feature2']
    }
});
```

## 🖥️ CLI Usage

```bash
# Quick pin via command line
node cli.js "Document Name" "email@example.com" "image_url" "data"

# Examples
node cli.js "My Document"
node cli.js "John Doe" "john@example.com" 
node cli.js "NFT #1" "creator@example.com" "https://example.com/image.jpg"
```

## ⚡ Testing

```bash
npm test    # Run tests
npm start   # Run examples
npm run cli # Run CLI help
```

## 🔧 Error Handling

```javascript
const result = await ipfs.pinToIPFS({ name: 'Test' });

if (result.success) {
    console.log('Success!', result.ipfsHash);
} else {
    console.error('Error:', result.error);
}
```

## 📝 Response Format

All methods return objects with:
- `success` (boolean) - Whether operation succeeded
- `ipfsHash` (string) - The IPFS hash (if successful)
- `ipfsUrl` (string) - Full IPFS URL (if successful)
- `error` (string) - Error message (if failed)
- `fullResult` (object) - Complete response from Pinata

## 🌐 IPFS URLs

Your content will be available at:
- `https://gateway.pinata.cloud/ipfs/{hash}`
- `https://{hash}.ipfs.dweb.link/`
- Any other IPFS gateway

## 💡 Tips

1. **Only JWT Required**: Just add your Pinata JWT to `.env`
2. **Flexible Data**: Pass any JSON data structure
3. **Automatic Metadata**: Timestamps and metadata added automatically
4. **Error Handling**: All methods include comprehensive error handling
5. **Gateway Access**: Content immediately available via IPFS gateways
