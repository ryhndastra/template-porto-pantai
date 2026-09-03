import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Copy,
  Check,
  ExternalLink,
  Mail,
  MapPin,
  MessageSquare,
  Clock,
  Send,
  Sparkles,
  ArrowUp,
  RotateCw,
  Heart
} from 'lucide-react';
import { useClipboard } from '../../hooks/useClipboard';
import { profileData } from '../../data/portfolioData';
import { ContactOceanCanvas } from './ContactOceanCanvas';

const inquiryTopics = [
  { id: 'web', label: 'Full-Stack Web', subject: 'Inquiry: Full-Stack Web Development' },
  { id: 'mobile', label: 'Mobile App (Flutter)', subject: 'Inquiry: Flutter Mobile App' },
  { id: 'collab', label: 'Diskusi Santai', subject: 'Inquiry: Collaboration & Discussion' }
];

export const ContactSection: React.FC = () => {
  const { copied, copy } = useClipboard();
  const [selectedTopic, setSelectedTopic] = useState(inquiryTopics[0]);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [submarineClicks, setSubmarineClicks] = useState<number>(0);
  const [showHeart, setShowHeart] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setCurrentTime(new Intl.DateTimeFormat('id-ID', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmarineClick = () => {
    setSubmarineClicks((prev) => prev + 1);
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 1200);
  };

  const mailtoLink = `mailto:${profileData.contact.email}?subject=${encodeURIComponent(
    selectedTopic.subject
  )}&body=${encodeURIComponent(
    `Halo Reyhand,\n\nSaya ingin berdiskusi mengenai topik: ${selectedTopic.label}.\n\n[Tulis pesan Anda di sini]\n\nSalam,\n`
  )}`;

  return (
    <section
      id="contact"
      className="relative z-20 -mt-1 w-full bg-[#02587a] select-none py-24 overflow-hidden text-[#0f172a]"
    >
      <ContactOceanCanvas />

      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
        className="absolute top-20 right-8 sm:right-24 z-30 cursor-pointer group"
        onClick={handleSubmarineClick}
        title="Klik kapal selam!"
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [-4, 4, -4]
          }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
        >
          <motion.div
            animate={{ rotateY: submarineClicks * 360, scale: showHeart ? 1.2 : 1 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 200 }}
            className="relative"
          >
            <svg width="68" height="68" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl">
              <path d="M26 12 L26 20 L32 20" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <ellipse cx="32" cy="34" rx="24" ry="14" fill="#fde047" stroke="#0f172a" strokeWidth="2.5" />
              <path d="M24 20 C24 17 38 17 38 20 L38 24 L24 24 Z" fill="#facc15" stroke="#0f172a" strokeWidth="2" />
              <circle cx="24" cy="34" r="4" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.8" />
              <circle cx="34" cy="34" r="4" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.8" />
              <circle cx="44" cy="34" r="4" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.8" />
              <path d="M7 28 L11 34 L7 40" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
            </svg>

            <AnimatePresence>
              {showHeart && (
                <motion.div
                  initial={{ opacity: 0, y: 0, scale: 0.5 }}
                  animate={{ opacity: 1, y: -28, scale: 1.2 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-rose-400 pointer-events-none"
                >
                  <Heart className="w-5 h-5 fill-rose-400 stroke-rose-600" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-12 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{
            duration: 0.55,
            type: 'spring',
            stiffness: 220,
            damping: 24
          }}
          className="p-8 sm:p-12 rounded-[36px] bg-[#fffdf5] border-3 border-[#0f172a] shadow-[10px_10px_0px_#0f172a] space-y-8"
        >
          {/* header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#fde047] text-[#0f172a] text-xs font-mono font-black border-2 border-[#0f172a] shadow-[3px_3px_0px_#0f172a] w-fit">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>05 // KONTAK & KOLABORASI</span>
              </div>

              <div className="px-3 py-1 rounded-xl bg-[#dcfce7] border-2 border-[#0f172a] text-xs font-mono font-black text-[#15803d] shadow-[2px_2px_0px_#0f172a]">
                STATUS: TERSEDIA
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight leading-[1.08]">
                Mari Berdiskusi & Berkolaborasi
              </h2>
              <p className="text-sm sm:text-base text-[#475569] font-medium leading-relaxed max-w-2xl">
                Punya ide proyek, kebutuhan rekayasa web/mobile, atau peluang kolaborasi? Hubungi saya langsung melalui kanal di bawah.
              </p>
            </div>
          </div>

          {/* bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
            {/* email and topic station */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="md:col-span-7 p-6 rounded-3xl bg-[#fff9d4] border-2 border-[#0f172a] shadow-[4px_4px_0px_#0f172a] flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748b]">
                  Pilih Topik Diskusi
                </div>

                {/* topic buttons */}
                <div className="flex flex-wrap gap-2">
                  {inquiryTopics.map((topic) => {
                    const isSelected = selectedTopic.id === topic.id;
                    return (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => setSelectedTopic(topic)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border-2 transition-all cursor-pointer ${isSelected
                          ? 'bg-[#0284c7] text-white border-[#0f172a] shadow-[2px_2px_0px_#0f172a]'
                          : 'bg-[#fffdf5] text-[#0f172a] border-[#0f172a] shadow-[2px_2px_0px_#0f172a] hover:bg-[#fde047]'
                          }`}
                      >
                        {topic.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* send email and copy button group */}
              <div className="space-y-2 pt-2 border-t-2 border-[#0f172a]/10">
                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href={mailtoLink}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#fde047] hover:bg-[#facc15] text-[#0f172a] font-mono font-black text-xs sm:text-sm transition-all cursor-pointer border-2 border-[#0f172a] shadow-[3px_3px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#0f172a]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Email</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => copy(profileData.contact.email)}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#fffdf5] hover:bg-[#fde047] text-[#0f172a] font-mono font-bold text-xs sm:text-sm transition-all cursor-pointer border-2 border-[#0f172a] shadow-[2px_2px_0px_#0f172a]"
                    title="Salin alamat email"
                  >
                    <Mail className="w-4 h-4 text-[#0284c7]" />
                    <span>{profileData.contact.email}</span>
                    {copied ? (
                      <Check className="w-4 h-4 text-[#15803d] ml-1" />
                    ) : (
                      <Copy className="w-4 h-4 text-[#64748b] ml-1" />
                    )}
                  </button>
                </div>

                {copied && (
                  <div className="text-xs font-mono font-bold text-[#15803d] flex items-center gap-1.5 animate-fadeIn">
                    <Check className="w-3.5 h-3.5" />
                    <span>Email berhasil disalin ke clipboard!</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* flip card tile for status and secret note */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.22 }}
              style={{ perspective: '800px' }}
              className="md:col-span-5 min-h-[220px]"
            >
              <motion.div
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 180, damping: 20 }}
                className="relative w-full h-full"
              >
                {/* status, clock and socials */}
                <div
                  style={{ backfaceVisibility: 'hidden' }}
                  className="w-full h-full p-6 rounded-3xl bg-[#fff9d4] border-2 border-[#0f172a] shadow-[4px_4px_0px_#0f172a] flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-[#fffdf5] border-2 border-[#0f172a]">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#475569]">
                        <Clock className="w-4 h-4 text-[#0284c7]" />
                        <span>Waktu Lokal (WIB)</span>
                      </div>
                      <span className="text-sm font-mono font-black text-[#0f172a] tabular-nums">
                        {currentTime || '16:00:00'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-[#475569] px-1">
                      <MapPin className="w-4 h-4 text-[#ef4444] shrink-0" />
                      <span>Indonesia • Remote & Hybrid Ready</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t-2 border-[#0f172a]/10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748b]">
                        Socials & Profil
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsFlipped(true)}
                        className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#0284c7] hover:text-[#0f172a] cursor-pointer"
                      >
                        <span>Pesan Rahasia</span>
                        <RotateCw className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <a
                        href={profileData.contact.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-2xl bg-[#fffdf5] hover:bg-[#fde047] text-[#0f172a] font-mono font-bold text-xs transition-all border-2 border-[#0f172a] shadow-[2px_2px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#0f172a] flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-[#0f172a]" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                          </svg>
                          <span>GitHub</span>
                        </div>
                        <ExternalLink className="w-3 h-3 text-[#64748b] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>

                      <a
                        href={profileData.contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-2xl bg-[#fffdf5] hover:bg-[#fde047] text-[#0f172a] font-mono font-bold text-xs transition-all border-2 border-[#0f172a] shadow-[2px_2px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#0f172a] flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-[#0284c7]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                          <span>LinkedIn</span>
                        </div>
                        <ExternalLink className="w-3 h-3 text-[#64748b] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* secret developer note */}
                <div
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                  className="absolute inset-0 p-6 rounded-3xl bg-[#fde047] border-2 border-[#0f172a] shadow-[4px_4px_0px_#0f172a] flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-black text-[#0f172a] uppercase flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
                        <span>Pesan Rahasia Pengembang</span>
                      </span>
                    </div>
                    <p className="text-xs font-medium text-[#1e293b] leading-relaxed">
                      Terima kasih sudah menjelajahi portofolio ini sampai tuntas! Selalu terbuka untuk ngobrol santai seputar web dev, mobile tech, atau kolaborasi proyek seru.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsFlipped(false)}
                    className="w-full py-2 px-3 rounded-xl bg-[#fffdf5] hover:bg-[#fff9d4] text-[#0f172a] text-xs font-mono font-black border-2 border-[#0f172a] shadow-[2px_2px_0px_#0f172a] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <RotateCw className="w-3 h-3" />
                    <span>Kembali ke Profil</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* footer dock */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="p-5 sm:p-6 rounded-[28px] bg-[#fffdf5] border-3 border-[#0f172a] shadow-[6px_6px_0px_#0f172a] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono font-bold text-[#475569]"
        >
          <div className="flex items-center gap-2 text-[#0f172a]">
            <Sparkles className="w-4 h-4 text-[#f59e0b]" />
            <span>&copy; {new Date().getFullYear()} {profileData.name} • Full-Stack & Mobile Developer</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#64748b] hidden md:inline">Built with React, Vite & Tailwind CSS</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="px-3.5 py-1.5 rounded-xl bg-[#fff9d4] hover:bg-[#fde047] text-[#0f172a] border-2 border-[#0f172a] shadow-[2px_2px_0px_#0f172a] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Ke Atas</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
