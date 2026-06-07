import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Users, Baby, Bed } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAnalytics } from '@/hooks/useAnalytics'

const roomTypes = [
  { value: '', label: 'Toate camerele' },
  { value: 'apartament', label: 'Apartament 4★' },
  { value: 'standard', label: 'Standard 3★' },
  { value: 'standard-balcon', label: 'Standard cu Balcon' },
]

export function BookingWidget() {
  const navigate = useNavigate()
  const { trackCTAClick } = useAnalytics()
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    adulti: '2',
    copii: '0',
    tipCamera: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (formData.checkIn) params.set('checkIn', formData.checkIn)
    if (formData.checkOut) params.set('checkOut', formData.checkOut)
    params.set('adulti', formData.adulti)
    params.set('copii', formData.copii)
    if (formData.tipCamera) params.set('camera', formData.tipCamera)
    trackCTAClick('booking-widget', `/contact?${params.toString()}`)
    navigate(`/contact?${params.toString()}`)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="relative z-20 -mt-16 md:-mt-20 container-xl"
      aria-label="Formular rezervare"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-sm shadow-xl border border-border p-4 md:p-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Check-in */}
          <div className="space-y-1.5">
            <label htmlFor="checkIn" className="text-xs font-semibold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Check-in
            </label>
            <input
              id="checkIn"
              type="date"
              min={today}
              value={formData.checkIn}
              onChange={(e) => handleChange('checkIn', e.target.value)}
              className="w-full px-3 py-2.5 border border-border rounded-sm text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
              required
            />
          </div>

          {/* Check-out */}
          <div className="space-y-1.5">
            <label htmlFor="checkOut" className="text-xs font-semibold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Check-out
            </label>
            <input
              id="checkOut"
              type="date"
              min={formData.checkIn || today}
              value={formData.checkOut}
              onChange={(e) => handleChange('checkOut', e.target.value)}
              className="w-full px-3 py-2.5 border border-border rounded-sm text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
              required
            />
          </div>

          {/* Adulti */}
          <div className="space-y-1.5">
            <label htmlFor="adulti" className="text-xs font-semibold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              Adulți
            </label>
            <select
              id="adulti"
              value={formData.adulti}
              onChange={(e) => handleChange('adulti', e.target.value)}
              className="w-full px-3 py-2.5 border border-border rounded-sm text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors bg-white"
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>{n} {n === 1 ? 'adult' : 'adulți'}</option>
              ))}
            </select>
          </div>

          {/* Copii */}
          <div className="space-y-1.5">
            <label htmlFor="copii" className="text-xs font-semibold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
              <Baby className="w-3.5 h-3.5" />
              Copii
            </label>
            <select
              id="copii"
              value={formData.copii}
              onChange={(e) => handleChange('copii', e.target.value)}
              className="w-full px-3 py-2.5 border border-border rounded-sm text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors bg-white"
            >
              {[0, 1, 2, 3].map((n) => (
                <option key={n} value={n}>{n} {n === 0 ? 'copii' : n === 1 ? 'copil' : 'copii'}</option>
              ))}
            </select>
          </div>

          {/* Tip camera */}
          <div className="space-y-1.5">
            <label htmlFor="tipCamera" className="text-xs font-semibold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5" />
              Tip cameră
            </label>
            <select
              id="tipCamera"
              value={formData.tipCamera}
              onChange={(e) => handleChange('tipCamera', e.target.value)}
              className="w-full px-3 py-2.5 border border-border rounded-sm text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors bg-white"
            >
              {roomTypes.map((rt) => (
                <option key={rt.value} value={rt.value}>{rt.label}</option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-primary text-white font-medium py-2.5 px-6 rounded-sm hover:bg-primary-light transition-all duration-300 text-sm whitespace-nowrap"
            >
              Verifică disponibilitatea
            </button>
          </div>
        </div>
      </form>
    </motion.section>
  )
}
