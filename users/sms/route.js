import twilio from 'twilio';

const accountSid = 'ACaf4c017a35fec2ddf5d91dccd0e1f9da';
const authToken = "d655293419791283d3012a97ff6f18d6"; // Keep this in env variables for security
const twilioPhoneNumber = '+15098222608';
const emergencyPhoneNumber = '+919987993503';

const client = twilio(accountSid, authToken);

export async function POST(request) {
    try {
        const { latitude, longitude, timestamp } = await request.json();
        
        const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        const messageBody = `Help I am at: ${locationUrl}`;

        const message = await client.messages.create({
            body: messageBody,
            from: twilioPhoneNumber,
            to: emergencyPhoneNumber
        });

        return new Response(JSON.stringify({ success: true, messageId: message.sid }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('SMS Error:', error);
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}