
export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed"
        });
    }

    try {
        const {
            name,
            date,
            time,
            food,
            dress,
            finalAnswer
        } = req.body || {};

        if (!date || !time || !food || !finalAnswer) {
            return res.status(400).json({
                success: false,
                message: "Missing required information"
            });
        }

        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!token || !chatId) {
            throw new Error("Telegram configuration is missing");
        }

        const message = `
🌹 DINNER INVITATION RESPONSE

👩 Name: ${name || "Feruza"}

❤️ Final Answer: ${finalAnswer}

📅 Date: ${date}

🕕 Time: ${time}

🍽️ Food: ${food}

👗 Dress Code:
${dress || "Not specified"}

✨ Response received successfully!
        `;

        const telegramResponse = await fetch(
            `https://api.telegram.org/bot${token}/sendMessage`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message
                })
            }
        );

        const result = await telegramResponse.json();

        if (!result.ok) {
            throw new Error("Telegram message could not be sent");
        }

        return res.status(200).json({
            success: true,
            message: "Notification sent successfully"
        });

    } catch (error) {
        console.error("Notification error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}
