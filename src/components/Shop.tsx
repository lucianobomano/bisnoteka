import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Tag, Star, ArrowRight } from 'lucide-react';

const Shop: React.FC = () => {
    const products = [
        { title: "Standard Brand Kit", price: "AO 15.000", rating: 4.8 },
        { title: "Premium Pitch Deck Template", price: "AO 25.000", rating: 4.9 },
        { title: "Full Business Blueprint", price: "AO 45.000", rating: 5.0 }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0011fd]/10 text-[#0011fd] rounded-full font-bold text-sm mb-4">
                        <ShoppingBag size={16} /> LOJA EXCLUSIVA
                    </div>
                    <h2 className="text-4xl font-black text-[#10171f]">Recursos Prontos para Uso</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto mt-4 text-lg">
                        Adquira assets isolados para impulsionar seu projeto com qualidade profissional instantânea.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((item, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -10 }}
                            className="p-8 rounded-3xl border border-gray-100 hover:border-[#0011fd]/30 hover:shadow-2xl transition-all group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Tag size={120} />
                            </div>
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-[#0011fd] group-hover:bg-[#0011fd] group-hover:text-white transition-all">
                                    <ShoppingBag size={28} />
                                </div>
                                <div className="flex items-center gap-1 text-yellow-500 font-bold">
                                    <Star fill="currentColor" size={14} /> {item.rating}
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-[#10171f] mb-4 group-hover:text-[#0011fd] transition-colors">{item.title}</h3>
                            <p className="text-3xl font-black text-[#10171f] mb-8">{item.price}</p>
                            <button className="btn btn-navy w-full flex items-center justify-center gap-2 py-4 rounded-2xl">
                                Comprar Agora <ArrowRight size={20} />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Shop;
