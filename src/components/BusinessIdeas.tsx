import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Presentation, Palette, ArrowRight, CheckCircle2 } from 'lucide-react';

const blueprints = [
    {
        title: "EcoCharge: Infraestrutura de Carregamento",
        category: "Sustentabilidade",
        image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop",
        features: ["Plano de Negócios", "Pitch Deck", "Identidade Visual", "Brandbook"]
    },
    {
        title: "SaaSMaster: Plataforma de Gestão",
        category: "Tecnologia",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        features: ["MVP Roadmap", "Investor Deck", "UI Kit Pro", "Manual da Marca"]
    },
    {
        title: "GourmetBox: Assinatura Gastronómica",
        category: "E-commerce",
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop",
        features: ["Supply Chain Plan", "Marketing Kit", "Logo & Embalagem", "Tone of Voice"]
    }
];

const BusinessIdeas: React.FC = () => {
    return (
        <section className="bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl font-black text-[#10171f] mb-4">Blueprints de Negócio</h2>
                        <p className="text-gray-600 text-lg">
                            Não entregamos apenas ideias. Entregamos o ecossistema completo para você começar a executar amanhã.
                        </p>
                    </div>
                    <button className="btn btn-navy">
                        Ver Todos Blueprints <ArrowRight size={20} />
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blueprints.map((item, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 flex flex-col h-full"
                        >
                            {/* Image Header */}
                            <div className="relative h-56 overflow-hidden">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-[#10171f]">
                                    {item.category}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-[#10171f] mb-6 leading-tight">{item.title}</h3>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    {item.features.map((feature, fIdx) => (
                                        <div key={fIdx} className="flex items-center gap-2 text-sm text-gray-500">
                                            <CheckCircle2 size={14} className="text-[#f83821]" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                                    <div className="flex gap-2">
                                        <div className="p-2 bg-gray-50 rounded-lg text-gray-400"><FileText size={18} /></div>
                                        <div className="p-2 bg-gray-50 rounded-lg text-gray-400"><Presentation size={18} /></div>
                                        <div className="p-2 bg-gray-50 rounded-lg text-gray-400"><Palette size={18} /></div>
                                    </div>
                                    <button className="text-[#f83821] font-bold flex items-center gap-2 group">
                                        Explorar
                                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BusinessIdeas;
