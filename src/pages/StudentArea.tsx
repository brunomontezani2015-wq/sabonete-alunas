import React, { useState } from 'react';
import { 
  LogOut, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  DollarSign,
  Palette,
  Sparkles,
  Key,
  Coffee,
  Star,
  Gift,
  PlayCircle,
  Circle,
  CheckCircle2,
  ArrowRight,
  Check
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import PricingCalculatorModal from '../components/PricingCalculatorModal';

const courseData = [
  {
    id: 'iniciante',
    title: 'Iniciante',
    icon: Palette,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
    lessons: [
      { id: 1, title: 'Como fazer sabonete em casa 🧼 10 receitas grátis', videoId: '4NjcYXxnzus' },
      { id: 2, title: '3 receitas caseiras fáceis: lavanda, leite de coco e aveia 🫧', videoId: 'NHM7Wp0Rp-4' },
      { id: 3, title: '20 receitas grátis de sabonetes ✨ (compilado)', videoId: 'XL4nE5ZgOTo' },
      { id: 4, title: 'Sabonetes naturais clássicos para fazer em casa 🌱', videoId: 'TEQz4qncZ4g' },
      { id: 5, title: 'Sabonetes com ingredientes de mercado 🥑🍅🍯🥛', videoId: 'JUF_YRO_iOk' },
      { id: 6, title: 'Técnica simples de sabonete hot process', videoId: 'kvZEp1QUdnI' },
      { id: 7, title: 'Como usar leite em sabonetes (2 formas) 🥛', videoId: 'wFhVsqPdJHE' },
      { id: 8, title: 'Como fazer sabonete de aloe vera em casa 🌵', videoId: 'z6yt_-N3w6I' },
      { id: 9, title: 'Como fazer sabonete 100% óleo de coco', videoId: 'yndEeGLTrmY' },
      { id: 10, title: 'Como fazer sabonete tipo Marseille em casa', videoId: 'WsVjKNgdx6I' },
      { id: 11, title: 'Como fazer sabonete Castile (100% azeite)', videoId: 'X-X_8wo9tVg' },
    ]
  },
  {
    id: 'receitas',
    title: 'Receitas',
    icon: Sparkles,
    iconColor: "text-pink-500",
    iconBg: "bg-pink-50",
    lessons: [
      { id: 12, title: 'Fazendo os sabonetes mais famosos do mundo', videoId: 'I1cS_GVk0A4' },
      { id: 13, title: 'Sabonete de gengibre e musgo marinho 🫚', videoId: 'pZuIKHh1UjU' },
      { id: 14, title: 'Sabonete de banana com leitelho 🍌🥛', videoId: 'tKHxXNP_1gw' },
      { id: 15, title: 'Sabonete de mamão 🌿', videoId: 'G8im0pZR1_I' },
      { id: 16, title: 'Sabonete de pepino e hortelã 🥒', videoId: 'fPi5EcMRhXY' },
      { id: 17, title: 'Sabonete de sebo com cerveja e carvão 🍺🖤', videoId: 'EFejFWGE5rA' },
      { id: 18, title: 'Sabonetes naturais para bebê 👼', videoId: 'NRnCpnWK0ik' },
      { id: 19, title: 'Sabonete com ingrediente secreto ❣️', videoId: 'Vq-j0lUMu48' },
      { id: 20, title: 'Sabonete de cenoura e cúrcuma 🥕', videoId: '50HvOmzylGw' },
      { id: 21, title: 'Sabonete de limão luxuoso 🍋', videoId: 'BJeQ4X_SZ10' },
      { id: 22, title: 'Sabonete de calêndula, mel e leite de aveia 🌼🍯🥛', videoId: 'VOPc3h-hZ1A' },
      { id: 23, title: 'Sabonete de café com cacau ☕', videoId: '1jOMEqscoX4' },
      { id: 24, title: 'Sabonete com frutas e vegetais 🫐🍉', videoId: 'czQCNUj0e38' },
      { id: 25, title: 'Sabonete premium de limão 🍋', videoId: 'Ayek8wujido' },
      { id: 26, title: 'Sabonete “ouro da natureza” 🌲', videoId: '634QGaukveI' },
      { id: 27, title: 'Sabonete de espinheiro-marítimo 🧡', videoId: 'Jp3S5-NUHaU' },
      { id: 28, title: 'Sabonete de lavanda e leite de coco 🌿', videoId: 'KlRGcc670mQ' },
      { id: 29, title: 'Sabonete de mirtilo 🫐', videoId: 'U4nl3hxGXyo' },
      { id: 30, title: 'Sabonete de melancia 🍉', videoId: 'SbmJjJWTThY' },
      { id: 31, title: 'Sabonetes herbais variados 🌿', videoId: 'yFFw9gri2UE' },
      { id: 32, title: 'Sabonete de aloe vera 🍀', videoId: 'gBU6Q1XFcMw' },
      { id: 33, title: 'Sabonete de alecrim 🌿', videoId: 'qeMFm0PE0p4' },
      { id: 34, title: 'Sabonete de azeite com louro 🍃', videoId: 'i6aM4JAlGuo' },
      { id: 35, title: 'Sabonete de cenoura 🥕', videoId: 'weabVH8YyPE' },
      { id: 36, title: 'Sabonete de tomate 🍅', videoId: '6ddGcidQaLI' },
      { id: 37, title: 'Sabonete de mel e leite de arroz 🍯🥛', videoId: '1e2g4vOC7Nw' },
      { id: 38, title: 'Sabonete de abacate 🥑', videoId: 'W89w3dMTfEE' },
      { id: 39, title: 'Sabonetes cítricos 🍊🍋', videoId: 'UhI5hhzNYkw' },
      { id: 40, title: 'Sabonete de grapefruit com musgo marinho ✨', videoId: 'Rq-7wOJAZDA' },
      { id: 41, title: 'Sabonete de leite de cabra e abóbora 🎃', videoId: 'oqm1Yg3EKXU' },
      { id: 42, title: 'Sabonete de melão com hortelã 🌿', videoId: 'sgGY9vKYy64' },
      { id: 43, title: 'Sabonete de leite de coco com baunilha 🥥', videoId: 'KEEobkGSZmo' },
      { id: 44, title: 'Sabonete de laranja com pimenta preta 🍊', videoId: 'CotPulm5Wiw' },
      { id: 45, title: 'Sabonete de lavanda clássico', videoId: 'KuCuRpvska4' },
      { id: 46, title: 'Sabonete de pepino refrescante 🥒', videoId: 'YJekJyko0z0' },
      { id: 47, title: 'Sabonete para lavar louça 🌱', videoId: 'sjcUMWO5nXQ' },
      { id: 48, title: 'Sabonete de mel silvestre 🐝🌼', videoId: 'IkW-Y0Fq71k' },
      { id: 49, title: 'Sabonete com carvão ativado', videoId: '_Ixgbw96gwI' },
    ]
  },
  {
    id: 'tecnicas',
    title: 'Técnicas',
    icon: Key,
    iconColor: "text-yellow-500",
    iconBg: "bg-yellow-50",
    lessons: [
      { id: 50, title: 'Testando carimbos de sabonete 💕', videoId: 'FbHlGsKH6DM' },
      { id: 51, title: 'Elevando o nível dos sabonetes ✨', videoId: 'DnnjWraMJqM' },
      { id: 52, title: 'Técnicas de mistura, swirl e decoração', videoId: 'YHzFmiyerGE' },
      { id: 53, title: 'Técnica marble (efeito mármore)', videoId: 'APXdR66MDQY' },
      { id: 54, title: 'Técnica string pull', videoId: 'LKvysL8eyyQ' },
      { id: 55, title: 'Técnica ombré/gradiente', videoId: 'N_4bzWKmgjY' },
      { id: 56, title: 'Técnica terrazzo', videoId: '9emuN90-6nM' },
      { id: 57, title: 'Técnica paint splatter 🎨', videoId: '_cnF6MWq7kA' },
      { id: 58, title: 'Técnica mica swirl', videoId: 'PBoRdYF5API' },
      { id: 59, title: 'Técnica clamshell', videoId: 'L-AFZCkoB3M' },
      { id: 60, title: 'Técnica kiss pour', videoId: 'GoL3C5jg-SQ' },
      { id: 61, title: 'Técnica chopstick swirl', videoId: 'LbCwJnK6euE' },
    ]
  },
  {
    id: 'avancado',
    title: 'Avançado',
    icon: Star,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
    lessons: [
      { id: 62, title: 'Fazendo sabonete com ingredientes frescos por 1 hora', videoId: '-0VXPAN6Fwc' },
      { id: 63, title: 'Arte da fabricação de sabonetes', videoId: 'SSLGYHSF9GE' },
      { id: 64, title: 'Sabonete com seiva de bétula', videoId: '3y19SR2IJg0' },
      { id: 65, title: 'Sabonete feito como antigamente (cinzas de madeira)', videoId: 'gCUnRYJypVc' },
      { id: 66, title: 'Sabonete com espinheiro-marítimo poderoso', videoId: 'EVYr1hjY-IQ' },
      { id: 67, title: 'Sabonete com aloe vera natural (processo completo)', videoId: 'Oerip69Vjag' },
      { id: 68, title: 'Sabonete super espumante com fruta de verão', videoId: 'DZZVGaoiClg' },
      { id: 69, title: 'Como melhorar sabonetes artesanais (técnicas avançadas)', videoId: 'SvjEHPOVRss' },
      { id: 70, title: 'Ingrediente que deixa o sabonete mais nutritivo', videoId: '0deDQ9hbPqk' },
      { id: 71, title: 'Ingrediente que deixa o sabonete mais sedoso', videoId: 'oPWB7pPQ1-I' },
      { id: 72, title: 'Transformando ingrediente comum em sabonete premium', videoId: '1tdfrpzUb4I' },
    ]
  }
];

const ModuleCard = ({ module, completedLessons, onLessonSelect }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const completedCount = module.lessons.filter((l: any) => completedLessons.includes(l.id)).length;
  const progress = (completedCount / module.lessons.length) * 100;
  const Icon = module.icon;

  return (
    <div className="bg-white rounded-2xl mb-4 shadow-sm border border-gray-100 overflow-hidden">
      <div 
        className="flex items-center justify-between cursor-pointer p-5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${module.iconBg}`}>
            <Icon className={module.iconColor} size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{module.title}</h3>
            <p className="text-gray-500 text-sm">{completedCount}/{module.lessons.length} aulas concluídas</p>
          </div>
        </div>
        <div className="text-gray-400">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="px-5 pb-5">
        <div className="h-1.5 w-full bg-[#e8e4dc] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#b68bd1] rounded-full transition-all duration-500" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {isOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="border-t border-gray-100"
        >
          {module.lessons.map((lesson: any, index: number) => {
            const isCompleted = completedLessons.includes(lesson.id);
            return (
              <div 
                key={lesson.id}
                onClick={() => onLessonSelect(module, lesson)}
                className="flex items-center gap-4 py-4 px-6 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
              >
                <div className="text-gray-400 shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="text-green-500" size={22} />
                  ) : (
                    <Circle size={22} />
                  )}
                </div>
                <div className="text-[#b68bd1] shrink-0">
                  <PlayCircle size={20} />
                </div>
                <span className={`text-sm font-medium ${isCompleted ? 'text-gray-500' : 'text-gray-700'}`}>
                  Aula {lesson.id}: {lesson.title}
                </span>
              </div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default function StudentArea() {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [activeLesson, setActiveLesson] = useState<{module: any, lesson: any} | null>(null);

  const totalClasses = courseData.reduce((acc, mod) => acc + mod.lessons.length, 0);
  const overallProgress = (completedLessons.length / totalClasses) * 100;

  const handleLessonSelect = (module: any, lesson: any) => {
    setActiveLesson({ module, lesson });
    window.scrollTo(0, 0);
  };

  const handleMarkAsCompleted = () => {
    if (activeLesson && !completedLessons.includes(activeLesson.lesson.id)) {
      setCompletedLessons([...completedLessons, activeLesson.lesson.id]);
    }
  };

  const handleNextLesson = () => {
    if (!activeLesson) return;
    
    const currentModule = activeLesson.module;
    const currentLessonIndex = currentModule.lessons.findIndex((l: any) => l.id === activeLesson.lesson.id);
    
    if (currentLessonIndex < currentModule.lessons.length - 1) {
      // Next lesson in same module
      setActiveLesson({
        module: currentModule,
        lesson: currentModule.lessons[currentLessonIndex + 1]
      });
    } else {
      // Next module
      const currentModuleIndex = courseData.findIndex(m => m.id === currentModule.id);
      if (currentModuleIndex < courseData.length - 1) {
        const nextModule = courseData[currentModuleIndex + 1];
        setActiveLesson({
          module: nextModule,
          lesson: nextModule.lessons[0]
        });
      } else {
        // Finished course
        setActiveLesson(null);
      }
    }
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#f5f3ef] font-sans text-gray-800 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-xl font-black text-gray-900">Área de Alunas</h1>
        <Link to="/" className="flex items-center gap-2 bg-[#e8e4dc] hover:bg-[#dcd6cb] text-gray-700 px-4 py-2 rounded-full text-sm font-bold transition-colors">
          <LogOut size={16} /> Sair
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
        
        {activeLesson ? (
          /* Video Player View */
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 font-medium">
              <button onClick={() => setActiveLesson(null)} className="hover:text-gray-900 transition-colors">Início</button>
              <span>/</span>
              <span>Módulo: {activeLesson.module.title}</span>
              <span>/</span>
              <span className="text-[#b68bd1]">Aula {activeLesson.lesson.id}</span>
            </div>

            {/* Video Container */}
            <div className="bg-black rounded-3xl overflow-hidden shadow-xl aspect-video mb-6 relative">
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${activeLesson.lesson.videoId}?autoplay=1`} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>

            {/* Video Details & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
              <div>
                <h2 className="text-2xl font-black text-gray-900 mb-1">Aula {activeLesson.lesson.id}: {activeLesson.lesson.title}</h2>
                <p className="text-gray-500">Módulo: {activeLesson.module.title}</p>
              </div>
              
              <button 
                onClick={handleMarkAsCompleted}
                disabled={completedLessons.includes(activeLesson.lesson.id)}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold transition-all shrink-0 ${
                  completedLessons.includes(activeLesson.lesson.id)
                    ? 'bg-green-100 text-green-700 cursor-default'
                    : 'bg-[#2d6a4f] hover:bg-[#23533e] text-white shadow-lg'
                }`}
              >
                {completedLessons.includes(activeLesson.lesson.id) ? (
                  <>
                    <Check size={20} /> Concluída
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={20} /> Marcar como Concluída
                  </>
                )}
              </button>
            </div>

            {/* Next Lesson Button */}
            <button 
              onClick={handleNextLesson}
              className="w-full bg-white border border-gray-200 hover:border-gray-300 text-gray-800 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              Próxima aula <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          /* Modules List View */
          <div className="animate-in fade-in duration-500">
            <p className="text-gray-600 mb-6 text-lg">Continue de onde parou ou explore um novo módulo.</p>

            {/* Progress Card */}
            <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100">
              <div className="flex justify-between items-end mb-3">
                <span className="text-gray-700 font-medium">Seu progresso geral</span>
                <span className="text-[#b68bd1] font-bold">{completedLessons.length}/{totalClasses} aulas</span>
              </div>
              <div className="h-2.5 w-full bg-[#e8e4dc] rounded-full overflow-hidden mb-2">
                <div 
                  className="h-full bg-[#b68bd1] rounded-full transition-all duration-500" 
                  style={{ width: `${overallProgress}%` }}
                ></div>
              </div>
              <div className="text-right text-xs text-gray-500 font-medium">
                {Math.round(overallProgress)}% completo
              </div>
            </div>

            {/* Modules List */}
            <div className="mb-8">
              {courseData.map((mod) => (
                <ModuleCard 
                  key={mod.id} 
                  module={mod} 
                  completedLessons={completedLessons}
                  onLessonSelect={handleLessonSelect}
                />
              ))}
            </div>

            {/* Bonus Card */}
            <div className="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-red-50">
                  <Gift className="text-red-500" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Módulo Bônus</h3>
                  <p className="text-gray-500 text-sm">Material extra para você se destacar</p>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-2 bg-[#b68bd1] hover:bg-[#a875c4] text-white py-3.5 rounded-xl font-bold transition-colors">
                <ExternalLink size={18} /> Acessar Material Bônus
              </button>
            </div>

            {/* Calculator Card */}
            <div 
              onClick={() => setIsCalculatorOpen(true)}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-50">
                <DollarSign className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Calculadora de Preço</h3>
                <p className="text-gray-500 text-sm">Descubra o preço ideal das suas peças</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <PricingCalculatorModal 
        isOpen={isCalculatorOpen} 
        onClose={() => setIsCalculatorOpen(false)} 
      />
    </div>
  );
}
