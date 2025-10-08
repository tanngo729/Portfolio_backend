import { ContactMessage } from './model.js';

export const createContact = async (req, res) => {
  const { name, email, message } = req.body;

  const contact = await ContactMessage.create({
    name,
    email,
    message,
    ip: req.ip,
    userAgent: req.get('user-agent'),
  });

  // TODO: Send email notification (nodemailer)

  res.status(201).json({
    ok: true,
    message: 'Thank you! Your message has been received.',
    data: { id: contact._id },
  });
};

// Admin endpoints
export const getAllContacts = async (req, res) => {
  const { status } = req.query;

  const filter = {};
  if (status) filter.status = status;

  const contacts = await ContactMessage.find(filter).sort('-createdAt');

  res.json({ ok: true, data: contacts });
};

export const updateContactStatus = async (req, res) => {
  const { status } = req.body;

  const contact = await ContactMessage.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  if (!contact) {
    return res.status(404).json({
      ok: false,
      code: 'NOT_FOUND',
      message: 'Contact message not found',
    });
  }

  res.json({ ok: true, data: contact });
};

export const deleteContact = async (req, res) => {
  const contact = await ContactMessage.findByIdAndDelete(req.params.id);

  if (!contact) {
    return res.status(404).json({
      ok: false,
      code: 'NOT_FOUND',
      message: 'Contact message not found',
    });
  }

  res.json({ ok: true, message: 'Contact message deleted' });
};
