import React from 'react';
import { Mic, Layout, ArrowRight, Play } from 'lucide-react';

const Resources: React.FC = () => {
    const [books, setBooks] = React.useState<any[]>([]);
    const [podcasts, setPodcasts] = React.useState<any[]>([]);

    React.useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await fetch('http://localhost:3001/api/products');
                if (res.ok) {
                    const data = await res.json();
                    setBooks(data.slice(0, 3));
                }
            } catch (error) {
                console.error(error);
            }
        };
        const fetchPodcasts = async () => {
            try {
                const res = await fetch('http://localhost:3001/api/podcasts');
                if (res.ok) {
                    const data = await res.json();
                    setPodcasts(data.slice(0, 2));
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchBooks();
        fetchPodcasts();
    }, []);

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Reading Suggestions */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold text-[#10171f]">Sugestões de Leitura</h3>
                            <a href="#" className="text-[#f83821] font-semibold text-sm flex items-center gap-1 group">
                                Ver mais <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                        <div className="grid gap-4">
                            {books.length > 0 ? books.map((book, idx) => (
                                <div key={idx} className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#f83821]/20 group transition-all">
                                    <div className="w-16 h-20 rounded-md bg-gray-100 flex-shrink-0" style={{ backgroundColor: `#10171f20`, overflow: 'hidden' }}>
                                        {book.coverImage && <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover opacity-50 mix-blend-multiply" />}
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <h4 className="font-bold text-[#10171f] group-hover:text-[#f83821] transition-colors">{book.title}</h4>
                                        <p className="text-sm text-gray-500">{book.category || "Faundr"}</p>
                                    </div>
                                </div>
                            )) : [
                                { title: "The Lean Startup", author: "Eric Ries", color: "#f83821" },
                                { title: "Zero to One", author: "Peter Thiel", color: "#0011fd" },
                                { title: "Deep Work", author: "Cal Newport", color: "#10171f" }
                            ].map((book, idx) => (
                                <div key={idx} className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#f83821]/20 group transition-all">
                                    <div className="w-16 h-20 rounded-md bg-gray-100 flex-shrink-0" style={{ backgroundColor: `${book.color}20` }}></div>
                                    <div className="flex flex-col justify-center">
                                        <h4 className="font-bold text-[#10171f] group-hover:text-[#f83821] transition-colors">{book.title}</h4>
                                        <p className="text-sm text-gray-500">{book.author}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Foundr Magazine Preview */}
                    <div className="bg-[#10171f] text-white rounded-3xl p-8 flex flex-col gap-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#f83821] blur-[100px] opacity-20"></div>
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-[#f83821] text-xs font-bold rounded-lg uppercase tracking-wider">Edição Especial</span>
                        </div>
                        <h3 className="text-3xl font-black leading-tight">Revista Foundr Magazine</h3>
                        <p className="text-gray-400">As estratégias exclusivas dos maiores CEOs do mundo condensadas em uma leitura poderosa.</p>
                        <div className="mt-auto">
                            <button className="btn btn-primary w-full py-4">Ler Última Edição</button>
                        </div>
                        <div className="absolute bottom-0 right-[-20px] w-48 h-64 bg-white/5 skew-x-[-12deg] border border-white/10 p-6 flex items-end justify-center">
                            <Layout size={80} className="text-white/10" />
                        </div>
                    </div>

                    {/* Podcasts */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold text-[#10171f]">Podcasts</h3>
                            <a href="#" className="text-[#f83821] font-semibold text-sm flex items-center gap-1 group">
                                Ouvir Todos <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                        <div className="grid gap-4">
                            {podcasts.length > 0 ? podcasts.map((pod, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-[#0011fd]/5 transition-all group">
                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#0011fd] shadow-sm group-hover:bg-[#0011fd] group-hover:text-white transition-all">
                                        <Play size={20} fill="currentColor" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#10171f]">{pod.title}</h4>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider">{pod.guestName || "Faundr"} • {pod.duration}</p>
                                    </div>
                                </div>
                            )) : [
                                { title: "Mindset Disruptivo", host: "Ep. #45 - Escala", duration: "42 min" },
                                { title: "Marketing de Emboscada", host: "Ep. #42 - Growth", duration: "38 min" }
                            ].map((pod, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-[#0011fd]/5 transition-all group">
                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#0011fd] shadow-sm group-hover:bg-[#0011fd] group-hover:text-white transition-all">
                                        <Play size={20} fill="currentColor" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#10171f]">{pod.title}</h4>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider">{pod.host} • {pod.duration}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-6 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center gap-2">
                            <Mic className="text-gray-400" size={32} />
                            <p className="text-sm text-gray-400 font-medium">Novo episódio toda Terça-feira</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Resources;
