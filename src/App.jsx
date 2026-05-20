import React, { useState } from 'react';
import { 
  Search, BrainCircuit, Mail, MapPin, 
  ChevronRight, Download, Menu, X, Cpu, Network, Zap
} from 'lucide-react';
import heroImage from './assets/profile_picture.jpg';

// --- DATA DEFINITIONS ---

const SKILLS_PROBABILITIES = [
  { name: 'Python & PyTorch', value: 0.98, color: 'bg-blue-500' },
  { name: 'Large Language Models', value: 0.94, color: 'bg-purple-500' },
  { name: 'Computer Vision (YOLO)', value: 0.91, color: 'bg-indigo-500' },
  { name: 'Data Science', value: 0.88, color: 'bg-cyan-500' },
  { name: 'C++ & SQL', value: 0.85, color: 'bg-teal-500' },
  { name: 'Linux / System Arch.', value: 0.82, color: 'bg-pink-500' },
  { name: 'Innovation Management', value: 0.79, color: 'bg-fuchsia-500' },
  { name: 'Problem Solving', value: 0.76, color: 'bg-violet-500' },
];

const PROJECTS = [
  {
    id: 1,
    title: 'Video Referee System',
    category: 'Computer Vision',
    description: 'AI-powered football analysis and officiating assistant using YOLOv8, object tracking, and automated event detection.',
    tags: ['YOLO', 'PyTorch', 'OpenCV'],
    imageType: 'vision'
  },
  {
    id: 2,
    title: 'Model Context Protocol',
    category: 'Model Context Protocol',
    description: 'Built MCP servers and clients to securely connect Large Language Models with external tools, local databases, and live APIs.',
    tags: ['MCP', 'Python', 'FastAPI'],
    imageType: 'mcp'
  },
  {
    id: 3,
    title: 'Semantic Search Assistant',
    category: 'Semantic Search',
    description: 'Advanced RAG system for vast document retrieval incorporating dense embeddings, neural reranking, and a conversational interface.',
    tags: ['FAISS', 'LLMs', 'LangChain'],
    imageType: 'search'
  },
  {
    id: 4,
    title: 'IoT Sensor Network anomaly detection',
    category: 'Hardware/IoT',
    description: 'Edge-deployed lightweight models to detect anomalies in real-time sensor streams on constrained devices.',
    tags: ['TinyML', 'C++', 'ESP32'],
    imageType: 'hardware'
  }
];

const CATEGORIES = ['All', 'Computer Vision', 'Semantic Search', 'Model Context Protocol', 'Hardware/IoT', 'Academic Research'];

const TIMELINE = [
  { id: 'BOS', label: '<BOS>', type: 'special' },
  { id: 'ufba', label: 'UFBA', title: 'CS Student', date: '2022 – Present', desc: 'Computer Science student at Universidade Federal da Bahia.', color: 'blue' },
  { id: 'research', label: 'Research', title: 'AI & Vision', date: '2023', desc: 'Academic research in AI, Computer Vision and Data Science.', color: 'purple' },
  { id: 'pier', label: 'Pier X', title: 'AI Intern', date: '2024', desc: 'AI Developer Intern at Pier X Solutions.', color: 'teal' },
  { id: 'portobelo', label: 'portobelo', title: 'AI Engineer', date: '∞', desc: 'Development of MCP tools for legacy civil construction ERPs', color: 'red' },
  { id: 'EOS', label: '<EOS>', type: 'special' },
];

const EMBEDDING_NODES = [
  { label: 'NLP', x: 20, y: 25, color: 'bg-blue-400', shadow: 'shadow-blue-500/50' },
  { label: 'Computer Vision', x: 60, y: 15, color: 'bg-cyan-400', shadow: 'shadow-cyan-500/50' },
  { label: 'PyTorch', x: 85, y: 30, color: 'bg-purple-400', shadow: 'shadow-purple-500/50' },
  { label: 'SQL', x: 10, y: 60, color: 'bg-pink-400', shadow: 'shadow-pink-500/50' },
  { label: 'Data Science', x: 55, y: 65, color: 'bg-teal-400', shadow: 'shadow-teal-500/50' },
  { label: 'Automation', x: 88, y: 60, color: 'bg-indigo-400', shadow: 'shadow-indigo-500/50' },
  { label: 'Linux', x: 25, y: 85, color: 'bg-emerald-400', shadow: 'shadow-emerald-500/50' },
  { label: 'Research', x: 45, y: 80, color: 'bg-slate-400', shadow: 'shadow-slate-500/50' },
  { label: 'C++', x: 65, y: 90, color: 'bg-red-400', shadow: 'shadow-red-500/50' },
  { label: 'Innovation', x: 80, y: 85, color: 'bg-yellow-400', shadow: 'shadow-yellow-500/50' },
];

