import { z } from 'zod'

export const contactFormSchema = z.object({
  nume: z.string().min(2, 'Numele este obligatoriu'),
  prenume: z.string().min(2, 'Prenumele este obligatoriu'),
  email: z.string().email('Adresa de email nu este validă'),
  telefon: z.string().optional(),
  subiect: z.enum([
    'rezervare-camera',
    'rezervare-restaurant',
    'eveniment',
    'pool-park',
    'altele',
  ]),
  mesaj: z.string().min(10, 'Mesajul trebuie să aibă cel puțin 10 caractere'),
  gdpr: z.boolean().refine((val) => val === true, {
    message: 'Trebuie să accepți politica de confidențialitate',
  }),
  hp_field: z.string().max(0, 'Spam detected').optional().or(z.literal('')),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export const bookingFormSchema = z.object({
  checkIn: z.string().min(1, 'Data de check-in este obligatorie'),
  checkOut: z.string().min(1, 'Data de check-out este obligatorie'),
  adulti: z.coerce.number().min(1).max(4),
  copii: z.coerce.number().min(0).max(3),
  tipCamera: z.string().min(1, 'Selectează tipul de cameră'),
})

export type BookingFormData = z.infer<typeof bookingFormSchema>
