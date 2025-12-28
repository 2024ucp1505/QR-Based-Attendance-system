import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

// In-memory OTP store (expires after 5 mins)
// Format: { email: { otp, expiresAt, role } }
const otpStore = new Map();

/**
 * Auth Service
 * Tracks OTPs and generates JWTs
 */
class AuthService {
  constructor() {
    // Robust cleaning: remove all spaces and any accidental commas
    const password = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/[\s,]/g, '') : '';
    
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: password,
      },
      // Higher timeout for cloud environments
      connectionTimeout: 10000, 
      greetingTimeout: 10000,
    });
  }

  /**
   * Send OTP to email
   */
  async sendOTP(email, role) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    otpStore.set(email, { otp, expiresAt, role });

    // In development, log the OTP to console if email is not configured
    if (!process.env.EMAIL_USER) {
      console.log(`🔑 [DEV MODE] OTP for ${email}: ${otp}`);
      return true;
    }

    try {
      await this.transporter.sendMail({
        from: `"QR Attendance" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Your Attendance System OTP',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Verification Code</h2>
            <p>Your OTP for logging into the QR Attendance System is:</p>
            <h1 style="color: #4f46e5; letter-spacing: 5px;">${otp}</h1>
            <p>This code will expire in 5 minutes.</p>
            <p>If you didn't request this, please ignore this email.</p>
          </div>
        `,
      });
      return true;
    } catch (error) {
      console.error('Email send error:', error);
      throw new Error('Failed to send OTP email');
    }
  }

  /**
   * Verify OTP and return JWT
   */
  verifyOTP(email, otp) {
    const record = otpStore.get(email);

    if (!record) {
      throw new Error('No OTP requested for this email');
    }

    if (Date.now() > record.expiresAt) {
      otpStore.delete(email);
      throw new Error('OTP has expired');
    }

    if (record.otp !== otp) {
      throw new Error('Invalid OTP code');
    }

    // Success - clean up and generate token
    otpStore.delete(email);
    
    const token = jwt.sign(
      { email, role: record.role },
      process.env.JWT_SECRET || 'fallback-secret-key-123',
      { expiresIn: '7d' }
    );

    return { token, email, role: record.role };
  }
}

export default new AuthService();
