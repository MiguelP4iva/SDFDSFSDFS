/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from 'motion/react';
import { 
  Heart, 
  Users, 
  Home, 
  Sparkles, 
  CheckCircle2, 
  MessageCircle, 
  Smartphone, 
  Printer, 
  ShieldCheck, 
  ChevronDown, 
  ArrowRight,
  Zap,
  Smile,
  Flame,
  Star,
  Cpu,
  Globe,
  Layers,
  Activity,
  Moon,
  Hand,
  Headphones,
  X,
  Mail,
  Lock,
  FileText
} from 'lucide-react';

// --- Background Particles ---
const Particles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-neon-blue/20 rounded-full"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: Math.random() * 0.5
          }}
          animate={{ 
            y: [null, Math.random() * -100 + "%"],
            opacity: [0, 0.5, 0]
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      ))}
    </div>
  );
};

// --- Components ---

const Button = ({ children, className = "", variant = "primary", ...props }: any) => {
  const variants = {
    primary: "bg-neon-pink text-white hover:shadow-[0_0_25px_rgba(255,46,136,0.6)] animate-pulse-neon",
    secondary: "bg-transparent text-white border border-neon-blue/50 hover:bg-neon-blue/10 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]",
    outline: "bg-transparent text-zinc-400 border border-zinc-800 hover:border-zinc-600 hover:text-white"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-8 py-4 rounded-xl font-display font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${variants[variant as keyof typeof variants]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

const Section = React.forwardRef(({ children, className = "", id = "" }: any, ref: any) => (
  <section ref={ref} id={id} className={`relative py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 ${className}`}>
    {children}
  </section>
));

const GlassCard = ({ children, className = "" }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`glass-panel p-8 rounded-2xl ${className}`}
  >
    {children}
  </motion.div>
);

const Modal = ({ isOpen, onClose, title, children, icon: Icon }: any) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative glass-panel w-full max-w-2xl max-h-[80vh] overflow-hidden rounded-3xl border border-neon-blue/20 shadow-[0_0_50px_rgba(0,240,255,0.1)]"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                {Icon && <Icon className="text-neon-blue" size={20} />}
                <h3 className="text-xl font-display font-bold tracking-tight">{title}</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/5 text-zinc-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-8 overflow-y-auto custom-scrollbar max-h-[calc(80vh-80px)]">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ConnectionVisual = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    mouseX.set(x * 2);
    mouseY.set(y * 2);
  };

  const rotateX = useTransform(mouseY, [-1, 1], [15, -15]);
  const rotateY = useTransform(mouseX, [-1, 1], [-15, 15]);

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative z-10 w-full aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-gradient-to-br from-dark-bg via-neon-blue/5 to-neon-purple/5 cursor-crosshair"
    >
      {/* Neural Network Background */}
      <div className="absolute inset-0 opacity-30">
        <svg width="100%" height="100%" viewBox="0 0 400 500">
          <motion.path
            d="M 100 100 Q 200 50 300 100 T 350 250 T 250 400 T 100 450"
            fill="none"
            stroke="url(#grad1)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M 300 100 Q 200 150 100 100 T 50 250 T 150 400 T 300 450"
            fill="none"
            stroke="url(#grad2)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1 }}
          />
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="100%" stopColor="#9d00ff" />
            </linearGradient>
            <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff0080" />
              <stop offset="100%" stopColor="#00f0ff" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Central Connection Symbol */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="relative w-48 h-48"
        >
          {/* Glowing Orbs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-neon-blue rounded-full blur-xl opacity-50 animate-pulse" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-neon-pink rounded-full blur-xl opacity-50 animate-pulse" />
          
          {/* Connecting Lines */}
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <motion.circle 
              cx="50" cy="50" r="30" 
              fill="none" 
              stroke="white" 
              strokeWidth="0.5" 
              strokeDasharray="4 4"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.path 
              d="M 50 20 L 50 80 M 20 50 L 80 50" 
              stroke="rgba(255,255,255,0.2)" 
              strokeWidth="1"
            />
            <motion.circle 
              cx="50" cy="50" r="5" 
              fill="white"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>
        </motion.div>
      </div>

      {/* Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-20"
          initial={{ 
            x: Math.random() * 400, 
            y: Math.random() * 500 
          }}
          animate={{ 
            y: [null, Math.random() * -100],
            opacity: [0, 0.5, 0]
          }}
          transition={{ 
            duration: Math.random() * 5 + 5, 
            repeat: Infinity,
            delay: Math.random() * i
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-60" />
      
      {/* Floating UI Elements */}
      <motion.div 
        animate={{ x: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-10 right-10 glass-panel p-4 rounded-xl border-neon-blue/30 z-20"
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-neon-blue rounded-full animate-ping" />
          <span className="text-[10px] font-mono text-neon-blue">SYNCING EMOTIONS...</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CategoryCard = ({ color, title, description, icon: Icon, count }: any) => {
  const colors = {
    green: "text-card-green border-card-green/20 hover:border-card-green/50",
    blue: "text-card-blue border-card-blue/20 hover:border-card-blue/50",
    red: "text-card-red border-card-red/20 hover:border-card-red/50",
    yellow: "text-card-yellow border-card-yellow/20 hover:border-card-yellow/50"
  };

  const glowColors = {
    green: "group-hover:shadow-[0_0_30px_rgba(0,255,148,0.2)]",
    blue: "group-hover:shadow-[0_0_30px_rgba(0,240,255,0.2)]",
    red: "group-hover:shadow-[0_0_30px_rgba(255,46,136,0.2)]",
    yellow: "group-hover:shadow-[0_0_30px_rgba(255,214,0,0.2)]"
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`group relative glass-panel p-8 rounded-2xl border transition-all duration-500 ${colors[color as keyof typeof colors]} ${glowColors[color as keyof typeof colors]}`}
    >
      <div className="flex justify-between items-start mb-6">
        <Icon size={32} className="opacity-80 group-hover:opacity-100 transition-opacity" />
        <span className="text-xs font-mono opacity-40 group-hover:opacity-100">{count} UNITS</span>
      </div>
      <h3 className="text-2xl font-display font-bold mb-3 tracking-tight text-white">{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">{description}</p>
      
      {/* Animated Shine Effect */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        <motion.div 
          className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
          animate={{ left: ["-100%", "200%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
        />
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const containerRef = useRef(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const offerRef = useRef<HTMLDivElement>(null);
  const [highlightOffer, setHighlightOffer] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  
  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToOffer = () => {
    offerRef.current?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      setHighlightOffer(true);
      setTimeout(() => setHighlightOffer(false), 1500);
    }, 800);
  };

  const handleCheckout = () => {
    setTimeout(() => {
      window.location.href = "https://pay.cakto.com.br/3avnxhh_776642";
    }, 200);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="bg-dark-bg min-h-screen relative selection:bg-neon-blue/30 selection:text-neon-blue">
      <Particles />
      <div className="fixed inset-0 bg-mesh z-0 opacity-50" />
      
      {/* 1. HERO SECTION */}
      <Section className="min-h-screen flex items-center pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-blue/30 bg-neon-blue/5 text-neon-blue text-[10px] font-bold tracking-[0.2em] uppercase mb-8"
            >
              <Activity size={12} className="animate-pulse" />
              ENTRE NÓS DOIS – EDIÇÃO 2.0
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-display font-bold mb-8 leading-[0.9] tracking-tighter">
              Vocês ainda se <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink neon-text-blue">conhecem…</span> <br />
              <span className="text-zinc-500 text-4xl md:text-6xl">ou só convivem?</span>
            </h1>
            
            <p className="text-xl text-zinc-400 max-w-lg mb-12 leading-relaxed font-light">
              Existe uma diferença entre estar junto… e estar <span className="text-white font-medium">realmente conectado.</span> 100 perguntas criadas para despertar o que o algoritmo nunca vai alcançar.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Button className="w-full sm:w-auto" onClick={scrollToOffer}>
                Quero fortalecer minha conexão agora
              </Button>
              <Button variant="secondary" className="w-full sm:w-auto" onClick={scrollToHowItWorks}>
                Ver como funciona
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative perspective-1000 hidden lg:block"
          >
            <div className="absolute inset-0 bg-neon-purple/20 blur-[120px] rounded-full animate-pulse" />
            <ConnectionVisual />
          </motion.div>
        </div>
      </Section>

      {/* 2. COMO FUNCIONA (DETALHADO) */}
      <Section id="como-funciona" ref={howItWorksRef} className="py-32">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tighter"
          >
            Como funciona o <span className="text-neon-blue">Baralho Entre Nós Dois?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-zinc-500 font-light"
          >
            Simples. Intencional. Transformador.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <GlassCard className="border-neon-purple/20">
            <div className="space-y-6 text-lg text-zinc-300 font-light leading-relaxed">
              <p>
                O <span className="text-white font-medium">Baralho Entre Nós Dois</span> é composto por 100 perguntas divididas em níveis de profundidade.
              </p>
              <p>
                Cada carta foi criada para estimular conversas reais — daquelas que normalmente não acontecem na rotina.
              </p>
              <p>
                Vocês escolhem um momento tranquilo, puxam uma carta e respondem com honestidade.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-400 tracking-widest">SEM JULGAMENTOS</span>
                <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-400 tracking-widest">SEM PRESSA</span>
                <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-400 tracking-widest">SEM DISTRAÇÕES</span>
              </div>
              <p className="pt-4 italic text-neon-blue font-light">
                A proposta é criar presença, conexão e memórias.
              </p>
            </div>
          </GlassCard>
          
          <div className="grid grid-cols-1 gap-4">
            <CategoryCard 
              color="green"
              title="LEVE"
              icon={Smile}
              count={30}
              description="Perguntas simples para aquecer a conversa."
            />
            <CategoryCard 
              color="blue"
              title="PROFUNDO"
              icon={Globe}
              count={40}
              description="Reflexões sobre sentimentos, sonhos e experiências."
            />
            <CategoryCard 
              color="red"
              title="OUSADO"
              icon={Flame}
              count={30}
              description="Perguntas que despertam vulnerabilidade e intimidade."
            />
            <CategoryCard 
              color="yellow"
              title="CURINGA"
              icon={Cpu}
              count={10}
              description="Cartas surpresa que quebram padrões e criam momentos únicos."
            />
          </div>
        </div>

        <div className="text-center mb-20">
          <h3 className="text-3xl font-display font-bold mb-12 tracking-tight">Como Jogar</h3>
          <div className="grid md:grid-cols-5 gap-8 relative">
             {[
               { icon: Moon, title: "Desconectem-se", desc: "Escolham um momento sem distrações." },
               { icon: Layers, title: "Nível", desc: "Selecionem um nível de profundidade." },
               { icon: Hand, title: "Puxem", desc: "Retirem uma carta do baralho." },
               { icon: MessageCircle, title: "Respondam", desc: "Transmita sua verdade com sinceridade." },
               { icon: Headphones, title: "Escutem", desc: "Pratiquem a escuta ativa e empática." }
             ].map((item, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ delay: i * 0.1 }}
                 viewport={{ once: true }}
                 className="relative z-10"
               >
                 <div className="w-16 h-16 rounded-2xl glass-panel border-neon-blue/30 flex items-center justify-center mx-auto mb-6 text-neon-blue shadow-[0_0_15px_rgba(0,240,255,0.1)] group-hover:border-neon-blue transition-all">
                   <item.icon size={24} />
                 </div>
                 <h4 className="font-display font-bold mb-2 text-sm uppercase tracking-wider">{item.title}</h4>
                 <p className="text-[10px] text-zinc-500 leading-relaxed uppercase tracking-widest">{item.desc}</p>
               </motion.div>
             ))}
             <div className="absolute top-8 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-blue/20 to-transparent -z-0 hidden md:block" />
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-32"
        >
          <p className="text-3xl md:text-5xl font-display font-bold tracking-tighter leading-tight">
            Não é sobre responder perguntas. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple neon-text-purple">É sobre redescobrir quem está ao seu lado.</span>
          </p>
        </motion.div>
      </Section>

      {/* 3. O PROBLEMA */}
      <Section className="py-32">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tight">
            A tecnologia aproximou o mundo… <br />
            <span className="text-zinc-600 italic">mas afastou as conversas.</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            {[
              { label: "Cada um no próprio celular", delay: 0.1 },
              { label: "Conversas rasas e repetitivas", delay: 0.2 },
              { label: "Falta de profundidade emocional", delay: 0.3 },
              { label: "Rotina que apaga a chama", delay: 0.4 },
              { label: "Silêncios que incomodam", delay: 0.5 }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: item.delay }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-6 glass-panel border-l-4 border-l-neon-purple/50 group hover:border-l-neon-purple transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-neon-purple/10 flex items-center justify-center text-neon-purple group-hover:bg-neon-purple group-hover:text-white transition-all">
                  <Zap size={14} />
                </div>
                <span className="text-lg text-zinc-300 font-light group-hover:text-white transition-colors">{item.label}</span>
              </motion.div>
            ))}
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-md">
              <div className="absolute inset-0 border-2 border-dashed border-zinc-800 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-10 border border-neon-blue/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Smartphone size={80} className="text-zinc-800" />
                <motion.div 
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute text-neon-pink"
                >
                  <Activity size={120} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. A SOLUÇÃO */}
      <Section>
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tighter">O Jogo da <span className="text-neon-blue">Conexão Real.</span></h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-light">
            O Baralho Entre Nós Dois foi criado para quebrar barreiras, despertar vulnerabilidade e criar momentos que marcam para sempre.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CategoryCard 
            color="green"
            title="LEVE"
            icon={Smile}
            count={30}
            description="Quebra-gelo tecnológico. Risadas e descobertas iniciais para sintonizar a frequência."
          />
          <CategoryCard 
            color="blue"
            title="PROFUNDO"
            icon={Globe}
            count={40}
            description="Mergulho profundo. Onde a vulnerabilidade encontra a verdade e os laços se tornam inquebráveis."
          />
          <CategoryCard 
            color="red"
            title="OUSADO"
            icon={Flame}
            count={30}
            description="Intensidade máxima. Para elevar a temperatura e explorar territórios inexplorados da intimidade."
          />
          <CategoryCard 
            color="yellow"
            title="CURINGA"
            icon={Cpu}
            count={10}
            description="Eventos aleatórios. Desafios que mudam a lógica da conversa e trazem o inesperado."
          />
        </div>
      </Section>

      {/* 5. PARA QUEM É */}
      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Casais", desc: "Reative a chama e redescubra quem está ao seu lado." },
            { title: "Amigos", desc: "Saia do superficial e crie amizades de aço." },
            { title: "Famílias", desc: "Aproxime gerações através do diálogo real." },
            { title: "Presente", desc: "A experiência mais moderna que você pode dar." }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-neon-purple/30 transition-all group"
            >
              <h4 className="text-xl font-display font-bold mb-4 text-neon-purple group-hover:neon-text-purple transition-all">{item.title}</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* 6. IMPACTO EMOCIONAL */}
      <Section className="py-40">
        <div className="relative glass-panel p-12 md:p-24 rounded-[3rem] overflow-hidden border-none">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 via-transparent to-neon-blue/20 animate-pulse" />
          <div className="relative z-10 text-center">
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-10 tracking-tighter leading-tight">
              Momentos que um <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-purple">algoritmo nunca vai criar.</span>
            </h2>
            <p className="text-xl text-zinc-300 max-w-3xl mx-auto font-light leading-relaxed mb-12">
              A verdadeira intimidade não está no que você posta, mas no que você revela quando as telas se apagam. Olho no olho, risadas sem filtro e a descoberta de que o outro ainda é um universo a ser explorado.
            </p>
            <div className="flex justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
               <Heart size={40} />
               <Users size={40} />
               <Globe size={40} />
            </div>
          </div>
        </div>
      </Section>

      {/* 7. OFERTA */}
      <Section id="oferta" ref={offerRef} className="pb-40">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-display font-bold mb-4">Invista na sua conexão.</h2>
            <p className="text-zinc-500">O futuro das suas relações começa com uma pergunta.</p>
          </div>
          
          <GlassCard className={`p-12 border-neon-blue/30 relative overflow-hidden transition-all duration-700 ${highlightOffer ? 'shadow-[0_0_50px_rgba(0,240,255,0.3)] border-neon-blue' : ''}`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/10 blur-3xl" />
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <ul className="space-y-6">
                  {[
                    "Acesso imediato",
                    "100 cartas divididas por níveis de acesso",
                    "Versão Imprimível em Alta Resolução",
                    "Garantia de Satisfação de 7 Ciclos"
                  ].map((text, i) => (
                    <li key={i} className="flex items-center gap-4 text-zinc-300">
                      <CheckCircle2 className="text-neon-blue" size={20} />
                      <span className="text-sm font-light">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="text-center">
                <div className="mb-8">
                  <span className="text-zinc-600 line-through text-lg block mb-2">VALOR ORIGINAL: R$ 97,00</span>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-neon-blue text-7xl font-display font-black tracking-tighter">R$ 14</span>
                    <div className="text-left">
                      <span className="text-neon-blue text-2xl font-bold block">,99</span>
                      <span className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest">Single Payment</span>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full text-lg py-6 mb-4" onClick={handleCheckout}>
                  QUERO VIVER ESSA EXPERIÊNCIA
                </Button>
                
                <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  <span className="flex items-center gap-1"><ShieldCheck size={12} /> SECURE</span>
                  <span className="flex items-center gap-1"><Zap size={12} /> INSTANT</span>
                  <span className="flex items-center gap-1"><Globe size={12} /> GLOBAL</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-left">
            <h3 className="text-xl font-display font-bold mb-2 tracking-tight">ENTRE NÓS DOIS</h3>
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest">Connection Protocol v2.0</p>
          </div>
          <div className="flex gap-8 text-zinc-500 text-xs font-mono uppercase tracking-widest">
            <button onClick={() => setActiveModal('privacy')} className="hover:text-neon-blue transition-colors cursor-pointer">Privacy</button>
            <button onClick={() => setActiveModal('terms')} className="hover:text-neon-blue transition-colors cursor-pointer">Terms</button>
            <button onClick={() => setActiveModal('support')} className="hover:text-neon-blue transition-colors cursor-pointer">Support</button>
          </div>
          <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">
            © 2026 NEURAL CONNECTION SYSTEMS. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <Modal 
        isOpen={activeModal === 'privacy'} 
        onClose={() => setActiveModal(null)} 
        title="Privacy Policy"
        icon={Lock}
      >
        <div className="space-y-6 text-zinc-400 font-light leading-relaxed">
          <p>Sua privacidade é nossa prioridade tecnológica. No <span className="text-white font-medium">Neural Connection Systems</span>, adotamos protocolos rigorosos de proteção de dados.</p>
          <div className="space-y-4">
            <h4 className="text-white font-bold">Coleta de Dados</h4>
            <p>Coletamos apenas as informações essenciais para o processamento da sua compra e entrega do produto digital. Seus dados de navegação são anonimizados.</p>
            
            <h4 className="text-white font-bold">Segurança e Criptografia</h4>
            <p>Utilizamos criptografia de ponta a ponta em todas as transações. Seus dados financeiros nunca são armazenados em nossos servidores, sendo processados por gateways de pagamento certificados.</p>
            
            <h4 className="text-white font-bold">Não Compartilhamento</h4>
            <p>Garantimos que seus dados nunca serão vendidos ou compartilhados com terceiros para fins de marketing. Sua jornada de conexão é privada e segura.</p>
          </div>
        </div>
      </Modal>

      <Modal 
        isOpen={activeModal === 'terms'} 
        onClose={() => setActiveModal(null)} 
        title="Terms of Use"
        icon={FileText}
      >
        <div className="space-y-6 text-zinc-400 font-light leading-relaxed">
          <p>Ao acessar o <span className="text-white font-medium">Baralho Entre Nós Dois</span>, você concorda com os seguintes protocolos de uso:</p>
          <div className="space-y-4">
            <h4 className="text-white font-bold">Licença de Uso</h4>
            <p>O acesso ao produto é pessoal e intransferível. A licença permite o uso privado para fortalecer suas conexões pessoais.</p>
            
            <h4 className="text-white font-bold">Propriedade Intelectual</h4>
            <p>Todo o conteúdo, design e perguntas são de propriedade exclusiva. A redistribuição, venda ou reprodução parcial ou total é estritamente proibida e monitorada por sistemas de proteção de IP.</p>
            
            <h4 className="text-white font-bold">Garantia e Reembolso</h4>
            <p>Oferecemos uma garantia de satisfação de 7 dias. Caso o sistema de conexão não atenda às suas expectativas, o reembolso pode ser solicitado via suporte.</p>
          </div>
        </div>
      </Modal>

      <Modal 
        isOpen={activeModal === 'support'} 
        onClose={() => setActiveModal(null)} 
        title="Support Center"
        icon={Activity}
      >
        <div className="space-y-6 text-zinc-400 font-light leading-relaxed">
          <p>Nossa equipe de suporte está pronta para otimizar sua experiência de conexão.</p>
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl border-neon-blue/20">
              <h4 className="text-white font-bold mb-2">Canais de Atendimento</h4>
              <p className="text-sm mb-4">Para dúvidas técnicas, problemas de acesso ou feedback, entre em contato através do nosso terminal de e-mail:</p>
              <a 
                href="mailto:jogoscobertos@gmail.com" 
                className="inline-flex items-center gap-2 text-neon-blue hover:text-white transition-colors font-mono text-sm"
              >
                <Mail size={16} />
                jogoscobertos@gmail.com
              </a>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="block text-[10px] font-mono text-zinc-500 uppercase mb-1">Response Time</span>
                <span className="text-white font-bold">{"< 24h"}</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="block text-[10px] font-mono text-zinc-500 uppercase mb-1">Availability</span>
                <span className="text-white font-bold">24/7 Digital</span>
              </div>
            </div>
            
            <p className="text-xs italic">Garantimos suporte total durante os primeiros 7 dias após a ativação do seu protocolo de conexão.</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
