const { PinataSDK } = require('pinata');
require('dotenv').config();

class IPFSPinataToolkit {
    constructor() {
        // Initialize Pinata with credentials from .env
        const jwt = process.env.JWT || process.env.PINATA_JWT;

        if (!jwt) {
            throw new Error('Missing Pinata JWT token. Please check your .env file contains JWT or PINATA_JWT');
        }

        this.pinata = new PinataSDK({
            pinataJwt: jwt,
            pinataGateway: "https://gateway.pinata.cloud"
        });
        
        // Test authentication on initialization
        this.testAuthentication();
    }

    async testAuthentication() {
        try {
            const result = await this.pinata.testAuthentication();
            console.log('✅ Pinata authentication successful:', result.message || 'Connected');
        } catch (error) {
            console.error('❌ Pinata authentication failed:', error.message);
        }
    }

    /**
     * Pin any data to IPFS via Pinata
     * @param {Object} params - The parameters for pinning
     * @param {string} params.name - Name for the pinned content
     * @param {string} params.email - Email associated with the content (optional)
     * @param {string} params.image - Image URL or base64 data (optional)
     * @param {Object} params.metadata - Any additional metadata
     * @param {any} params.data - The actual data to pin (can be object, string, etc.)
     * @returns {Promise<Object>} - Returns IPFS hash and pin details
     */
    async pinToIPFS(params) {
        try {
            const { name, email, image, metadata = {}, data, ...otherParams } = params;

            if (!name) {
                throw new Error('Name is required for pinning content');
            }

            // Prepare the content to pin
            const contentToPin = {
                name,
                email,
                image,
                data,
                ...otherParams,
                timestamp: new Date().toISOString(),
                ...metadata
            };

            // Pin options
            const options = {
                metadata: {
                    name: name,
                    keyValues: {
                        email: email || 'N/A',
                        hasImage: !!image,
                        timestamp: new Date().toISOString()
                    }
                }
            };

            console.log('📌 Pinning content to IPFS...');
            const result = await this.pinata.upload.public.json(contentToPin, options);
            
            const ipfsHash = result.cid;
            const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
            
            console.log('🎉 Successfully pinned to IPFS!');
            console.log('📋 IPFS Hash:', ipfsHash);
            console.log('🌐 IPFS URL:', ipfsUrl);
            console.log('📊 Pin Size:', result.size || 'N/A');
            console.log('⏰ Timestamp:', result.created_at || new Date().toISOString());

            return {
                success: true,
                ipfsHash: ipfsHash,
                ipfsUrl: ipfsUrl,
                pinSize: result.size,
                timestamp: result.created_at || new Date().toISOString(),
                fullResult: result
            };

        } catch (error) {
            console.error('❌ Error pinning to IPFS:', error.message);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Pin a file to IPFS via Pinata
     * @param {string} filePath - Path to the file
     * @param {Object} options - Additional options
     * @returns {Promise<Object>} - Returns IPFS hash and pin details
     */
    async pinFileToIPFS(filePath, options = {}) {
        try {
            const fs = require('fs');
            const path = require('path');
            
            if (!fs.existsSync(filePath)) {
                throw new Error(`File not found: ${filePath}`);
            }

            const fileName = path.basename(filePath);
            const file = fs.createReadStream(filePath);

            const uploadOptions = {
                metadata: {
                    name: options.name || fileName,
                    keyValues: {
                        originalName: fileName,
                        timestamp: new Date().toISOString(),
                        ...options.metadata
                    }
                }
            };

            console.log('📁 Pinning file to IPFS...');
            const result = await this.pinata.upload.public.file(file, uploadOptions);
            
            const ipfsHash = result.cid;
            const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
            
            console.log('🎉 Successfully pinned file to IPFS!');
            console.log('📋 IPFS Hash:', ipfsHash);
            console.log('🌐 IPFS URL:', ipfsUrl);

            return {
                success: true,
                ipfsHash: ipfsHash,
                ipfsUrl: ipfsUrl,
                pinSize: result.size,
                timestamp: result.created_at || new Date().toISOString(),
                fullResult: result
            };

        } catch (error) {
            console.error('❌ Error pinning file to IPFS:', error.message);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Get pinned content from IPFS
     * @param {string} ipfsHash - The IPFS hash to retrieve
     * @returns {Promise<Object>} - Returns the content
     */
    async getFromIPFS(ipfsHash) {
        try {
            const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
            
            // Use fetch API (available in Node.js 18+) or require node-fetch for older versions
            let response;
            try {
                response = await fetch(url);
            } catch (fetchError) {
                // Fallback for older Node.js versions
                const https = require('https');
                const http = require('http');
                const urlParse = require('url').parse;
                
                return new Promise((resolve, reject) => {
                    const parsedUrl = urlParse(url);
                    const client = parsedUrl.protocol === 'https:' ? https : http;
                    
                    const req = client.request(parsedUrl, (res) => {
                        let data = '';
                        res.on('data', chunk => data += chunk);
                        res.on('end', () => {
                            try {
                                const jsonData = JSON.parse(data);
                                console.log('✅ Retrieved content from IPFS:', ipfsHash);
                                resolve({
                                    success: true,
                                    data: jsonData,
                                    url: url
                                });
                            } catch (parseError) {
                                resolve({
                                    success: true,
                                    data: data,
                                    url: url
                                });
                            }
                        });
                    });
                    
                    req.on('error', (error) => {
                        reject({
                            success: false,
                            error: error.message
                        });
                    });
                    
                    req.end();
                });
            }
            
            const contentType = response.headers.get('content-type');
            let data;
            
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text();
            }
            
            console.log('✅ Retrieved content from IPFS:', ipfsHash);
            return {
                success: true,
                data: data,
                url: url
            };
        } catch (error) {
            console.error('❌ Error retrieving from IPFS:', error.message);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * List all pinned files
     * @returns {Promise<Object>} - Returns list of pinned files
     */
    async listPins() {
        try {
            const result = await this.pinata.files.public.list();
            console.log('📋 Found', result.files?.length || 0, 'pinned items');
            return {
                success: true,
                pins: result.files || [],
                count: result.files?.length || 0,
                nextPageToken: result.next_page_token,
                fullResult: result
            };
        } catch (error) {
            console.error('❌ Error listing pins:', error.message);
            return {
                success: false,
                error: error.message
            };
        }
    }
}

module.exports = IPFSPinataToolkit;
