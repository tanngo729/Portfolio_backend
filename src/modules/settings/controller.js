import { Settings } from './model.js';

export const getSettings = async (req, res) => {
  let settings = await Settings.findOne({ isActive: true });

  // If no active settings, get any settings or create default
  if (!settings) {
    settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({
        siteInfo: {
          logo: 'Portfolio',
          title: 'Full-Stack Developer',
          subtitle: 'Building Modern Web Apps',
          description: 'Crafting elegant solutions with React, Node.js, and modern web technologies.',
          welcomeBadge: 'Welcome to my portfolio',
        },
        stats: {
          projects: { label: 'Projects', value: 20 },
          experience: { label: 'Years Exp', value: 5 },
          technologies: { label: 'Technologies', value: 15 },
        },
        isActive: true,
      });
    }
  }

  res.json({ ok: true, data: settings });
};

export const updateSettings = async (req, res) => {
  try {

    // Get or create settings
    let settings = await Settings.findOne();

    if (!settings) {

      settings = await Settings.create({ ...req.body, isActive: true });

    } else {

      // Build $set update object
      const $set = {};
      if (req.body.siteInfo) {
        const current = settings.siteInfo?.toObject?.() || settings.siteInfo || {};
        $set.siteInfo = { ...current, ...req.body.siteInfo };
      }
      if (req.body.stats) {
        const current = settings.stats?.toObject?.() || settings.stats || {};
        $set.stats = { ...current, ...req.body.stats };
      }
      if (req.body.theme) {
        const current = settings.theme?.toObject?.() || settings.theme || {};
        $set.theme = { ...current, ...req.body.theme };
      }
      if (req.body.about) {
        const current = settings.about?.toObject?.() || settings.about || {};
        $set.about = { ...current, ...req.body.about };
      }
      if (req.body.features) {
        const current = settings.features?.toObject?.() || settings.features || {};
        $set.features = { ...current, ...req.body.features };
      }
      if (req.body.contact) {
        const current = settings.contact?.toObject?.() || settings.contact || {};
        $set.contact = { ...current, ...req.body.contact };
      }
      if (req.body.seo) {
        const current = settings.seo?.toObject?.() || settings.seo || {};
        $set.seo = { ...current, ...req.body.seo };
      }

      // Use findByIdAndUpdate with $set
      settings = await Settings.findByIdAndUpdate(
        settings._id,
        { $set },
        { new: true, runValidators: false }
      );

    }

    // Verify save
    const verify = await Settings.findById(settings._id);

    res.json({ ok: true, data: settings, message: 'Settings updated successfully' });
  } catch (error) {
    console.error(' Update error:', error);
    throw error;
  }
};

export const resetSettings = async (req, res) => {
  const settings = await Settings.getSettings();

  // Reset to defaults - exclude _id and metadata
  const defaults = new Settings();
  const defaultsObj = defaults.toObject();

  // Only copy the data fields, not _id or __v
  settings.siteInfo = defaultsObj.siteInfo;
  settings.stats = defaultsObj.stats;
  settings.theme = defaultsObj.theme;
  settings.about = defaultsObj.about;
  settings.contact = defaultsObj.contact;
  settings.seo = defaultsObj.seo;
  settings.isActive = true;

  await settings.save();

  res.json({ ok: true, data: settings, message: 'Settings reset to defaults' });
};
