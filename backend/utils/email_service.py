import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from flask import current_app
import logging

logger = logging.getLogger(__name__)

class EmailService:
    @staticmethod
    def send_email(to_email, subject, html_content, from_name=None):
        """
        Send an email using SMTP configuration
        """
        try:
            msg = MIMEMultipart('alternative')
            from_name = from_name or current_app.config.get('SMTP_FROM_NAME', 'GREEN Inc. Marine Conservation')
            from_email = current_app.config['SMTP_FROM_EMAIL']
            
            msg['From'] = f"{from_name} <{from_email}>"
            msg['To'] = to_email
            msg['Subject'] = subject
            msg['Reply-To'] = current_app.config.get('CONTACT_EMAIL', from_email)
            
            # Add message headers to reduce spam detection
            msg['Message-ID'] = f"<{datetime.now().timestamp()}@{from_email.split('@')[1]}>"
            msg['X-Priority'] = '3'
            msg['X-Mailer'] = 'GREEN Inc. Mailer'
            
            # Attach HTML content
            msg.attach(MIMEText(html_content, 'html'))
            
            # Connect to SMTP server
            server = smtplib.SMTP(current_app.config['SMTP_SERVER'], current_app.config['SMTP_PORT'])
            server.ehlo()
            
            if current_app.config['SMTP_USE_TLS']:
                server.starttls()
                server.ehlo()
            
            username = current_app.config['SMTP_USERNAME']
            password = current_app.config['SMTP_PASSWORD']
            
            server.login(username, password)
            server.sendmail(from_email, to_email, msg.as_string())
            server.quit()
            
            logger.info(f"Email sent successfully to {to_email}")
            return True
            
        except smtplib.SMTPAuthenticationError as e:
            logger.error(f"SMTP Authentication failed: {str(e)}")
            raise e
        except Exception as e:
            logger.error(f"Failed to send email to {to_email}: {str(e)}")
            raise e

    @staticmethod
    def send_donation_notification_to_admin(donation_data):
        """
        Send donation notification to admin
        This goes to CONTACT_EMAIL (which can be different from SMTP_FROM_EMAIL)
        """
        amount = donation_data.get('amount', '0')
        first_name = donation_data.get('firstName', 'Anonymous')
        last_name = donation_data.get('lastName', '')
        email = donation_data.get('email', 'Not provided')
        phone = donation_data.get('phone', 'Not provided')
        donation_type = donation_data.get('donationType', 'one-time')
        message = donation_data.get('message', 'No message')
        
        display_type = "Monthly" if donation_type == "monthly" else "One-time"
        
        subject = f"🔔 New Donation: ₱{amount} from {first_name} {last_name}"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{
                    font-family: 'Segoe UI', Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    background: #f5f5f5;
                }}
                .container {{
                    background: white;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }}
                .header {{
                    background: linear-gradient(135deg, #0d9488, #059669);
                    color: white;
                    padding: 25px 30px;
                    text-align: center;
                }}
                .header h1 {{
                    margin: 0;
                    font-size: 22px;
                    font-weight: 600;
                }}
                .header .subtitle {{
                    margin: 5px 0 0 0;
                    opacity: 0.9;
                    font-size: 14px;
                }}
                .content {{
                    padding: 25px 30px;
                }}
                .amount-box {{
                    background: linear-gradient(135deg, #ecfdf5, #d1fae5);
                    border: 2px solid #a7f3d0;
                    border-radius: 12px;
                    padding: 20px;
                    text-align: center;
                    margin-bottom: 25px;
                }}
                .amount {{
                    font-size: 42px;
                    font-weight: bold;
                    color: #0d9488;
                    margin: 0;
                }}
                .currency {{
                    font-size: 24px;
                    color: #6b7280;
                }}
                .detail-grid {{
                    background: #f9fafb;
                    border-radius: 8px;
                    padding: 20px;
                    margin-bottom: 20px;
                }}
                .detail-row {{
                    display: flex;
                    justify-content: space-between;
                    padding: 12px 0;
                    border-bottom: 1px solid #e5e7eb;
                }}
                .detail-row:last-child {{
                    border-bottom: none;
                }}
                .detail-label {{
                    font-weight: 600;
                    color: #6b7280;
                    font-size: 13px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }}
                .detail-value {{
                    color: #111827;
                    font-size: 14px;
                    text-align: right;
                }}
                .badge {{
                    display: inline-block;
                    padding: 5px 15px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }}
                .badge-onetime {{
                    background: #dbeafe;
                    color: #1e40af;
                }}
                .badge-monthly {{
                    background: #fef3c7;
                    color: #92400e;
                }}
                .message-box {{
                    background: #f0fdf4;
                    border-left: 4px solid #10b981;
                    padding: 15px 20px;
                    margin-bottom: 20px;
                    border-radius: 4px;
                }}
                .action-needed {{
                    background: #fff7ed;
                    border: 2px solid #fed7aa;
                    border-radius: 8px;
                    padding: 15px 20px;
                    margin-bottom: 20px;
                }}
                .action-needed h3 {{
                    color: #9a3412;
                    margin: 0 0 10px 0;
                    font-size: 15px;
                }}
                .action-needed p {{
                    color: #92400e;
                    margin: 0;
                    font-size: 13px;
                }}
                .footer {{
                    background: #111827;
                    color: #9ca3af;
                    padding: 20px 30px;
                    text-align: center;
                    font-size: 12px;
                }}
                .footer a {{
                    color: #6ee7b7;
                    text-decoration: none;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🐠 New Donation Received!</h1>
                    <p class="subtitle">Someone just supported marine conservation</p>
                </div>
                
                <div class="content">
                    <div class="amount-box">
                        <p style="margin: 0; color: #6b7280; font-size: 14px;">Donation Amount</p>
                        <p class="amount"><span class="currency">₱</span>{amount}</p>
                        <span class="badge badge-{'monthly' if donation_type == 'monthly' else 'onetime'}">
                            {display_type}
                        </span>
                    </div>
                    
                    <div class="detail-grid">
                        <h3 style="margin: 0 0 15px 0; color: #111827; font-size: 16px;">📋 Donor Information</h3>
                        
                        <div class="detail-row">
                            <span class="detail-label">Full Name</span>
                            <span class="detail-value">{first_name} {last_name}</span>
                        </div>
                        
                        <div class="detail-row">
                            <span class="detail-label">Email</span>
                            <span class="detail-value">{email}</span>
                        </div>
                        
                        <div class="detail-row">
                            <span class="detail-label">Phone</span>
                            <span class="detail-value">{phone}</span>
                        </div>
                        
                        <div class="detail-row">
                            <span class="detail-label">Donation Type</span>
                            <span class="detail-value">{display_type}</span>
                        </div>
                        
                        <div class="detail-row">
                            <span class="detail-label">Date & Time</span>
                            <span class="detail-value">{datetime.now().strftime('%B %d, %Y at %I:%M %p')}</span>
                        </div>
                        
                        <div class="detail-row">
                            <span class="detail-label">Donor Email</span>
                            <span class="detail-value">{email}</span>
                        </div>
                    </div>
                    
                    {message and message != 'No message' and f'''
                    <div class="message-box">
                        <h4 style="margin: 0 0 8px 0; color: #065f46; font-size: 14px;">💬 Message from Donor</h4>
                        <p style="margin: 0; color: #374151; font-style: italic;">"{message}"</p>
                    </div>
                    ''' or ''}
                    
                    <div class="action-needed">
                        <h3>⚠️ Action Required</h3>
                        <p>Please verify this payment in your GCash/Maya account and send a confirmation email to the donor at <strong>{email}</strong>.</p>
                    </div>
                </div>
                
                <div class="footer">
                    <p>This is an automated notification from <strong>GREEN Inc. Marine Conservation</strong></p>
                    <p>Sogod Bay, Southern Leyte, Philippines</p>
                    <p>📧 <a href="mailto:{current_app.config.get('CONTACT_EMAIL', '')}">{current_app.config.get('CONTACT_EMAIL', '')}</a></p>
                    <p style="margin-top: 10px;">&copy; {datetime.now().year} GREEN Inc. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Send to admin email (CONTACT_EMAIL)
        admin_email = current_app.config.get('CONTACT_EMAIL', current_app.config['SMTP_FROM_EMAIL'])
        return EmailService.send_email(admin_email, subject, html_content)

    @staticmethod
    def send_donation_receipt_to_donor(donation_data):
        """
        Send thank you receipt to the donor
        This goes to the donor's email address
        """
        amount = donation_data.get('amount', '0')
        first_name = donation_data.get('firstName', 'Valued')
        last_name = donation_data.get('lastName', '')
        email = donation_data.get('email')
        donation_type = donation_data.get('donationType', 'one-time')
        display_type = "monthly" if donation_type == "monthly" else "one-time"
        
        if not email:
            logger.warning("No donor email provided, skipping receipt")
            return False
        
        subject = f"🙏 Thank You for Your {display_type.capitalize()} Donation, {first_name}!"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{
                    font-family: 'Segoe UI', Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    background: #f5f5f5;
                }}
                .container {{
                    background: white;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }}
                .header {{
                    background: linear-gradient(135deg, #0d9488, #059669);
                    color: white;
                    padding: 30px;
                    text-align: center;
                }}
                .header .icon {{
                    font-size: 48px;
                    margin-bottom: 10px;
                }}
                .header h1 {{
                    margin: 0;
                    font-size: 24px;
                    font-weight: 600;
                }}
                .content {{
                    padding: 30px;
                }}
                .greeting {{
                    font-size: 18px;
                    color: #374151;
                    margin-bottom: 20px;
                    text-align: center;
                }}
                .amount-box {{
                    background: linear-gradient(135deg, #ecfdf5, #d1fae5);
                    border: 2px solid #a7f3d0;
                    border-radius: 12px;
                    padding: 20px;
                    text-align: center;
                    margin-bottom: 25px;
                }}
                .amount-label {{
                    color: #6b7280;
                    font-size: 14px;
                    margin: 0;
                }}
                .amount {{
                    font-size: 42px;
                    font-weight: bold;
                    color: #0d9488;
                    margin: 5px 0;
                }}
                .impact-section {{
                    background: #f9fafb;
                    border-radius: 8px;
                    padding: 20px;
                    margin-bottom: 25px;
                }}
                .impact-section h3 {{
                    color: #111827;
                    margin: 0 0 15px 0;
                    font-size: 16px;
                }}
                .impact-list {{
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }}
                .impact-list li {{
                    padding: 8px 0;
                    padding-left: 25px;
                    position: relative;
                    color: #374151;
                    font-size: 14px;
                }}
                .impact-list li:before {{
                    content: "🐠";
                    position: absolute;
                    left: 0;
                }}
                .impact-list li:nth-child(2):before {{ content: "🦀"; }}
                .impact-list li:nth-child(3):before {{ content: "🧹"; }}
                .impact-list li:nth-child(4):before {{ content: "🤝"; }}
                
                .info-box {{
                    background: #fef3c7;
                    border: 1px solid #fde68a;
                    border-radius: 8px;
                    padding: 15px 20px;
                    margin-bottom: 25px;
                }}
                .info-box p {{
                    margin: 0;
                    color: #92400e;
                    font-size: 13px;
                }}
                .social-section {{
                    text-align: center;
                    padding: 20px;
                    background: #ecfdf5;
                    border-radius: 8px;
                    margin-bottom: 25px;
                }}
                .social-section p {{
                    margin: 0;
                    color: #065f46;
                }}
                .social-link {{
                    display: inline-block;
                    margin-top: 10px;
                    padding: 10px 25px;
                    background: #0d9488;
                    color: white;
                    text-decoration: none;
                    border-radius: 25px;
                    font-weight: 600;
                    font-size: 14px;
                }}
                .footer {{
                    background: #111827;
                    color: #9ca3af;
                    padding: 20px 30px;
                    text-align: center;
                    font-size: 12px;
                }}
                .footer a {{
                    color: #6ee7b7;
                    text-decoration: none;
                }}
                .signature {{
                    margin-top: 20px;
                    padding-top: 20px;
                    border-top: 1px solid #e5e7eb;
                    text-align: center;
                }}
                .signature p {{
                    margin: 5px 0;
                    color: #6b7280;
                    font-size: 14px;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="icon">🙏</div>
                    <h1>Thank You, {first_name}!</h1>
                    <p style="margin: 5px 0 0 0; opacity: 0.9;">Your support means the world to us and our oceans</p>
                </div>
                
                <div class="content">
                    <div class="greeting">
                        <p>Dear <strong>{first_name} {last_name}</strong>,</p>
                    </div>
                    
                    <p style="color: #374151; text-align: center; margin-bottom: 20px;">
                        Your generous donation has been received and is being verified by our team.
                    </p>
                    
                    <div class="amount-box">
                        <p class="amount-label">Your {display_type} Donation</p>
                        <p class="amount">₱{amount}</p>
                    </div>
                    
                    <div class="impact-section">
                        <h3>🌊 Your Impact on Marine Conservation</h3>
                        <ul class="impact-list">
                            <li>Protect and restore coral reefs in Sogod Bay</li>
                            <li>Remove harmful Crown-of-Thorns starfish</li>
                            <li>Clean marine debris from our waters</li>
                            <li>Support local community conservation efforts</li>
                        </ul>
                    </div>
                    
                    <div class="info-box">
                        <p>📧 We'll send you a confirmation email once your payment is verified (usually within 24 hours). If you have any questions, feel free to reply to this email.</p>
                    </div>
                    
                    <div class="social-section">
                        <p>📱 Stay connected with our conservation work!</p>
                        <a href="https://www.facebook.com/GREENIncorporatedSogodBay" class="social-link">
                            Follow us on Facebook
                        </a>
                    </div>
                    
                    <div class="signature">
                        <p>With gratitude,</p>
                        <p style="font-weight: 600; color: #0d9488;">The GREEN Inc. Team</p>
                        <p style="font-size: 12px;">Sogod Bay, Southern Leyte, Philippines</p>
                    </div>
                </div>
                
                <div class="footer">
                    <p><strong>GREEN Inc. Marine Conservation</strong></p>
                    <p>📍 Sogod Bay, Southern Leyte, Philippines</p>
                    <p>📧 <a href="mailto:{current_app.config.get('CONTACT_EMAIL', '')}">{current_app.config.get('CONTACT_EMAIL', '')}</a></p>
                    <p>&copy; {datetime.now().year} GREEN Inc. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Send to donor's email
        return EmailService.send_email(email, subject, html_content)
    
    @staticmethod
    def send_application_notification_to_admin(data, application_id):
        """
        Send new application notification to admin
        """
        name = data.get('name', 'Unknown')
        email = data.get('email', 'Not provided')
        nationality = data.get('nationality', 'Not provided')
        course = data.get('course', 'Not specified')
        certification = data.get('certificationLevel', 'Not specified')
        dives = data.get('numberOfDives', 'Not specified')
        last_dive = data.get('lastDive', 'Not specified')
        education = data.get('education', 'Not provided')
        occupation = data.get('occupation', 'Not provided')
        experience = data.get('marineBiologyExperience', 'Not provided')
        heard_from = data.get('heardFrom', 'Not specified')
        expectations = data.get('programmeExpectations', 'Not provided')
        food_allergies = data.get('foodAllergies', 'None')
        medical = data.get('medicalConditions', 'None')
        
        subject = f"📋 New Volunteer Application: {name} - {course}"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{
                    font-family: 'Segoe UI', Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 650px;
                    margin: 0 auto;
                    background: #f5f5f5;
                }}
                .container {{
                    background: white;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }}
                .header {{
                    background: linear-gradient(135deg, #0d9488, #059669);
                    color: white;
                    padding: 25px 30px;
                    text-align: center;
                }}
                .header h1 {{
                    margin: 0;
                    font-size: 22px;
                    font-weight: 600;
                }}
                .header .subtitle {{
                    margin: 8px 0 0 0;
                    opacity: 0.9;
                    font-size: 14px;
                }}
                .content {{
                    padding: 25px 30px;
                }}
                .detail-grid {{
                    background: #f9fafb;
                    border-radius: 8px;
                    padding: 20px;
                    margin-bottom: 20px;
                }}
                .detail-row {{
                    display: flex;
                    justify-content: space-between;
                    padding: 10px 0;
                    border-bottom: 1px solid #e5e7eb;
                }}
                .detail-row:last-child {{
                    border-bottom: none;
                }}
                .detail-label {{
                    font-weight: 600;
                    color: #6b7280;
                    font-size: 13px;
                    min-width: 180px;
                }}
                .detail-value {{
                    color: #111827;
                    font-size: 14px;
                    text-align: right;
                    flex: 1;
                }}
                .badge {{
                    display: inline-block;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 600;
                    background: #dbeafe;
                    color: #1e40af;
                }}
                .experience-box {{
                    background: #f0fdf4;
                    border-left: 4px solid #10b981;
                    padding: 15px 20px;
                    margin-bottom: 20px;
                    border-radius: 4px;
                }}
                .experience-box h3 {{
                    color: #065f46;
                    margin: 0 0 8px 0;
                    font-size: 15px;
                }}
                .experience-box p {{
                    color: #374151;
                    margin: 0;
                    font-size: 14px;
                }}
                .action-needed {{
                    background: #fff7ed;
                    border: 2px solid #fed7aa;
                    border-radius: 8px;
                    padding: 15px 20px;
                    margin-bottom: 20px;
                }}
                .action-needed h3 {{
                    color: #9a3412;
                    margin: 0 0 10px 0;
                    font-size: 15px;
                }}
                .footer {{
                    background: #111827;
                    color: #9ca3af;
                    padding: 20px 30px;
                    text-align: center;
                    font-size: 12px;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>📋 New Volunteer Application Received!</h1>
                    <p class="subtitle">Application #{application_id} • {datetime.now().strftime('%B %d, %Y at %I:%M %p')}</p>
                </div>
                
                <div class="content">
                    <p style="font-size: 16px; color: #374151; margin-bottom: 20px;">
                        <strong>{name}</strong> has submitted a volunteer application for the <span class="badge">{course}</span> program.
                    </p>
                    
                    <div class="detail-grid">
                        <h3 style="margin: 0 0 15px 0; color: #111827; font-size: 16px;">📌 Personal Information</h3>
                        
                        <div class="detail-row">
                            <span class="detail-label">Full Name</span>
                            <span class="detail-value">{name}</span>
                        </div>
                        
                        <div class="detail-row">
                            <span class="detail-label">Email</span>
                            <span class="detail-value">{email}</span>
                        </div>
                        
                        <div class="detail-row">
                            <span class="detail-label">Nationality</span>
                            <span class="detail-value">{nationality}</span>
                        </div>
                        
                        <div class="detail-row">
                            <span class="detail-label">Course Applied</span>
                            <span class="detail-value">{course}</span>
                        </div>
                        
                        <div class="detail-row">
                            <span class="detail-label">Occupation</span>
                            <span class="detail-value">{occupation}</span>
                        </div>
                        
                        <div class="detail-row">
                            <span class="detail-label">Education</span>
                            <span class="detail-value">{education}</span>
                        </div>
                    </div>
                    
                    <div class="detail-grid">
                        <h3 style="margin: 0 0 15px 0; color: #111827; font-size: 16px;">🤿 Diving Information</h3>
                        
                        <div class="detail-row">
                            <span class="detail-label">Certification Level</span>
                            <span class="detail-value">{certification}</span>
                        </div>
                        
                        <div class="detail-row">
                            <span class="detail-label">Number of Dives</span>
                            <span class="detail-value">{dives}</span>
                        </div>
                        
                        <div class="detail-row">
                            <span class="detail-label">Last Dive</span>
                            <span class="detail-value">{last_dive}</span>
                        </div>
                    </div>
                    
                    <div class="detail-grid">
                        <h3 style="margin: 0 0 15px 0; color: #111827; font-size: 16px;">ℹ️ Additional Information</h3>
                        
                        <div class="detail-row">
                            <span class="detail-label">How They Heard</span>
                            <span class="detail-value">{heard_from}</span>
                        </div>
                        
                        <div class="detail-row">
                            <span class="detail-label">Food Allergies</span>
                            <span class="detail-value">{food_allergies}</span>
                        </div>
                        
                        <div class="detail-row">
                            <span class="detail-label">Medical Conditions</span>
                            <span class="detail-value">{medical}</span>
                        </div>
                    </div>
                    
                    {experience and experience != 'Not provided' and f'''
                    <div class="experience-box">
                        <h3>🐠 Marine Biology Experience</h3>
                        <p>{experience}</p>
                    </div>
                    ''' or ''}
                    
                    {expectations and expectations != 'Not provided' and f'''
                    <div class="experience-box">
                        <h3>🎯 Programme Expectations</h3>
                        <p>{expectations}</p>
                    </div>
                    ''' or ''}
                    
                    <div class="action-needed">
                        <h3>⚠️ Action Required</h3>
                        <p style="margin: 0; color: #92400e; font-size: 13px;">
                            Please review this application and respond to the applicant at <strong>{email}</strong> within 3-5 business days.
                        </p>
                    </div>
                </div>
                
                <div class="footer">
                    <p><strong>GREEN Inc. Marine Conservation</strong></p>
                    <p>📍 Sogod Bay, Southern Leyte, Philippines</p>
                    <p>📧 {current_app.config.get('CONTACT_EMAIL', '')}</p>
                    <p>© {datetime.now().year} GREEN Inc. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        admin_email = current_app.config.get('CONTACT_EMAIL', current_app.config['SMTP_FROM_EMAIL'])
        return EmailService.send_email(admin_email, subject, html_content)

    @staticmethod
    def send_application_receipt_to_applicant(data, application_id):
        """
        Send confirmation receipt to the applicant
        """
        name = data.get('name', 'Applicant')
        email = data.get('email')
        course = data.get('course', 'volunteer program')
        
        if not email:
            logger.warning("No applicant email provided, skipping receipt")
            return False
        
        subject = f"✅ Application Received - GREEN Inc. Volunteer Program"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{
                    font-family: 'Segoe UI', Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    background: #f5f5f5;
                }}
                .container {{
                    background: white;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }}
                .header {{
                    background: linear-gradient(135deg, #0d9488, #059669);
                    color: white;
                    padding: 30px;
                    text-align: center;
                }}
                .header .icon {{
                    font-size: 48px;
                    margin-bottom: 10px;
                }}
                .header h1 {{
                    margin: 0;
                    font-size: 24px;
                    font-weight: 600;
                }}
                .content {{
                    padding: 30px;
                }}
                .greeting {{
                    font-size: 18px;
                    color: #374151;
                    margin-bottom: 20px;
                }}
                .info-card {{
                    background: #f9fafb;
                    border-radius: 8px;
                    padding: 20px;
                    margin-bottom: 25px;
                    border: 1px solid #e5e7eb;
                }}
                .info-row {{
                    display: flex;
                    justify-content: space-between;
                    padding: 10px 0;
                    border-bottom: 1px solid #e5e7eb;
                }}
                .info-row:last-child {{
                    border-bottom: none;
                }}
                .label {{
                    font-weight: 600;
                    color: #6b7280;
                }}
                .value {{
                    color: #111827;
                }}
                .badge {{
                    display: inline-block;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 600;
                    background: #dbeafe;
                    color: #1e40af;
                }}
                .next-steps {{
                    background: #ecfdf5;
                    border-radius: 8px;
                    padding: 20px;
                    margin-bottom: 25px;
                }}
                .next-steps h3 {{
                    color: #065f46;
                    margin: 0 0 15px 0;
                }}
                .next-steps ol {{
                    margin: 0;
                    padding-left: 20px;
                    color: #374151;
                }}
                .next-steps li {{
                    margin-bottom: 8px;
                }}
                .footer {{
                    background: #111827;
                    color: #9ca3af;
                    padding: 20px 30px;
                    text-align: center;
                    font-size: 12px;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="icon">✅</div>
                    <h1>Application Received!</h1>
                    <p style="margin: 5px 0 0 0; opacity: 0.9;">Thank you for applying to GREEN Inc.</p>
                </div>
                
                <div class="content">
                    <div class="greeting">
                        <p>Dear <strong>{name}</strong>,</p>
                        <p>We've received your volunteer application for our <span class="badge">{course}</span> program. Your application reference number is <strong>#{application_id}</strong>.</p>
                    </div>
                    
                    <div class="info-card">
                        <h3 style="margin: 0 0 15px 0; color: #111827;">📋 Application Summary</h3>
                        
                        <div class="info-row">
                            <span class="label">Reference Number</span>
                            <span class="value">#{application_id}</span>
                        </div>
                        
                        <div class="info-row">
                            <span class="label">Program</span>
                            <span class="value">{course}</span>
                        </div>
                        
                        <div class="info-row">
                            <span class="label">Submitted</span>
                            <span class="value">{datetime.now().strftime('%B %d, %Y')}</span>
                        </div>
                    </div>
                    
                    <div class="next-steps">
                        <h3>🔄 What Happens Next?</h3>
                        <ol>
                            <li>Our team will review your application within <strong>3-5 business days</strong></li>
                            <li>We'll contact you via email (<strong>{email}</strong>) with our decision</li>
                            <li>If accepted, we'll provide details about program dates, requirements, and preparation</li>
                            <li>Feel free to reply to this email if you have any questions</li>
                        </ol>
                    </div>
                    
                    <div style="background: #fef3c7; border: 1px solid #fde68a; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                        <p style="margin: 0; color: #92400e; font-size: 13px;">
                            📧 If you don't hear from us within 5 business days, please check your spam folder or contact us directly.
                        </p>
                    </div>
                    
                    <p style="text-align: center; color: #6b7280; margin: 20px 0;">
                        Thank you for your interest in marine conservation. Together, we can make a difference! 🌊
                    </p>
                </div>
                
                <div class="footer">
                    <p><strong>GREEN Inc. Marine Conservation</strong></p>
                    <p>📍 Sogod Bay, Southern Leyte, Philippines</p>
                    <p>📧 {current_app.config.get('CONTACT_EMAIL', '')}</p>
                    <p>© {datetime.now().year} GREEN Inc. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        return EmailService.send_email(email, subject, html_content)