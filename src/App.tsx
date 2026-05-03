import { useState } from 'react';
import { 
  LayoutDashboard, 
  Landmark, 
  Receipt,
  Tractor,
  Users, 
  Settings, 
  Coins,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Section = 'home' | 'analytics' | 'projects' | 'team' | 'settings' | 'help';

interface NavigationItem {
  id: Section;
  label: string;
  icon: typeof LayoutDashboard;
  color: string;
  excelUrl?: string;
}

// --- Constants ---
const NAV_ITEMS: NavigationItem[] = [
  { 
    id: 'analytics', 
    label: 'Cuenta de Bancos', 
    icon: Landmark, 
    color: 'bg-blue-500', 
    excelUrl: 'https://docs.google.com/spreadsheets/d/1XuovJtGUh8mabpiCaXLsob757-qlf735/edit?usp=sharing&rm=minimal' 
  },
  { 
    id: 'projects', 
    label: 'Deuda Bancos', 
    icon: Receipt, 
    color: 'bg-emerald-500',
    excelUrl: 'https://docs.google.com/spreadsheets/d/1zYxCpaywR9M9YnP_u4L8rL_fLIvyFbrkaGwHutSPJQ8/edit?usp=sharing&rm=minimal' 
  },
  { 
    id: 'team', 
    label: 'Cuota Santander', 
    icon: Users, 
    color: 'bg-purple-500',
    excelUrl: 'https://docs.google.com/spreadsheets/d/1zT-KQREHD1-7iG9aXM1w_UOfs--FKaXYN6vAVIJgzGg/edit?usp=sharing&rm=minimal'
  },
  { 
    id: 'settings', 
    label: 'Cultivo de Caña', 
    icon: Tractor, 
    color: 'bg-slate-700',
    excelUrl: 'https://docs.google.com/spreadsheets/d/1ibVjx-FMxQW5bXIm4qYOd_HphKDYQusXry8_GLqmECA/edit?usp=sharing&rm=minimal'
  },
  { 
    id: 'help', 
    label: 'Junta', 
    icon: Coins, 
    color: 'bg-amber-500',
    excelUrl: 'https://docs.google.com/spreadsheets/d/1YfptRZYq6EQvVhR3FMV-0oOOR8cjACPRkTBpoJwuD9I/edit?usp=sharing&rm=minimal'
  },
  { id: 'home', label: 'Dashboard', icon: LayoutDashboard, color: 'bg-indigo-600' },
];

// --- Components ---

const Navbar = ({ onBack, currentTitle, isHome }: { onBack: () => void, currentTitle: string, isHome: boolean }) => (
  <nav className="fixed top-0 left-0 right-0 h-16 glass-card border-none z-50 flex items-center px-6 justify-between backdrop-blur-xl">
    <div className="flex items-center gap-4">
      {!isHome && (
        <button 
          onClick={onBack}
          id="back-button"
          className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      <h1 className="font-sans font-medium text-lg text-white tracking-tight">
        {isHome ? 'DIARIO DE ACTIVIDADES' : currentTitle}
      </h1>
    </div>
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white text-[10px] font-mono">
        US
      </div>
    </div>
  </nav>
);

interface SectionViewProps {
  id: Section;
  title: string;
  key?: string;
}

const SectionView = ({ id, title, onBack }: SectionViewProps & { onBack: () => void }) => {
  const item = NAV_ITEMS.find(n => n.id === id);
  const isExcel = !!item?.excelUrl;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className={isExcel ? "w-full min-h-screen p-0" : "pt-6 pb-6 px-4 w-full"}
    >
      <div id={`${id}-content`} className={isExcel ? "w-full h-screen flex flex-col" : "glass-card rounded-[40px] p-6 md:p-10 min-h-[85vh] flex flex-col"}>
        <div className={`flex items-center gap-6 ${isExcel ? "p-6 bg-black/40 backdrop-blur-md border-b border-white/10" : "mb-8"}`}>
          <button 
            onClick={onBack}
            className="p-3 hover:bg-white/10 rounded-2xl transition-colors text-white border border-white/10 group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </button>
          <div className="flex flex-col">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight uppercase">{title}</h2>
            {!isExcel && <div className="h-1 w-20 bg-indigo-400 rounded-full mt-2 shadow-[0_0_15px_rgba(129,140,248,0.5)]" />}
          </div>
        </div>

        <div className={`flex-1 w-full overflow-hidden ${isExcel ? "" : "bg-black/20 rounded-3xl border border-white/5"}`}>
          {isExcel ? (
            <div className="w-full h-full">
              <iframe 
                src={item?.excelUrl}
                className="w-full h-full border-none"
                allow="autoplay"
                title={title}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-12 text-center">
              <p className="text-indigo-100/30 text-lg font-light italic">
                Espacio configurado para contenido de {title.toLowerCase()}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');

  const currentItem = NAV_ITEMS.find(item => item.id === activeSection);

  return (
    <div className="min-h-screen mesh-gradient font-sans text-white antialiased selection:bg-indigo-500/30">
      <main className="w-full relative z-10">
        <AnimatePresence mode="wait">
          {activeSection === 'home' ? (
            <motion.div 
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="pt-8 pb-12 px-6 max-w-7xl mx-auto w-full"
            >
              <div className="text-center mb-16">
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 uppercase"
                >
                  DIARIO DE ACTIVIDADES
                </motion.h2>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-indigo-200/60 text-xl font-light"
                >
                  Seleccione una sección para comenzar
                </motion.p>
              </div>

              <div id="navigation-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {NAV_ITEMS.filter(i => i.id !== 'home').map((item, index) => (
                  <motion.button
                    key={item.id}
                    id={`nav-btn-${item.id}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + (index * 0.05) }}
                    whileHover={{ y: -8 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveSection(item.id)}
                    className="glass-button h-48 rounded-[32px] p-8 text-left group hover:glass-button-hover"
                  >
                    <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 transition-all group-hover:scale-110 group-hover:bg-white/10 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]`}>
                      <item.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">{item.label}</h3>
                    <p className="mt-2 text-sm text-indigo-100/40 font-light">Explorar sección de {item.label.toLowerCase()}</p>
                    
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                    </div>
                  </motion.button>
                ))}
                
                {/* Bonus empty card to keep it balanced */}
                <div className="hidden lg:block p-8 rounded-[32px] border border-dashed border-white/20 opacity-30 flex items-center justify-center">
                  <p className="text-indigo-200 font-mono text-xs uppercase tracking-widest">Próximamente</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <SectionView 
              key={activeSection} 
              id={activeSection} 
              title={currentItem?.label || ''} 
              onBack={() => setActiveSection('home')}
            />
          )}
        </AnimatePresence>
      </main>

      <footer className="fixed bottom-8 left-0 right-0 flex justify-center pointer-events-none z-50">
        <div className="glass-card px-6 py-2 rounded-full pointer-events-auto border-white/10">
          <p className="text-[10px] uppercase tracking-[0.3em] font-mono text-indigo-200/40">
            Sincronizado hoy a las {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </footer>
    </div>
  );
}