const Card = ({ children, className = "" }) => (
  <div className={`bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-slate-800 text-slate-300 border-slate-700',
    primary: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  };
  return (
    <span className={`px-2.5 py-1 text-xs font-medium rounded-md border ${variants[variant]}`}>
      {children}
    </span>
  );
};

const EmbeddingVector = () => {
  const values = [0.72, -0.14, 0.91, 0.03, -0.68, 0.47, 0.88, -0.21, '⋮', 0.37, -0.59, 0.66, 0.19];
  return (
    <div className="flex flex-col items-center">
      <div className="text-xs font-mono text-slate-400 mb-4 flex items-center gap-2">
        <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-white">2</span>
        EMBEDDING VECTOR
      </div>
      <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl font-mono text-sm w-48 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5 pointer-events-none"></div>
        {values.map((v, i) => (
          <div key={i} className="flex items-center justify-between py-1">
            <span className={`text-slate-300 w-12 text-right ${v === '⋮' ? 'text-center w-full my-1 text-lg' : ''}`}>{v}</span>
            {v !== '⋮' && (
              <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden flex items-center">
                 {/* Simulate progress bar based on value magnitude */}
                 <div 
                    className={`h-full rounded-full ${parseFloat(v) > 0 ? 'bg-blue-500' : 'bg-purple-500'}`}
                    style={{ width: `${Math.abs(parseFloat(v)) * 100}%`, transformOrigin: 'left', animation: `pulse-width 3s ease-in-out infinite alternate ${i * 0.1}s` }}
                 />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 px-3 py-1 rounded-md border border-slate-700 bg-slate-800/50 text-xs text-slate-400 font-mono">
        d = 768
      </div>
    </div>
  );
};

const NeuralNetworkVisualizer = () => {
  // Static node layout for visual effect
  const layers = [
    [20, 50, 80], // Input
    [10, 30, 50, 70, 90], // Hidden 1
    [15, 35, 65, 85], // Hidden 2
    [25, 50, 75] // Output
  ];

  return (
    <div className="flex flex-col items-center w-full max-w-[280px]">
      <div className="text-xs font-mono text-slate-400 mb-4 flex items-center gap-2">
        <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-white">3</span>
        NEURAL LAYER
      </div>
      
      <div className="relative w-full aspect-square bg-slate-900/40 border border-slate-700/50 rounded-2xl flex items-center justify-center shadow-inner mb-6">
        <svg className="w-full h-full p-4" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.15)" />
              <stop offset="100%" stopColor="rgba(236, 72, 153, 0.15)" />
            </linearGradient>
            <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
            <filter id="particleGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
          </defs>
          
          {/* Draw Connections */}
          {layers.map((layer, lIdx) => {
            if (lIdx === layers.length - 1) return null;
            const nextLayer = layers[lIdx + 1];
            return layer.map((y1, n1Idx) => 
              nextLayer.map((y2, n2Idx) => {
                const x1 = (lIdx / (layers.length - 1)) * 90 + 5;
                const x2 = ((lIdx + 1) / (layers.length - 1)) * 90 + 5;
                // Add animated "data pulses" randomly
                const shouldAnimate = (n1Idx + n2Idx + lIdx) % 3 === 0;
                
                // Fixed duration and delay for stable animations
                const dur = 1.5 + (n1Idx * 0.1) + (n2Idx * 0.1);
                const begin = (lIdx * 0.5) + (n1Idx * 0.2);

                return (
                  <g key={`l-${lIdx}-${n1Idx}-${n2Idx}`}>
                    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#lineGrad)" strokeWidth="0.8" />
                    {shouldAnimate && (
                      <circle cx={x1} cy={y1} r="1.5" fill="#e2e8f0" filter="url(#particleGlow)" opacity="0">
                        <animate attributeName="cx" values={`${x1};${x2}`} dur={`${dur}s`} repeatCount="indefinite" begin={`${begin}s`} />
                        <animate attributeName="cy" values={`${y1};${y2}`} dur={`${dur}s`} repeatCount="indefinite" begin={`${begin}s`} />
                        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur={`${dur}s`} repeatCount="indefinite" begin={`${begin}s`} />
                      </circle>
                    )}
                  </g>
                );
              })
            );
          })}

          {/* Draw Nodes on top of lines */}
          {layers.map((layer, lIdx) => {
            const x = (lIdx / (layers.length - 1)) * 90 + 5;
            const isInput = lIdx === 0;
            const isOutput = lIdx === layers.length - 1;
            
            let color = "#A855F7"; // Purple for hidden
            if (isInput) color = "#3B82F6"; // Blue
            if (isOutput) color = "#EC4899"; // Pink

            return layer.map((y, nIdx) => (
              <g key={`n-${lIdx}-${nIdx}`}>
                {/* Outer Glow */}
                <circle 
                  cx={x} cy={y} 
                  r={isInput || isOutput ? "4.5" : "3.5"} 
                  fill={color} 
                  opacity="0.3"
                  filter="url(#nodeGlow)"
                />
                {/* Inner Core */}
                <circle 
                  cx={x} cy={y} 
                  r={isInput || isOutput ? "2.5" : "1.8"} 
                  fill={color} 
                />
              </g>
            ));
          })}
        </svg>
        
        {/* Overlay badge positioned inside bottom */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-[#0B1120] text-xs text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.15)] whitespace-nowrap">
          <ActivityLine /> ReLU Activations
        </div>
      </div>
    </div>
  );
};

const ActivityLine = () => (
  <svg width="24" height="12" viewBox="0 0 24 12" className="text-purple-400 stroke-current">
    <path d="M0,6 L4,6 L6,2 L8,10 L10,4 L12,8 L14,6 L24,6" fill="none" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const SoftmaxOutput = () => (
  <div className="flex flex-col w-full max-w-sm">
    <div className="text-xs font-mono text-slate-400 mb-4 flex items-center gap-2">
      <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-white">4</span>
      SOFTMAX OUTPUT <span className="text-slate-500 text-[10px] ml-1">(SKILL PROBABILITIES)</span>
    </div>
    <div className="space-y-3 bg-slate-900/30 border border-slate-800 rounded-xl p-5">
      {SKILLS_PROBABILITIES.map((skill, idx) => (
        <div key={idx} className="group">
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-slate-300 group-hover:text-white transition-colors">{skill.name}</span>
            <span className="text-slate-400 font-mono">{skill.value.toFixed(2)}</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${skill.color} opacity-80 group-hover:opacity-100 transition-opacity relative`}
              style={{ width: `${skill.value * 100}%` }}
            >
               <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/30 rounded-full animate-[shimmer_2s_infinite]"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AskPortfolio = () => {
  const [query, setQuery] = useState('');
  
  const handleQuery = (e) => {
    e.preventDefault();
    if(query.trim()) alert("Simulated search for: " + query);
    setQuery('');
  };

  return (
    <Card className="flex flex-col md:flex-row gap-6 items-center">
      <div className="flex items-center gap-4 min-w-[250px]">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
          <BrainCircuit size={32} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white tracking-wide">ASK MY PORTFOLIO</h3>
          <p className="text-sm text-slate-400">Your AI-powered assistant</p>
        </div>
      </div>
      
      <div className="flex-1 w-full">
        <form onSubmit={handleQuery} className="relative mb-4">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything about my experience, projects or skills..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 pl-12 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner"
          />
          <Search className="absolute left-4 top-3.5 text-slate-500" size={18} />
          <button type="submit" className="absolute right-3 top-2.5 p-1 text-slate-400 hover:text-blue-400 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </form>
        
        <div className="flex flex-wrap gap-2">
          {['What projects has João built?', 'Tell me about the Video Referee system.', 'Show Model Context Protocol integrations.'].map((q, i) => (
            <button key={i} onClick={() => setQuery(q)} className="text-xs bg-slate-800/50 hover:bg-slate-700 border border-slate-700 rounded-full px-3 py-1.5 text-slate-300 transition-colors flex items-center gap-1.5">
              <span className="text-slate-500">
                {i === 0 ? '?' : i === 1 ? <Cpu size={12}/> : <Network size={12}/>}
              </span>
              {q}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};

const AboutAttention = () => {
  const text = "I'm a Computer Science student at UFBA with a passion for building intelligent systems using PyTorch, YOLO, LLMs and turning data into real impact. I focus on innovation and automation to solve complex problems and create scalable solutions.";
  
  // Custom renderer to highlight specific tokens
  const renderText = () => {
    const highlights = {
      'UFBA': 'border-blue-500/50 bg-blue-500/10 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.2)]',
      'intelligent': 'border-slate-600 bg-slate-800 text-slate-200',
      'systems': 'border-slate-600 bg-slate-800 text-slate-200',
      'PyTorch': 'border-purple-500/50 bg-purple-500/10 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.2)]',
      'YOLO': 'border-indigo-500/50 bg-indigo-500/10 text-indigo-300',
      'LLMs': 'border-pink-500/50 bg-pink-500/10 text-pink-300',
      'data': 'border-teal-500/50 bg-teal-500/10 text-teal-300',
      'impact.': 'text-white font-medium',
      'innovation': 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300',
      'automation': 'border-yellow-500/50 bg-yellow-500/10 text-yellow-300',
    };

    return text.split(' ').map((word, i) => {
      const cleanWord = word.replace(/[.,]/g, '');
      const match = highlights[cleanWord] || highlights[word];
      if (match) {
        return <span key={i} className={`inline-block px-1.5 py-0.5 mx-0.5 rounded border text-sm ${match}`}>{word}</span>;
      }
      return <span key={i}> {word} </span>;
    });
  };

  return (
    <Card className="flex flex-col justify-between h-full relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4">
        <Badge variant="primary"><span className="flex items-center gap-1.5"><Zap size={12}/> Attention Mechanism</span></Badge>
      </div>
      
      <div className="mb-8 pr-32">
        <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wide">ABOUT ME</h3>
        <p className="text-slate-400 leading-relaxed text-[15px]">
          {renderText()}
        </p>
        <p className="mt-4 text-slate-400 leading-relaxed text-[15px]">
          My goal is to bridge research and industry through technology, delivering solutions that make a difference.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 border-t border-slate-800/60 pt-6">
        {[
          { v: '3+', l: 'Years Coding' },
          { v: '15+', l: 'Projects' },
          { v: '2', l: 'Research Works' },
          { v: '∞', l: 'Curiosity', lg: true }
        ].map((stat, i) => (
          <div key={i} className="text-center flex flex-col items-center justify-center border-r border-slate-800 last:border-0">
            <span className={`font-bold text-white ${stat.lg ? 'text-3xl' : 'text-2xl'}`}>{stat.v}</span>
            <span className="text-[10px] uppercase text-slate-500 mt-1">{stat.l}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

const ProjectPlaceholderImage = ({ type }) => {
  // Generative SVGs for project thumbnails based on category
  const gradients = {
    vision: "url(#grad-vision)",
    mcp: "url(#grad-mcp)",
    search: "url(#grad-search)",
    hardware: "url(#grad-hw)"
  };

  return (
    <div className="w-full h-40 bg-slate-900 relative overflow-hidden border-b border-slate-800">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-vision" x1="0%" y1="0%" x2="100%" y2="100%">
             <stop offset="0%" stopColor="#1e3a8a" />
             <stop offset="100%" stopColor="#064e3b" />
          </linearGradient>
          <linearGradient id="grad-mcp" x1="0%" y1="0%" x2="100%" y2="100%">
             <stop offset="0%" stopColor="#312e81" />
             <stop offset="100%" stopColor="#831843" />
          </linearGradient>
          <linearGradient id="grad-search" x1="0%" y1="0%" x2="100%" y2="100%">
             <stop offset="0%" stopColor="#0f172a" />
             <stop offset="100%" stopColor="#1e1b4b" />
          </linearGradient>
          <linearGradient id="grad-hw" x1="0%" y1="0%" x2="100%" y2="100%">
             <stop offset="0%" stopColor="#14532d" />
             <stop offset="100%" stopColor="#451a03" />
          </linearGradient>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={gradients[type] || "url(#grad-search)"} />
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Abstract graphic overlays based on type */}
        {type === 'vision' && (
          <g transform="translate(20, 20)">
            <rect x="10" y="10" width="40" height="60" fill="none" stroke="#4ade80" strokeWidth="2" />
            <circle cx="30" cy="40" r="4" fill="#4ade80" />
            <rect x="70" y="30" width="30" height="50" fill="none" stroke="#60a5fa" strokeWidth="2" />
            <text x="12" y="8" fill="#4ade80" fontSize="8" fontFamily="monospace">Person: 0.98</text>
          </g>
        )}
        {type === 'mcp' && (
           <g transform="translate(30, 30)">
             <path d="M0,20 Q20,0 40,20 T80,20" fill="none" stroke="#c084fc" strokeWidth="2" strokeDasharray="4 4" />
             <rect x="30" y="10" width="20" height="20" rx="4" fill="#581c87" stroke="#c084fc" />
             <circle cx="0" cy="20" r="5" fill="#f472b6" />
             <circle cx="80" cy="20" r="5" fill="#38bdf8" />
           </g>
        )}
        {type === 'search' && (
           <g transform="translate(20, 20)">
             <rect x="0" y="0" width="80" height="8" rx="2" fill="rgba(255,255,255,0.1)" />
             <rect x="0" y="15" width="60" height="8" rx="2" fill="rgba(255,255,255,0.1)" />
             <rect x="0" y="30" width="70" height="8" rx="2" fill="rgba(255,255,255,0.2)" />
             <rect x="0" y="45" width="40" height="8" rx="2" fill="rgba(255,255,255,0.1)" />
             <circle cx="100" cy="25" r="15" fill="none" stroke="#818cf8" strokeWidth="2" />
             <line x1="112" y1="37" x2="125" y2="50" stroke="#818cf8" strokeWidth="2" />
           </g>
        )}
        {type === 'hardware' && (
           <g transform="translate(40, 20)">
             <rect x="0" y="0" width="40" height="40" rx="2" fill="#064e3b" stroke="#34d399" />
             <path d="M-10,20 L0,20 M40,20 L50,20 M20,-10 L20,0 M20,40 L20,50" stroke="#34d399" strokeWidth="2"/>
             <circle cx="20" cy="20" r="8" fill="#10b981" />
           </g>
        )}
      </svg>
      {/* Category badge overlay */}
      <div className="absolute top-3 left-3">
        <Badge variant={type === 'vision' ? 'cyan' : type === 'mcp' ? 'purple' : 'default'}>
          {type === 'vision' ? 'Computer Vision' : type === 'mcp' ? 'MCP' : 'Systems'}
        </Badge>
      </div>
    </div>
  );
};

const ProjectClassifier = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = PROJECTS.filter(p => activeFilter === 'All' || p.category === activeFilter);

  return (
    <Card className="flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-lg font-bold text-white uppercase tracking-wide">PROJECT CLASSIFIER</h3>
        <a href="#" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
          View all projects <ChevronRight size={14} />
        </a>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
              activeFilter === cat 
                ? 'bg-blue-500/20 border-blue-500/50 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.2)]' 
                : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 flex-1">
        {filteredProjects.map(project => (
          <div key={project.id} className="group bg-slate-950 rounded-xl border border-slate-800 overflow-hidden hover:border-blue-500/30 transition-colors flex flex-col">
            <ProjectPlaceholderImage type={project.imageType} />
            <div className="p-4 flex flex-col flex-1">
              <h4 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h4>
              <p className="text-slate-400 text-sm mb-4 flex-1 line-clamp-3">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-[10px] text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        {/* Navigation Arrow placeholder if more projects exist */}
        {filteredProjects.length >= 3 && (
            <div className="hidden lg:flex items-center justify-center p-4">
                <button className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
                    <ChevronRight size={20} />
                </button>
            </div>
        )}
      </div>
    </Card>
  );
};

const SkillEmbeddingSpace = () => {
  return (
    <Card className="h-[350px] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white uppercase tracking-wide">SKILL EMBEDDING SPACE</h3>
        <Badge variant="default">t-SNE Projection</Badge>
      </div>
      
      <div className="relative flex-1 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
        }}></div>
        
        {/* Axes labels */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] text-slate-500 uppercase tracking-widest origin-left">Dimension 2</div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 uppercase tracking-widest">Dimension 1</div>

        {/* Nodes */}
        {EMBEDDING_NODES.map((node, i) => (
          <div 
            key={i} 
            className="absolute group"
            style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <div className="relative flex flex-col items-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 whitespace-nowrap bg-slate-800 border border-slate-600 px-2 py-1 rounded text-xs text-white z-10">
                {node.label}
              </div>
              <div className={`w-3 h-3 rounded-full ${node.color} ${node.shadow} shadow-[0_0_10px_currentColor] cursor-pointer hover:scale-150 transition-transform duration-300`}></div>
              <span className="text-[10px] text-slate-400 mt-1 pointer-events-none">{node.label}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const TimelineTokens = () => {
  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white uppercase tracking-wide">TIMELINE AS TOKENS</h3>
        <Badge variant="default">Transformer Timeline</Badge>
      </div>

      <div className="overflow-x-auto pb-4 no-scrollbar">
        <div className="flex items-center min-w-max px-2">
          {TIMELINE.map((token, i) => (
            <React.Fragment key={token.id}>
              {token.type === 'special' ? (
                <div className="px-3 py-1.5 font-mono text-sm text-slate-500 border border-slate-800 rounded bg-slate-900/50">
                  {token.label}
                </div>
              ) : (
                <div className={`
                  relative flex flex-col items-center justify-center p-3 w-32 h-20 border rounded-lg text-center cursor-pointer hover:-translate-y-1 transition-transform group
                  bg-slate-900/80
                  ${token.color === 'blue' ? 'border-blue-500/30 hover:border-blue-500' : ''}
                  ${token.color === 'purple' ? 'border-purple-500/30 hover:border-purple-500' : ''}
                  ${token.color === 'orange' ? 'border-orange-500/30 hover:border-orange-500' : ''}
                  ${token.color === 'teal' ? 'border-teal-500/30 hover:border-teal-500' : ''}
                  ${token.color === 'pink' ? 'border-pink-500/30 hover:border-pink-500' : ''}
                `}>
                  <span className={`text-xs font-bold mb-1
                    ${token.color === 'blue' ? 'text-blue-400' : ''}
                    ${token.color === 'purple' ? 'text-purple-400' : ''}
                    ${token.color === 'orange' ? 'text-orange-400' : ''}
                    ${token.color === 'teal' ? 'text-teal-400' : ''}
                    ${token.color === 'pink' ? 'text-pink-400' : ''}
                  `}>{token.label}</span>
                  <span className="text-[10px] text-slate-300 leading-tight">{token.title}</span>
                  <span className="text-[9px] text-slate-500 mt-1 font-mono">{token.date}</span>
                  
                  {/* Tooltip */}
                  <div className="absolute top-full mt-2 w-48 bg-slate-800 text-xs text-slate-200 p-2 rounded shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-10 border border-slate-700">
                    {token.desc}
                  </div>
                </div>
              )}
              
              {/* Connector Arrow */}
              {i < TIMELINE.length - 1 && (
                <div className="mx-2 text-slate-600 flex items-center">
                  <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
                    <path d="M0,6 L20,6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3"/>
                    <path d="M16,2 L22,6 L16,10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-6 pt-4 border-t border-slate-800">
        {TIMELINE.filter(t => t.type !== 'special').map(token => (
          <div key={token.id} className="flex items-start gap-3">
             <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0
               ${token.color === 'blue' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : ''}
               ${token.color === 'purple' ? 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]' : ''}
               ${token.color === 'orange' ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]' : ''}
               ${token.color === 'teal' ? 'bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.5)]' : ''}
               ${token.color === 'pink' ? 'bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.5)]' : ''}
             `}></div>
             <div>
               <span className="text-sm font-semibold text-slate-200 mr-2">{token.label}</span>
               <span className="text-xs text-slate-400">{token.desc}</span>
             </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const ContactSection = () => {
  const [formState, setFormState] = useState('idle'); // idle, submitted

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('submitted');
    setTimeout(() => setFormState('idle'), 5000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left side Graphic/Text */}
      <Card className="lg:col-span-1 flex flex-col justify-between overflow-hidden relative">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white uppercase tracking-tight leading-tight mb-2">
            LET'S BUILD<br/>INTELLIGENT SYSTEMS<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">TOGETHER</span>
          </h2>
          <p className="text-sm text-slate-400 mt-4 max-w-xs">
            Always open to collaborate on meaningful projects and innovative ideas.
          </p>
        </div>
        
        {/* Abstract sphere graphic representing globe/network */}
        <div className="absolute -bottom-20 -left-10 w-64 h-64 opacity-50 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_60s_linear_infinite]">
            <defs>
              <radialGradient id="sphereGrad" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.4)" />
                <stop offset="100%" stopColor="rgba(15, 23, 42, 0)" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill="url(#sphereGrad)" />
            {/* Grid lines to make it look like a wireframe sphere */}
            <path d="M10 50 A 40 40 0 0 0 90 50 A 40 10 0 0 1 10 50" fill="none" stroke="rgba(147, 197, 253, 0.2)" strokeWidth="0.5"/>
            <path d="M10 50 A 40 40 0 0 1 90 50 A 40 10 0 0 0 10 50" fill="none" stroke="rgba(147, 197, 253, 0.2)" strokeWidth="0.5"/>
            <path d="M50 10 A 10 40 0 0 1 50 90 A 40 40 0 0 0 50 10" fill="none" stroke="rgba(147, 197, 253, 0.2)" strokeWidth="0.5"/>
            <path d="M50 10 A 10 40 0 0 0 50 90 A 40 40 0 0 1 50 10" fill="none" stroke="rgba(147, 197, 253, 0.2)" strokeWidth="0.5"/>
            
            {/* Some glowing nodes */}
            <circle cx="30" cy="30" r="1.5" fill="#60A5FA" className="animate-pulse" />
            <circle cx="70" cy="60" r="1" fill="#C084FC" className="animate-pulse" style={{animationDelay: '1s'}} />
            <circle cx="45" cy="75" r="2" fill="#38BDF8" className="animate-pulse" style={{animationDelay: '0.5s'}} />
          </svg>
        </div>
      </Card>

      {/* Right side Links & Form */}
      <div className="lg:col-span-2 space-y-6">
        {/* Contact Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { icon: Mail, label: 'Email', value: 'joaopaulogbdev@gmail.com', desc: 'I usually reply within 24h.' },
            { icon: Network, label: 'GitHub', value: 'github.com/joaopaulogb', desc: 'Check out my repositories.' },
            { icon: BrainCircuit, label: 'LinkedIn', value: 'linkedin.com/in/joaopaulogb', desc: "Let's connect professionally." },
            { icon: MapPin, label: 'Location', value: 'Salvador, Bahia, Brazil', desc: 'UTC -3' },
          ].map((item, i) => (
            <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 flex flex-col hover:border-blue-500/30 transition-colors">
              <div className="flex items-center gap-2 text-slate-300 mb-2">
                <item.icon size={16} className="text-slate-500" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              <span className="text-xs text-white truncate">{item.value}</span>
              <span className="text-[10px] text-slate-500 mt-1">{item.desc}</span>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                 </div>
                 <input type="text" required placeholder="Your name" className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors" />
               </div>
               <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Mail size={16} />
                 </div>
                 <input type="email" required placeholder="Your email" className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors" />
               </div>
            </div>
            <div>
              <textarea required rows="4" placeholder="Your message" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"></textarea>
            </div>
            <div className="flex justify-end">
              {formState === 'submitted' ? (
                <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-6 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Message prepared. Please use Email/LinkedIn.
                </div>
              ) : (
                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-lg shadow-blue-500/20">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                  Send Message
                </button>
              )}
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-300 font-sans selection:bg-blue-500/30 selection:text-white">
      {/* Global Styles for custom animations not easily done with standard Tailwind */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse-width {
          0% { transform: scaleX(0.8); opacity: 0.8; }
          100% { transform: scaleX(1); opacity: 1; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.5); 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(71, 85, 105, 0.8); 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(100, 116, 139, 1); 
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      {/* HEADER / NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B1120]/80 backdrop-blur-lg border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-widest text-white">JPG<span className="text-blue-500 mx-0.5">•</span>AI</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {['Home', 'Projects', 'Skills', 'Timeline', 'About', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-slate-400 hover:text-white transition-colors relative group">
                {item}
                {item === 'Home' && <span className="absolute -bottom-5 left-0 right-0 h-0.5 bg-blue-500 rounded-t-full"></span>}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors border border-slate-700">
              <Download size={16} /> Download CV
            </button>
            <button className="text-slate-400 hover:text-white p-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-slate-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* HERO SECTION: Neural Pipeline */}
        <section id="home" className="w-full">
          <Card className="p-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4 relative">
              
              {/* 1. Profile Image */}
              <div className="flex flex-col items-center shrink-0">
                 <div className="text-xs font-mono text-slate-400 mb-4 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-white">1</span>
                    PROFILE IMAGE
                 </div>
                 <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-3xl overflow-hidden border-2 border-slate-700 shadow-[0_0_30px_rgba(59,130,246,0.15)] group">
                    {/* Placeholder image resembling the young man in the reference */}
                     <img 
                      src={heroImage}
                      alt="João Paulo Gomes Bernardino" 
                      className="w-full h-full object-cover filter contrast-110 saturate-50 group-hover:saturate-100 transition-all duration-500"
                    />
                    {/* Scanning overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent translate-y-[-100%] group-hover:animate-[shimmer_2s_ease-in-out_infinite]"></div>
                    {/* Grid overlay */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-50 mix-blend-overlay"></div>
                 </div>
              </div>

              {/* Arrow 1 */}
              <div className="hidden lg:block text-slate-600"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></div>
              <div className="lg:hidden text-slate-600 rotate-90"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></div>

              {/* 2. Embedding Vector */}
              <EmbeddingVector />

              {/* Arrow 2 */}
              <div className="hidden lg:block text-slate-600"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></div>
              <div className="lg:hidden text-slate-600 rotate-90"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></div>

              {/* 3. Neural Layer */}
              <NeuralNetworkVisualizer />

              {/* Arrow 3 */}
              <div className="hidden lg:block text-slate-600"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></div>
              <div className="lg:hidden text-slate-600 rotate-90"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></div>

              {/* 4. Softmax Output */}
              <SoftmaxOutput />

            </div>
          </Card>
        </section>

        {/* ASK MY PORTFOLIO */}
        <section id="ask">
          <AskPortfolio />
        </section>

        {/* GRID SECTION: About & Classifier */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ABOUT ME (Attention) */}
          <section id="about">
            <AboutAttention />
          </section>

          {/* PROJECT CLASSIFIER */}
          <section id="projects">
            <ProjectClassifier />
          </section>
        </div>

        {/* GRID SECTION: Embeddings & Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SKILL EMBEDDING SPACE */}
          <section id="skills">
            <SkillEmbeddingSpace />
          </section>

          {/* TIMELINE AS TOKENS */}
          <section id="timeline">
            <TimelineTokens />
          </section>
        </div>

        {/* CONTACT SECTION */}
        <section id="contact">
          <ContactSection />
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-8 bg-[#0B1120]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-widest text-white opacity-50">JPG<span className="text-blue-500 mx-0.5">•</span>AI</span>
          </div>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} João Paulo Gomes Bernardino. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-slate-500">
            <a href="#" className="hover:text-white transition-colors"><Network size={18} /></a>
            <a href="#" className="hover:text-white transition-colors"><BrainCircuit size={18} /></a>
            <a href="#" className="hover:text-white transition-colors"><Mail size={18} /></a>
          </div>
        </div>
      </footer>

      {/* 
        GITHUB PAGES DEPLOYMENT INSTRUCTIONS (As requested in prompt)
        -------------------------------------------------------------
        If you extract this single-file React component into a full Vite project:
        
        1. Initialize: `npm create vite@latest portfolio -- --template react`
        2. Install deps: `npm install lucide-react tailwindcss postcss autoprefixer`
        3. Init Tailwind: `npx tailwindcss init -p`
        4. Configure tailwind.config.js with content paths.
        5. In `vite.config.js`, add `base: '/your-repo-name/'` for GitHub pages.
        6. Create `.github/workflows/deploy.yml`:
           name: Deploy to GitHub Pages
           on:
             push:
               branches: [ main ]
           permissions:
             contents: write
           jobs:
             build-and-deploy:
               runs-on: ubuntu-latest
               steps:
                 - name: Checkout 🛎️
                   uses: actions/checkout@v3
                 - name: Install and Build 🔧
                   run: |
                     npm ci
                     npm run build
                 - name: Deploy 🚀
                   uses: JamesIves/github-pages-deploy-action@v4
                   with:
                     folder: dist
      */}
    </div>
  );
}
