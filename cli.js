#!/usr/bin/env node

const IPFSPinataToolkit = require('./index');

// Simple CLI usage example
async function quickStart() {
    if (process.argv.length < 3) {
        console.log('📦 IPFS Pinata Toolkit - Quick Start');
        console.log('Usage: node cli.js <name> [email] [image_url] [data]');
        console.log('');
        console.log('Examples:');
        console.log('  node cli.js "My Document"');
        console.log('  node cli.js "John Doe" "john@example.com"');
        console.log('  node cli.js "NFT #1" "creator@example.com" "https://example.com/image.jpg" "Special NFT data"');
        console.log('');
        console.log('Make sure your .env file contains your Pinata JWT token!');
        return;
    }

    try {
        const name = process.argv[2];
        const email = process.argv[3] || '';
        const image = process.argv[4] || '';
        const data = process.argv[5] || 'Data stored via CLI';

        console.log('🚀 Starting IPFS Pinata Toolkit...');
        const ipfs = new IPFSPinataToolkit();

        // Wait for authentication
        await new Promise(resolve => setTimeout(resolve, 1000));

        const result = await ipfs.pinToIPFS({
            name,
            email,
            image,
            data,
            cli: true,
            timestamp: new Date().toISOString()
        });

        if (result.success) {
            console.log('');
            console.log('🎉 SUCCESS! Your content has been pinned to IPFS');
            console.log('');
            console.log('📋 IPFS Hash:', result.ipfsHash);
            console.log('🌐 IPFS URL:', result.ipfsUrl);
            console.log('📊 Size:', result.pinSize, 'bytes');
            console.log('');
            console.log('💡 You can now use this IPFS hash in your applications!');
        } else {
            console.error('❌ Failed to pin content:', result.error);
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.message.includes('JWT')) {
            console.log('');
            console.log('💡 Setup your .env file with:');
            console.log('JWT=your_pinata_jwt_token');
            console.log('');
            console.log('Get your JWT from: https://app.pinata.cloud/');
        }
    }
}

if (require.main === module) {
    quickStart();
}
