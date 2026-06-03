import React from 'react';
import { motion } from 'framer-motion';
import { Quote, TrendingUp } from 'lucide-react';

const SuccessStories: React.FC = () => {
    const stories = [
        {
            name: "Catarina Silva",
            role: "CEO na EcoCharge",
            story: "A Bisnoteka nos deu o blueprint exato que precisávamos. Economizamos 6 meses de planejamento e design.",
            image: "https://i.pravatar.cc/150?u=12",
            stats: "+240% Growth"
        },
        {
            name: "Marcos Juca",
            role: "Fundador da SaaSMaster",
            story: "O manual da marca e o pitch deck foram fundamentais para nossa primeira rodada de investimento.",
            image: "https://i.pravatar.cc/150?u=22",
            stats: "$1.2M Raised"
        }
    ];

    return (
        <section className="py-24 bg-[#10171f] text-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 text-center md:text-left">
                    <div>
                        <h2 className="text-4xl font-black mb-4">Histórias de Sucesso</h2>
                        <p className="text-gray-400 text-lg max-w-xl">
                            Empreendedores que usaram nossos recursos para transformar ideias em impérios.
                        </p>
                    </div>
                    <button className="btn btn-primary px-8">
                        Ver todas as Histórias
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {stories.map((story, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-white/5 border border-white/10 rounded-[32px] p-6 sm:p-8 md:p-10 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-8 hover:bg-white/10 transition-all group lg:min-h-[400px] xl:min-h-0"
                        >
                            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
                                <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col justify-between flex-grow">
                                <div className="text-center sm:text-left">
                                    <Quote className="text-[#f83821] mb-4 mx-auto sm:mx-0" size={32} />
                                    <p className="text-lg sm:text-xl italic text-gray-300 leading-relaxed mb-6">"{story.story}"</p>
                                </div>
                                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4">
                                    <div className="text-center sm:text-left">
                                        <h4 className="text-xl font-bold">{story.name}</h4>
                                        <p className="text-[#f83821] font-medium">{story.role}</p>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1 bg-[#f83821]/20 text-[#f83821] rounded-full text-sm font-bold w-fit">
                                        <TrendingUp size={14} /> {story.stats}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SuccessStories;
