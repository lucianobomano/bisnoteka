import React from 'react';
import { motion } from 'framer-motion';
import { Hammer, Settings, Download, Box, Layout, Smartphone, Database, ArrowRight, Crosshair, Hexagon } from 'lucide-react';

const FaundrForgePage: React.FC = () => {
    const [tools, setTools] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const res = await fetch('http://localhost:3001/api/forge-programs');
                if (res.ok) {
                    const data = await res.json();
                    const formatted = data.map((p: any) => ({
                        title: p.title,
                        desc: p.description,
                        icon: <Hexagon />, // Simplified for now since we don't store icons in DB
                        id: `FF-0${p.id}`,
                        specs: p.features ? JSON.parse(p.features) : ["Automated", "API Ready", "Scalable"]
                    }));
                    setTools(formatted);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchPrograms();
    }, []);

    return (
        <div className="bg-[#080808] min-h-screen text-white overflow-hidden font-['Roboto_Mono']">
            {/* Technical Overlay */}
            <div className="fixed inset-0 pointer-events-none z-50">
                <div className="absolute top-10 left-10 text-[10px] text-white/20 uppercase tracking-[0.5em] vertical-text">FAUNDR FORGE v2.0 // INDUSTRIAL DATA</div>
                <div className="absolute top-1/2 right-10 -translate-y-1/2 text-[10px] text-white/20 uppercase tracking-[0.5em] vertical-text">SYSTEM STATUS: OPTIMIZED</div>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-white/5 mx-auto"></div>
            </div>

            {/* Hero - Industrial Tech */}
            <section className="relative pt-32 pb-24 border-b border-white/5">
                {/* Blueprint Background */}
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }}
                ></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-end justify-between gap-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-4xl"
                        >
                            <div className="flex items-center gap-4 mb-10">
                                <Hexagon className="text-[#f83821] animate-spin-slow" size={40} />
                                <div className="h-px w-32 bg-white/10"></div>
                                <span className="text-xs font-bold text-[#f83821] tracking-[0.5em]">PROTOCOL ACTIVATED</span>
                            </div>
                            <h1 className="text-[12vw] md:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] mb-12">
                                FORGE <br /><span className="text-transparent border-t border-b border-white/20 py-4 inline-block transform -skew-x-12">SYSTEMS</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-400 font-medium max-w-xl leading-relaxed font-sans">
                                Tools are the leverage of the modern founder. We provide the raw frameworks. You provide the heat.
                            </p>
                        </motion.div>

                        <div className="flex flex-col items-end text-right">
                            <Crosshair size={60} className="text-white/10 mb-8" />
                            <div className="text-6xl font-black italic">FF-042</div>
                            <div className="text-[10px] text-gray-500 tracking-[0.3em] font-bold">BATCH RES-2026</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Industrial Tool Matrix */}
            <section className="py-24 container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
                    {tools.map((tool, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                            className="bg-[#080808] p-16 md:p-24 relative overflow-hidden group cursor-crosshair border-white/5"
                        >
                            {/* Scanning Line Effect */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-[#f83821]/20 -translate-y-full group-hover:animate-scan z-20"></div>

                            <div className="flex justify-between items-start mb-20 relative z-10">
                                <div className="text-xs font-bold text-white/30 tracking-[0.5em]">{tool.id}</div>
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-[#f83821] group-hover:scale-110 transition-transform">
                                    {tool.icon}
                                </div>
                            </div>

                            <h3 className="text-4xl md:text-5xl font-black uppercase mb-8 group-hover:text-[#f83821] transition-colors">
                                {tool.title}
                            </h3>
                            <p className="text-lg text-gray-500 font-sans mb-12 leading-relaxed max-w-md group-hover:text-gray-300 transition-colors">
                                {tool.desc}
                            </p>

                            <div className="flex flex-wrap gap-4 mb-16">
                                {tool.specs.map((spec: string, idx: number) => (
                                    <span key={idx} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-white/50 group-hover:text-white transition-colors">
                                        {spec}
                                    </span>
                                ))}
                            </div>

                            <button className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] border-b border-white/10 pb-4 hover:border-[#f83821] transition-all">
                                DOWNLOAD SPECIFICATIONS <Download size={14} />
                            </button>

                            {/* Decorative ASCII-style elements */}
                            <div className="absolute bottom-8 right-8 opacity-[0.05] text-[8px] pointer-events-none leading-tight font-['Roboto_Mono']">
                                01001000 01001001 <br />
                                01010100 01000010 <br />
                                01010101 01001101
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Assembly Line Section */}
            <section className="py-48 relative overflow-hidden bg-white text-black">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-16">
                        <div className="max-w-xl">
                            <h2 className="text-6xl md:text-8xl font-black uppercase leading-[0.85] tracking-tighter mb-10">
                                CUSTOM <br /> <span className="transform skew-x-12 inline-block bg-black text-white px-4">ENGINEERING</span>
                            </h2>
                            <p className="text-xl font-sans font-bold text-gray-500 mb-12">
                                When standard tools fail, we build unique operational systems tailored to your specific market friction.
                            </p>
                            <button className="px-12 py-6 bg-black text-white rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-2xl flex items-center gap-4">
                                Request Custom Build <ArrowRight size={20} />
                            </button>
                        </div>

                        <div className="relative group lg:pr-24">
                            <div className="w-[400px] h-[400px] bg-black rounded-[80px] flex items-center justify-center p-12 rotate-3 hover:rotate-0 transition-transform duration-700">
                                <Settings size={200} className="text-[#f83821] animate-spin-slow-long" />
                                <div className="absolute inset-0 border-[20px] border-black rounded-[80px] -m-4"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes spin-slow-long {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                @keyframes scan {
                    0% { transform: translateY(-100%); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(1000%); opacity: 0; }
                }
                .animate-spin-slow {
                    animation: spin-slow 10s linear infinite;
                }
                .animate-spin-slow-long {
                    animation: spin-slow-long 40s linear infinite;
                }
                .animate-scan {
                    animation: scan 4s linear infinite;
                }
                .vertical-text {
                    writing-mode: vertical-rl;
                }
                @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;700;900&display=swap');
            `}</style>
        </div>
    );
};

export default FaundrForgePage;
