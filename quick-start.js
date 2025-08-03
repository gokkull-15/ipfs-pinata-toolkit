// 🚀 Quick Start Example - Copy this code and run it!

const IPFSPinataToolkit = require('ipfs-pinata-toolkit');

async function quickExample() {
    try {
        console.log('🚀 Initializing IPFS Pinata Toolkit...');
        
        // Initialize the toolkit (reads JWT from your .env file)
        const ipfs = new IPFSPinataToolkit();
        
        // Wait for authentication
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Example 1: Store simple data
        console.log('\n📝 Storing your first data on IPFS...');
        const result1 = await ipfs.pinToIPFS({
            name: 'My First IPFS Upload',
            email: 'your-email@example.com',
            message: 'Hello, decentralized world!',
            data: {
                myApp: 'IPFS Test',
                timestamp: new Date().toISOString(),
                likes: 42,
                tags: ['blockchain', 'ipfs', 'web3']
            }
        });
        
        if (result1.success) {
            console.log('✅ SUCCESS! Your data is now on IPFS!');
            console.log('📋 IPFS Hash:', result1.ipfsHash);
            console.log('🌐 View at:', result1.ipfsUrl);
            console.log('📊 Size:', result1.pinSize, 'bytes');
        }
        
        // Example 2: Retrieve the data you just stored
        console.log('\n🔍 Retrieving your data from IPFS...');
        const retrieved = await ipfs.getFromIPFS(result1.ipfsHash);
        
        if (retrieved.success) {
            console.log('✅ Retrieved successfully!');
            console.log('📄 Your data:', JSON.stringify(retrieved.data, null, 2));
        }
        
        // Example 3: List all your pins
        console.log('\n📋 Listing all your IPFS pins...');
        const pins = await ipfs.listPins();
        
        if (pins.success) {
            console.log(`✅ You have ${pins.count} items pinned on IPFS`);
            console.log('📄 Recent pins:');
            pins.pins.slice(0, 3).forEach((pin, i) => {
                console.log(`  ${i+1}. ${pin.name} (${pin.cid.substring(0, 20)}...)`);
            });
        }
        
        console.log('\n🎉 All done! Your data is now on the decentralized web!');
        console.log('💡 Pro tip: Save the IPFS hash to use in your applications');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        
        if (error.message.includes('JWT')) {
            console.log('\n🔧 Setup needed:');
            console.log('1. Create a .env file in this directory');
            console.log('2. Add your Pinata JWT: JWT=your_jwt_token_here');
            console.log('3. Get JWT from: https://app.pinata.cloud/');
        }
    }
}

// Run the example
quickExample();
