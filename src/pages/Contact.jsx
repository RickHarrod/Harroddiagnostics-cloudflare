import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    systemType: '',
    panelCount: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        alert('Failed to send message. Please try again or contact us directly.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-24">
      {/* Hero */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">

  {/* Background image */}
  <div 
    className="absolute inset-0 
    bg-[url('https://pub-a88ea30b1aa045b4848b3395a9d2b7ca.r2.dev/Solar%20garage%20wide.jpg')] 
    bg-cover bg-center"
  />

  {/* Linear gradient overlay (your saved settings) */}
  <div className="absolute inset-0 bg-gradient-to-b 
    from-white/65 via-white/55 to-white/40
    dark:from-slate-950/65 dark:via-slate-950/55 dark:to-slate-950/40" 
  />

  {/* Radial overlay (your saved settings) */}
  <div className="absolute inset-0 
    bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,255,255,0.35)_100%)]
    dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.35)_100%)]" 
  />

</div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div>
            <p className="text-amber-500 font-medium tracking-[0.3em] uppercase text-sm mb-6">
              Contact
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 dark:text-white mb-8">
              Let's discuss your<br />
              <span className="text-slate-600 dark:text-slate-400">solar inspection needs</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Whether you need a domestic survey or a large-scale commercial inspection, 
              we're here to help.
            </p>
            </div>
            </div>
            </section>

            {/* Contact Form & Info */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-light text-slate-900 dark:text-white mb-6">Get in touch</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Fill out the form and we'll get back to you within 24 hours with 
                    a quote or to discuss your requirements.
                  </p>
                </div>
                
                <div className="space-y-6 pt-8 border-t border-slate-800 dark:border-slate-800">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-900 dark:bg-slate-900 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-500 mb-1">Phone</p>
                      <p className="text-slate-900 dark:text-white">07356 208212</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-900 dark:bg-slate-900 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-500 mb-1">Email</p>
                      <p className="text-slate-900 dark:text-white">hello@harroddiagnostics.co.uk</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-900 dark:bg-slate-900 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-500 mb-1">Coverage</p>
                      <p className="text-slate-900 dark:text-white">North West England</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-200 dark:border-slate-800">
                  <p className="text-sm text-slate-500 dark:text-slate-500 mb-4">Response time</p>
                  <p className="text-slate-900 dark:text-white">
                    We typically respond within 24 hours and can often schedule 
                    surveys within 5-7 business days.
                  </p>
                </div>
                </div>
                </div>

                {/* Form */}
                <div className="lg:col-span-3">
              {submitted ? (
                <div className="p-12 bg-gray-50 dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-light text-slate-900 dark:text-white mb-4">Message sent</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Thank you for your enquiry. We'll be in touch within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 bg-gray-50 dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-700 dark:text-slate-300">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                        className="bg-white dark:bg-slate-950 border-gray-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-amber-500"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                        className="bg-white dark:bg-slate-950 border-gray-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-amber-500"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-slate-700 dark:text-slate-300">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="bg-white dark:bg-slate-950 border-gray-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-amber-500"
                        placeholder="Your phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-700 dark:text-slate-300">System Type</Label>
                      <Select 
                        value={formData.systemType} 
                        onValueChange={(value) => setFormData({...formData, systemType: value})}
                      >
                        <SelectTrigger className="bg-white dark:bg-slate-950 border-gray-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-amber-500">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-700">
                          <SelectItem value="domestic">Domestic</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="utility">Utility Scale</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="mb-6 space-y-2">
                    <Label htmlFor="panelCount" className="text-slate-700 dark:text-slate-300">Approximate panel count</Label>
                    <Input
                      id="panelCount"
                      value={formData.panelCount}
                      onChange={(e) => setFormData({...formData, panelCount: e.target.value})}
                      className="bg-white dark:bg-slate-950 border-gray-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-amber-500"
                      placeholder="e.g. 50 panels"
                    />
                  </div>

                  <div className="mb-8 space-y-2">
                  <Label htmlFor="message" className="text-slate-700 dark:text-slate-300">
  Address & Message *
</Label>

<Textarea
  id="message"
  value={formData.message}
  onChange={(e) => setFormData({...formData, message: e.target.value})}
  required
  rows={5}
  className="bg-white dark:bg-slate-950 border-gray-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-amber-500 resize-none"
  placeholder="Include the system address and a brief description of your installation or any issues you're experiencing."
/>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-medium py-6 rounded-full"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message
                        <Send className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </form>
                )}
                </div>
                </div>
                </div>
                </section>
                </div>
                );
                }