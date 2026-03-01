// tracking.js
function getOrCreateSessionId() {
    let sessionId = sessionStorage.getItem('letterave_sessionId');
    if (!sessionId) {
        sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
        sessionStorage.setItem('letterave_sessionId', sessionId);
    }
    return sessionId;
}

const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxhUnjtAWLDYPXPfNz4NdawzGmQBAvtpwiJqsb-hsAT2hJt0qCISBus8HPi8jiNv0AO0g/exec';

/**
 * Sends unified tracking events to Vercel Analytics and Google Sheets.
 * 
 * @param {string} vercelEventName - Name of the event in Vercel Analytics
 * @param {string} webhookStatus - Name of the event in Google Sheets Webhook
 * @param {object} payload - Form data payload
 */
window.sendTrackingEvent = function (vercelEventName, webhookStatus, payload = {}) {
    // 1. Vercel Analytics Event
    if (typeof window.va !== 'undefined') {
        window.va('event', { name: vercelEventName });
    }

    // 2. Google Sheets Webhook Event
    const sessionId = getOrCreateSessionId();

    // We use URLSearchParams to enforce application/x-www-form-urlencoded
    // This allows Google Apps Script (doPost) to easily digest e.parameter without parsing multipart/form-data
    const params = new URLSearchParams();
    params.append('sessionId', sessionId);
    params.append('status', webhookStatus);

    // Default form payload mapping
    params.append('sender', payload.senderName || '');
    params.append('receiver', payload.receiverName || '');

    // Construct address
    let fullAddress = '';
    if (payload.receiverAddress) {
        fullAddress = payload.receiverAddress;
        if (payload.receiverAddressDetail) {
            fullAddress += ` ${payload.receiverAddressDetail}`;
        }
    }
    params.append('address', fullAddress.trim());

    params.append('message', payload.message || '');

    // Determine the most relevant contact
    let contact = '';
    if (payload.fakeDoorLeadContact) contact = payload.fakeDoorLeadContact;
    else if (payload.senderPhone) contact = payload.senderPhone;
    else if (payload.receiverPhone) contact = payload.receiverPhone;

    params.append('contact', contact);

    // 3. Dispatch Webhook
    // Use navigator.sendBeacon where possible to ensure reliable delivery during page unloads
    if (navigator.sendBeacon) {
        navigator.sendBeacon(WEBHOOK_URL, params);
    } else {
        // Fallback to fetch with no-cors to prevent CORS preflight blocks
        fetch(WEBHOOK_URL, {
            method: 'POST',
            body: params,
            keepalive: true,
            mode: 'no-cors'
        }).catch(err => console.error('Tracking Webhook failed:', err));
    }
};
