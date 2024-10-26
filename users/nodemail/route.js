import { NextResponse } from "next/server";
import { Users } from "@/models/userModel";
import mongoose from "mongoose";
import { connectionSrt } from '@/models/dbMongo';
import { mailOptions, transporter } from "@/lib/nodeMailer";

export async function POST(request) {
    try {
        const body = await request.json();
        const { username, response } = body; // Ensure you're getting 'username'

        // Ensure all required fields are present
        if (!username || !response) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        await mongoose.connect(connectionSrt);

        // Optional: Uncomment if you want to verify the user exists
        // const user = await Users.findOne({ username }, { password: 1, _id: 0 });
        // if (!user) {
        //     return NextResponse.json({ error: "User not found" }, { status: 404 });
        // }

        await transporter.sendMail({
            ...mailOptions,
            subject: "Policy on Woman Crossing the Road", // Set the subject accordingly
            text: "Email Sent", // This is optional since you're providing HTML
            html: `
                <h1>Policy on Woman Crossing the Road</h1>
                <p>Dear Government,</p>
                <p>Re: Safe and Secure Pedestrian Crossings</p>
                <p>As part of our ongoing efforts to ensure a safe and secure environment for all individuals, we are pleased to introduce a formal policy on woman crossing the road. The purpose of this policy is to provide guidelines and protocols for women when crossing the road, and to ensure their safety and well-being.</p>
                <h3>Policy:</h3>
                <ol>
                    <li><strong>Responsibility:</strong> It is the responsibility of the woman crossing the road to ensure her safety and well-being while crossing.</li>
                    <li><strong>Pre-Crossing Checks:</strong> Before crossing the road, the woman shall:
                        <ul>
                            <li>Check for any vehicles approaching from either direction.</li>
                            <li>Look for any pedestrian signals or signs indicating when it is safe to cross.</li>
                            <li>Be aware of her surroundings and keep an eye out for any potential hazards.</li>
                        </ul>
                    </li>
                    <li><strong>Crossing the Road:</strong> When crossing the road, the woman shall:
                        <ul>
                            <li>Use designated pedestrian crossings or marked pedestrian crossings.</li>
                            <li>Yield to vehicles already on the road and only cross when it is safe to do so.</li>
                            <li>Keep to the designated pedestrian paths and avoid crossing outside of marked pedestrian zones.</li>
                        </ul>
                    </li>
                    <li><strong>Emergency Procedures:</strong> In the event of an emergency, the woman shall:
                        <ul>
                            <li>Immediately stop and seek assistance from nearby authorities or emergency services.</li>
                            <li>Follow any instructions provided by emergency responders.</li>
                        </ul>
                    </li>
                </ol>
                <h3>Implementation:</h3>
                <ol>
                    <li><strong>Communication:</strong> This policy shall be communicated to all women crossing the road on a regular basis, through various means such as:
                        <ul>
                            <li>Public announcements</li>
                            <li>Social media campaigns</li>
                            <li>Printed materials</li>
                        </ul>
                    </li>
                    <li><strong>Monitoring and Evaluation:</strong> The effectiveness of this policy shall be monitored and evaluated regularly to ensure its continued relevance and effectiveness.</li>
                    <li><strong>Reporting Incidents:</strong> Any incidents or near-misses involving women crossing the road shall be reported to the designated authority and investigated accordingly.</li>
                </ol>
                <h3>Enforcement:</h3>
                <ol>
                    <li><strong>Compliance:</strong> All women crossing the road shall comply with this policy.</li>
                    <li><strong>Consequences:</strong> Failure to comply with this policy may result in disciplinary action, which may include:
                        <ul>
                            <li>Verbal warnings</li>
                            <li>Written warnings</li>
                            <li>Suspension or termination of privileges</li>
                        </ul>
                    </li>
                </ol>
                <h3>Acknowledgement:</h3>
                <p>By crossing the road, the woman acknowledges that she has read and understood this policy and agrees to comply with its provisions.</p>
                <p><strong>Effective Date:</strong> This policy shall come into effect on [Date] and shall be reviewed and updated as necessary.</p>
                <p>Please find attached a copy of this policy for your reference.</p>
                <p>If you have any questions or concerns regarding this policy, please do not hesitate to contact us at [Contact Email] or [Contact Phone Number].</p>
                <p>Thank you for your cooperation and understanding in this matter.</p>
                <p>Sincerely,</p>
                <p>[${body.name}]<br>[Policy]<br></p>
            `,
        });
        
        

        const result = "Email sent";
        return NextResponse.json({ result, success: true });

    } catch (error) {
        console.error("Error sending email:", error); // Log the error for debugging
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
