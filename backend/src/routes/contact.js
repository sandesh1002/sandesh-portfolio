import { Router } from 'express';
import mongoose from 'mongoose';
import Message from '../models/Message.js';
import { sendOwnerNotification, sendThankYouEmail } from '../utils/mailer.js';

const router = Router();

function getMailConfigWarnings() {
  const missing = [];

  if (!process.env.GMAIL_USER) missing.push('GMAIL_USER');
  if (!process.env.GMAIL_APP_PASSWORD) missing.push('GMAIL_APP_PASSWORD');
  if (!process.env.OWNER_EMAIL) missing.push('OWNER_EMAIL');

  return missing;
}

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const data = { name: name.trim(), email: email.trim(), message: message.trim() };

  let dbSaved = false;

  try {
    if (mongoose.connection.readyState === 1) {
      await Message.create(data);
      dbSaved = true;
    } else {
      console.warn('MongoDB not connected — skipping DB save');
    }

    const missingMailVars = getMailConfigWarnings();
    if (missingMailVars.length > 0) {
      console.warn(
        `Mail not configured (${missingMailVars.join(", ")}). Message ${dbSaved ? 'saved' : 'not saved'}; skipping email.`
      );

      return res.status(201).json({
        success: true,
        message: dbSaved ? 'Message saved successfully (email skipped: misconfigured mailer).' : 'Email skipped: misconfigured mailer.',
        warning: `Missing env vars: ${missingMailVars.join(', ')}`,
      });
    }

    // If mail is configured, failures here should not crash the whole endpoint.
    try {
      await sendOwnerNotification(data);
      await sendThankYouEmail(data);
    } catch (mailErr) {
      console.error('Contact mail error:', mailErr?.stack || mailErr);

      return res.status(201).json({
        success: true,
        message: dbSaved ? 'Message saved successfully (email failed).' : 'Email failed (message not saved).',
        warning: 'Message saved but email sending failed. Check backend logs.',
      });
    }

    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (err) {
    console.error('Contact error:', err?.stack || err?.message || err);
    res.status(500).json({ error: 'Failed to process message. Check backend logs.' });
  }
});

export default router;

