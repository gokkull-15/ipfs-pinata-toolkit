const IPFSPinataToolkit = require('./index');

async function exampleUsage() {
    try {
        // Initialize the toolkit
        console.log('🚀 Initializing IPFS Pinata Toolkit...\n');
        const ipfs = new IPFSPinataToolkit();

        // Wait a moment for authentication
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Example 1: Pin simple data with name, email, and metadata
        console.log('\n📝 Example 1: Pinning user data...');
        const userData = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            image: 'https://example.com/profile.jpg',
            bio: 'Software developer passionate about blockchain',
            social: {
                twitter: '@johndoe',
                github: 'johndoe'
            },
            skills: ['JavaScript', 'React', 'Blockchain']
        };

        const result1 = await ipfs.pinToIPFS(userData);
        
        if (result1.success) {
            console.log('\n✅ User data pinned successfully!');
            console.log('Use this IPFS hash:', result1.ipfsHash);
        }

        // Example 2: Pin a different type of data
        console.log('\n📝 Example 2: Pinning NFT metadata...');
        const nftData = {
            name: 'Cool NFT #001',
            email: 'creator@example.com',
            image: 'https://example.com/nft-image.png',
            description: 'This is a cool NFT with special properties',
            attributes: [
                { trait_type: 'Color', value: 'Blue' },
                { trait_type: 'Rarity', value: 'Rare' },
                { trait_type: 'Power', value: 85 }
            ],
            metadata: {
                category: 'NFT',
                collection: 'Cool Collection'
            }
        };

        const result2 = await ipfs.pinToIPFS(nftData);
        
        if (result2.success) {
            console.log('\n✅ NFT metadata pinned successfully!');
            console.log('Use this IPFS hash:', result2.ipfsHash);
        }

        // Example 3: List all pins
        console.log('\n📋 Example 3: Listing all pins...');
        const pins = await ipfs.listPins();
        if (pins.success) {
            console.log(`Found ${pins.count} pinned items`);
        }

    } catch (error) {
        console.error('❌ Error in example:', error.message);
        console.log('\n💡 Make sure your .env file contains:');
        console.log('API_KEY=your_pinata_api_key');
        console.log('API_SECRET=your_pinata_api_secret');
        console.log('JWT=your_pinata_jwt_token');
    }
}

// Run the example
if (require.main === module) {
    exampleUsage();
}

module.exports = exampleUsage;
