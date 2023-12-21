const axios = require('axios');
const qs = require('qs');
require('dotenv').config();


const DELAY_IN_MS = 5000;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const ips = require('./allow_ips.json'); // simple array: ["192.168.1.1", "192.0.100.0/24"]
const whitelistIp = async (ip) => {
    const data = qs.stringify({
        'k': process.env.API_KEY,
        's': process.env.API_SECRET,
        'a': 'allowlist_ip',
        'ip': ip,
    });

    try {
        const response = await axios.post('https://waf.sucuri.net/api?v2', data);
        console.log(`IP ${ip} response:`, response.data);
    } catch (error) {
        console.error(`Error when sending IP ${ip}:`, error);
    }
};

const processIps = async () => {
    for (const ip of ips) {
        await whitelistIp(ip);
        await sleep(DELAY_IN_MS);
    }
};

processIps();
