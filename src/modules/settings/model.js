import { Schema, model } from 'mongoose';

const settingsSchema = new Schema(
  {
    // Use Mixed type for flexible nested objects
    siteInfo: {
      type: Schema.Types.Mixed,
      default: () => ({
        logo: 'Portfolio',
        title: 'Full-Stack Developer',
        subtitle: 'Building Modern Web Apps',
        description: 'Crafting elegant solutions with React, Node.js, and modern web technologies.',
        welcomeBadge: 'Welcome to my portfolio',
      }),
    },

    stats: {
      type: Schema.Types.Mixed,
      default: () => ({
        projects: { label: 'Projects', value: 20 },
        experience: { label: 'Years Exp', value: 5 },
        technologies: { label: 'Technologies', value: 15 },
      }),
    },

    theme: {
      type: Schema.Types.Mixed,
      default: () => ({
        light: {
          background: '#ffffff',
          foreground: '#09090b',
          card: '#f4f4f5',
          border: '#e4e4e7',
          accent: '#f59e0b',
        },
        dark: {
          background: '#0a0b0e',
          foreground: '#fafafa',
          card: '#1a1d25',
          border: '#27272a',
          accent: '#fbbf24',
        },
        typography: {
          fontFamily: {
            sans: 'Inter, system-ui, sans-serif',
            tight: 'Cal Sans, Inter, sans-serif',
          },
          fontSize: {
            base: '16px',
            scale: 1.25,
          },
        },
      }),
    },

    about: {
      type: Schema.Types.Mixed,
      default: () => ({
        heading: 'About Me',
        bio: '',
        image: '',
        introduction: '',
        education: [],
        certifications: [],
        languages: [],
      }),
    },

    features: {
      type: Schema.Types.Mixed,
      default: () => ({
        heading: 'What I Do',
        subheading: 'Specialized in building exceptional digital experiences',
        items: [
          {
            title: 'Frontend',
            description: 'React, Vue, Tailwind CSS',
            icon: 'Code2',
            gradient: 'from-blue-500 to-cyan-500',
          },
          {
            title: 'Backend',
            description: 'Node.js, Express, MongoDB',
            icon: 'Database',
            gradient: 'from-green-500 to-emerald-500',
          },
          {
            title: 'Design',
            description: 'Figma, Motion, UI/UX',
            icon: 'Palette',
            gradient: 'from-purple-500 to-pink-500',
          },
        ],
      }),
    },

    contact: {
      type: Schema.Types.Mixed,
      default: () => ({
        email: '',
        phone: '',
        address: '',
        social: {
          github: '',
          linkedin: '',
          twitter: '',
        },
      }),
    },

    seo: {
      type: Schema.Types.Mixed,
      default: () => ({
        metaTitle: 'Portfolio - Full-Stack Developer',
        metaDescription: '',
        keywords: [],
        ogImage: '',
      }),
    },

    // Singleton pattern - only one settings document
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure only one settings document exists
settingsSchema.statics.getSettings = async function () {
  let settings = await this.findOne({ isActive: true });
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

settingsSchema.statics.updateSettings = async function (updates) {
  const settings = await this.getSettings();

  // Deep merge helper function
  function deepMerge(target, source) {
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        if (!target[key]) target[key] = {};
        deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }

  // Apply updates
  deepMerge(settings, updates);

  // Mark all nested fields as modified
  settings.markModified('siteInfo');
  settings.markModified('stats');
  settings.markModified('theme');
  settings.markModified('about');
  settings.markModified('features');
  settings.markModified('contact');
  settings.markModified('seo');

  await settings.save();
  return settings;
};

export const Settings = model('Settings', settingsSchema);
