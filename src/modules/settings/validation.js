import { z } from 'zod';

export const validate = (schema) => (req, res, next) => {
  try {

    schema.parse(req.body);

    next();
  } catch (error) {

    next(error);
  }
};

export const updateSettingsSchema = z.object({
  siteInfo: z
    .object({
      logo: z.string().optional(),
      title: z.string().optional(),
      subtitle: z.string().optional(),
      description: z.string().optional(),
      welcomeBadge: z.string().optional(),
    })
    .optional(),

  stats: z
    .object({
      projects: z
        .object({
          label: z.string().optional(),
          value: z.coerce.number().int().min(0).optional(),
        })
        .optional(),
      experience: z
        .object({
          label: z.string().optional(),
          value: z.coerce.number().min(0).optional(),
        })
        .optional(),
      technologies: z
        .object({
          label: z.string().optional(),
          value: z.coerce.number().int().min(0).optional(),
        })
        .optional(),
    })
    .optional(),

  theme: z
    .object({
      light: z
        .object({
          background: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
          foreground: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
          card: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
          border: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
          accent: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
        })
        .optional(),
      dark: z
        .object({
          background: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
          foreground: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
          card: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
          border: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
          accent: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
        })
        .optional(),
      typography: z
        .object({
          fontFamily: z
            .object({
              sans: z.string().optional(),
              tight: z.string().optional(),
            })
            .optional(),
          fontSize: z
            .object({
              base: z.string().optional(),
              scale: z.number().min(1).max(2).optional(),
            })
            .optional(),
        })
        .optional(),
    })
    .optional(),

  about: z
    .object({
      heading: z.string().optional(),
      bio: z.string().optional(),
      image: z.string().url().optional().or(z.literal('')),
      introduction: z.string().optional(),
      education: z.array(z.any()).optional(),
      certifications: z.array(z.any()).optional(),
      languages: z.array(z.any()).optional(),
    })
    .optional(),

  features: z
    .object({
      heading: z.string().optional(),
      subheading: z.string().optional(),
      items: z
        .array(
          z.object({
            title: z.string(),
            description: z.string(),
            icon: z.string(),
            gradient: z.string(),
          })
        )
        .optional(),
    })
    .optional(),

  contact: z
    .object({
      email: z.string().email().optional().or(z.literal('')),
      phone: z.string().optional(),
      address: z.string().optional(),
      social: z
        .object({
          github: z.string().url().optional().or(z.literal('')),
          linkedin: z.string().url().optional().or(z.literal('')),
          twitter: z.string().url().optional().or(z.literal('')),
        })
        .optional(),
    })
    .optional(),

  seo: z
    .object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      keywords: z.array(z.string()).optional(),
      ogImage: z.string().url().optional().or(z.literal('')),
    })
    .optional(),
});
