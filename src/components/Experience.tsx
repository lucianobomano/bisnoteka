import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Sparkles, BrainCircuit, Rocket, ArrowRight, Star } from 'lucide-react';

const Experience: React.FC = () => {
    return (
        <section className="py-24 bg-[#e5e0e7]/30">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Mentalidade Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 sm:p-12 rounded-[40px] shadow-xl relative overflow-hidden"
                    >
                        <div className="absolute top-10 right-10 text-[#f83821]/10 hidden sm:block">
                            <BrainCircuit size={160} />
                        </div>
                        <div className="relative z-10 flex flex-col gap-6 text-center sm:text-left items-center sm:items-start">
                            <div className="w-16 h-16 bg-[#f83821] rounded-2xl flex items-center justify-center text-white shadow-lg">
                                <Sparkles size={32} />
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-black text-[#10171f] leading-tight">
                                ADQUIRA A MENTALIDADE <span className="text-[#f83821]">CORRECTA</span> PARA EMPREENDER!
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                O sucesso começa na mente. Nossos módulos de Mindset Disruptivo preparam você para os desafios reais do mercado global.
                            </p>
                            <button className="btn btn-primary w-fit px-12 py-4 text-lg">
                                COMEÇAR AGORA
                            </button>
                        </div>
                    </motion.div>

                    {/* Faundr Experience & Courses */}
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-3 text-center lg:text-left">
                            <h3 className="text-3xl font-black text-[#10171f]">Faundr Experience</h3>
                            <p className="text-gray-600 text-lg">Eventos, networking e imersão total com quem já chegou lá.</p>
                        </div>

                        <div className="grid gap-6">
                            {[
                                {
                                    title: "Masterclass: Escala Exponencial",
                                    type: "Curso Premium",
                                    icon: GraduationCap,
                                    color: "#0011fd",
                                    rating: 4.9
                                },
                                {
                                    title: "VIP Mentoring Day",
                                    type: "Experience",
                                    icon: Rocket,
                                    color: "#f83821",
                                    rating: 5.0
                                }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row items-center gap-6 border border-gray-100 hover:shadow-lg transition-all group">
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: item.color }}>
                                        <item.icon size={32} />
                                    </div>
                                    <div className="flex-grow text-center sm:text-left">
                                        <div className="flex flex-col sm:flex-row justify-between items-center mb-2 gap-2">
                                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{item.type}</span>
                                            <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm">
                                                <Star size={12} fill="currentColor" /> {item.rating}
                                            </div>
                                        </div>
                                        <h4 className="text-xl font-bold text-[#10171f] group-hover:text-[#f83821] transition-colors">{item.title}</h4>
                                    </div>
                                    <div className="p-4 rounded-full bg-gray-50 text-[#10171f] group-hover:bg-[#10171f] group-hover:text-white transition-all hidden sm:flex">
                                        <ArrowRight size={20} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 p-8 sm:p-10 rounded-[32px] bg-gradient-to-br from-[#0011fd] to-[#10171f] text-white flex flex-col sm:flex-row justify-between items-center gap-8 relative overflow-hidden group">
                            <div className="flex flex-col gap-2 relative z-10 text-center sm:text-left">
                                <h4 className="text-2xl font-bold">Torne-se um Faundr</h4>
                                <p className="text-white/70 text-lg">Acesse todo o conteúdo exclusivo hoje.</p>
                            </div>
                            <button className="bg-white text-[#10171f] font-black px-10 py-4 rounded-2xl hover:scale-105 transition-transform relative z-10 w-full sm:w-auto">
                                ASSINAR
                            </button>
                            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                                <div className="grid grid-cols-12 gap-2 h-full">
                                    {[...Array(24)].map((_, i) => (
                                        <div key={i} className="h-full border-r border-white/50 skew-x-[-20deg]"></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Experience;
