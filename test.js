const IPFSPinataToolkit = require('./index');

async function runTests() {
    console.log('🧪 Running IPFS Pinata Toolkit Tests...\n');

    try {
        // Test 1: Initialize toolkit
        console.log('Test 1: Initializing toolkit...');
        const ipfs = new IPFSPinataToolkit();
        console.log('✅ Toolkit initialized successfully\n');

        // Wait for authentication
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Test 2: Pin simple data
        console.log('Test 2: Pinning simple data...');
        const testData = {
            name: 'Test User',
            email: 'test@example.com',
            data: 'Hello IPFS World!',
            testId: Date.now()
        };

        const result = await ipfs.pinToIPFS(testData);
        
        if (result.success) {
            console.log('✅ Test 2 passed - Data pinned successfully');
            console.log('📋 IPFS Hash:', result.ipfsHash);
            
            // Test 3: Retrieve the data
            console.log('\nTest 3: Retrieving pinned data...');
            const retrieved = await ipfs.getFromIPFS(result.ipfsHash);
            
            if (retrieved.success) {
                console.log('✅ Test 3 passed - Data retrieved successfully');
                console.log('📄 Retrieved data:', JSON.stringify(retrieved.data, null, 2));
            } else {
                console.log('❌ Test 3 failed - Could not retrieve data');
            }
        } else {
            console.log('❌ Test 2 failed - Could not pin data');
            console.log('Error:', result.error);
        }

        // Test 4: List pins
        console.log('\nTest 4: Listing pins...');
        const pins = await ipfs.listPins();
        
        if (pins.success) {
            console.log('✅ Test 4 passed - Listed pins successfully');
            console.log(`📊 Total pins: ${pins.count}`);
        } else {
            console.log('❌ Test 4 failed - Could not list pins');
        }

        console.log('\n🎉 All tests completed!');

    } catch (error) {
        console.error('❌ Test failed with error:', error.message);
        
        if (error.message.includes('Missing Pinata credentials')) {
            console.log('\n💡 Setup Instructions:');
            console.log('1. Make sure your .env file exists with:');
            console.log('   API_KEY=your_pinata_api_key');
            console.log('   API_SECRET=your_pinata_api_secret');
            console.log('   JWT=your_pinata_jwt_token');
            console.log('2. Get your credentials from: https://app.pinata.cloud/');
        }
    }
}

// Run tests if this file is executed directly
if (require.main === module) {
    runTests();
}

module.exports = runTests;
