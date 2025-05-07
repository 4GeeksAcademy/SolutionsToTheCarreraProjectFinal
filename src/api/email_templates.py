def service_inquiry_html(sender, recipient_name, message):
    return f"""
    <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    background-color: #f9f9f9;
                    margin: 0;
                    padding: 0;
                }}
                .email-container {{
                    max-width: 600px;
                    margin: 20px auto;
                    background: #ffffff;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }}
                .header {{
                    text-align: center;
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px 0;
                    border-radius: 8px 8px 0 0;
                }}
                .header h2 {{
                    margin: 0;
                }}
                .content {{
                    padding: 20px;
                }}
                .content p {{
                    margin: 10px 0;
                }}
                .footer {{
                    text-align: center;
                    font-size: 12px;
                    color: #777;
                    margin-top: 20px;
                }}
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h2>New Job Inquiry</h2>
                </div>
                <div class="content">
                    <p>Dear {recipient_name},</p>
                    <p>You have received a new job inquiry from <strong>{sender}</strong>.</p>
                    <p><strong>Message:</strong></p>
                    <p style="font-style: italic; background-color: #f4f4f4; padding: 10px; border-left: 4px solid #4CAF50;">
                        {message}
                    </p>
                    <p>Please feel free to respond to this inquiry at your earliest convenience.</p>
                </div>
                <div class="footer">
                    <p>This email was sent automatically by our system.</p>
                </div>
            </div>
        </body>
    </html>
    """