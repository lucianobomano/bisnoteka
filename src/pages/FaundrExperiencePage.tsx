import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, MapPin, Ticket, Play, ArrowRight, Star, Sparkles, Camera } from 'lucide-react';

const FaundrExperiencePage: React.FC = () => {
    const { scrollYProgress } = useScroll();
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);

    const [events, setEvents] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch(`\${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/events`);
                if (res.ok) {
                    const data = await res.json();
                    setEvents(data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const nextEvent = events.length > 0 ? events[0] : null;

    return (
        <div className="bg-[#020202] min-h-screen text-white overflow-x-hidden">
            {/* Cinematic Background - Animated Mesh */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-gradient-to-br from-[#0011fd] to-transparent blur-[180px] opacity-20 animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-gradient-to-tr from-[#f83821] to-transparent blur-[180px] opacity-10 animate-pulse" style={{ animationDelay: '3s' }}></div>
            </div>

            {/* Cinematic Hero */}
            <section className="relative h-screen flex items-center justify-center pt-24">
                <div className="absolute inset-0 z-0">
                    <img
                        src={nextEvent?.coverImage || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=2000"}
                        className="w-full h-full object-cover opacity-40 mix-blend-overlay scale-110"
                        alt="Event Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020202]/80 to-[#020202]"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="inline-flex items-center gap-3 px-8 py-3 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full mb-12 shadow-[0_0_40px_rgba(255,255,255,0.05)]"
                        >
                            <Sparkles className="text-yellow-400" size={18} />
                            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/90">Beyond the Edge</span>
                        </motion.div>

                        <h1 className="text-[14vw] md:text-[12rem] font-black uppercase leading-[0.75] tracking-[-0.07em] mb-12 italic">
                            FAUNDR <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/50 to-white/10">XPERIENCE</span>
                        </h1>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-12 mt-16">
                            <div className="flex items-center gap-4 group cursor-pointer overflow-hidden px-10 py-5 bg-white text-black rounded-full font-black uppercase text-sm hover:scale-105 transition-all">
                                Get Your Pass <ArrowRight size={18} />
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-left">
                                    <div className="text-xs font-black uppercase tracking-widest text-[#0011fd]">Next Immersion</div>
                                    <div className="text-2xl font-black">{nextEvent?.location || "LUANDA, AO"}</div>
                                </div>
                                <div className="w-px h-10 bg-white/20"></div>
                                <div className="text-left">
                                    <div className="text-xs font-black uppercase tracking-widest text-[#f83821]">Date</div>
                                    <div className="text-2xl font-black">{nextEvent ? new Date(nextEvent.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }) : "24-26 MAR"}</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* The Vibe - Asymmetric Scroll Gallery */}
            <section className="py-48 container mx-auto px-4 overflow-visible">
                <div className="flex flex-col lg:flex-row gap-32">
                    <div className="lg:w-1/3">
                        <div className="sticky top-48">
                            <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-12">
                                ENERGY <br /> <span className="text-white/20">MANIFESTED</span>
                            </h2>
                            <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-sm">
                                Not just an event. A spiritual and strategic reorganization of your founder DNA.
                            </p>
                            <div className="mt-16 flex flex-col gap-8">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-[#0011fd] flex items-center justify-center text-white shadow-[0_0_30px_rgba(0,17,253,0.3)]">
                                        <Camera size={28} />
                                    </div>
                                    <div className="text-sm font-black uppercase tracking-widest">Live Content Creation</div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-[#f83821] flex items-center justify-center text-white shadow-[0_0_30px_rgba(248,56,33,0.3)]">
                                        <Star size={28} />
                                    </div>
                                    <div className="text-sm font-black uppercase tracking-widest">High-Networth Loop</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-2/3 flex flex-col gap-32">
                        {/* Overlapping Floating Images */}
                        <motion.div style={{ y: y1 }} className="relative aspect-[16/9] bg-gray-900 rounded-[80px] overflow-hidden shadow-2xl border border-white/10 rotate-2 hover:rotate-0 transition-transform duration-700">
                            <img src="https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[2s]" alt="Crowd" />
                            <div className="absolute bottom-12 left-12 px-8 py-3 bg-black/50 backdrop-blur-xl border border-white/20 rounded-full text-xs font-black tracking-[0.3em]">IMMERSION 01 // SCALE</div>
                        </motion.div>

                        <div className="flex gap-16">
                            <motion.div style={{ y: y2 }} className="w-1/2 relative aspect-[3/4] bg-gray-900 rounded-[60px] overflow-hidden shadow-2xl border border-white/10 -rotate-3 hover:rotate-0 transition-transform duration-700">
                                <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all" alt="Stage" />
                            </motion.div>
                            <motion.div style={{ y: y1 }} className="w-1/2 mt-32 relative aspect-[3/4] bg-gray-900 rounded-[60px] overflow-hidden shadow-2xl border border-white/10 rotate-6 hover:rotate-0 transition-transform duration-700">
                                <img src="https://images.unsplash.com/photo-1475721027464-572756fc2481?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover mix-blend-color-dodge hover:mix-blend-normal transition-all" alt="Workshop" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cinematic Testimonial - High Contrast */}
            <section className="py-48 bg-white text-black relative">
                <div className="container mx-auto px-4 max-w-6xl text-center">
                    <Star className="text-[#0011fd] mx-auto mb-16" size={60} fill="currentColor" />
                    <h2 className="text-4xl md:text-7xl font-black leading-[1.1] mb-20 tracking-tighter">
                        "O FAUNDR EXPERIENCE MUDOU NÃO SÓ O MEU NEGÓCIO, MAS A FORMA COMO EU PROCESSO A REALIDADE."
                    </h2>
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-gray-200 mb-6 overflow-hidden border-4 border-[#0011fd]">
                            <img src="https://i.pravatar.cc/150?u=premium" alt="Avatar" />
                        </div>
                        <div className="text-xl font-black uppercase tracking-[0.2em]">Ricardo Ventura</div>
                        <div className="text-sm font-bold text-gray-500 tracking-widest mt-2 uppercase">CEO @ Nexus Invest</div>
                    </div>
                </div>
            </section>

            {/* Countdown / Pass Matrix */}
            <section className="py-48 container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 rounded-[60px] overflow-hidden border border-white/10">
                    <div className="p-24 bg-[#050505] flex flex-col justify-between">
                        <div>
                            <span className="text-xs font-black uppercase tracking-[0.5em] text-[#0011fd] mb-6 block">Standard Pass</span>
                            <h3 className="text-6xl font-black uppercase tracking-tighter mb-8">BASIC <br /> ACCESS</h3>
                            <ul className="space-y-4 mb-20">
                                <li className="flex items-center gap-4 text-gray-400 font-bold uppercase text-xs tracking-widest"><Play size={14} className="text-[#0011fd]" /> 3 Days Immersion</li>
                                <li className="flex items-center gap-4 text-gray-400 font-bold uppercase text-xs tracking-widest"><Play size={14} className="text-[#0011fd]" /> Workbook included</li>
                                <li className="flex items-center gap-4 text-gray-400 font-bold uppercase text-xs tracking-widest"><Play size={14} className="text-[#0011fd]" /> Networking Hub</li>
                            </ul>
                        </div>
                        <button className="w-full py-8 text-black bg-white rounded-3xl font-black uppercase tracking-widest text-lg hover:bg-[#0011fd] hover:text-white transition-all">Secure Pass</button>
                    </div>

                    <div className="p-24 bg-[#0a0a0a] flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-[#f83821] blur-[150px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <div>
                            <span className="text-xs font-black uppercase tracking-[0.5em] text-[#f83821] mb-6 block">Inner Circle</span>
                            <h3 className="text-6xl font-black uppercase tracking-tighter mb-8 italic">ULTRA <br /> VIP</h3>
                            <ul className="space-y-4 mb-20">
                                <li className="flex items-center gap-4 text-white font-bold uppercase text-xs tracking-widest"><Sparkles size={14} className="text-[#f83821]" /> Exclusive Mastermind</li>
                                <li className="flex items-center gap-4 text-white font-bold uppercase text-xs tracking-widest"><Sparkles size={14} className="text-[#f83821]" /> Private Dinner</li>
                                <li className="flex items-center gap-4 text-white font-bold uppercase text-xs tracking-widest"><Sparkles size={14} className="text-[#f83821]" /> Personal Advisory</li>
                            </ul>
                        </div>
                        <button className="w-full py-8 text-white bg-[#f83821] rounded-3xl font-black uppercase tracking-widest text-lg hover:shadow-[0_0_50px_rgba(248,56,33,0.4)] transition-all">Apply for VIP</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FaundrExperiencePage;
