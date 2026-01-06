import React, { useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  Clock, 
  BarChart, 
  Copy, 
  Download, 
  ArrowRight, 
  Play, 
  Check, 
  Globe,
  FileJson
} from 'lucide-react';
import { ReactFlow, Background, Controls, useNodesState, useEdgesState, BackgroundVariant } from '@xyflow/react';
import { OpenAIIcon, GoogleSheetsIcon } from '../components/BrandIcons';

// --- MOCK DATA ---
const WORKFLOW_TITLE = "Scraping & Enrichissement LinkedIn";
const WORKFLOW_JSON = {
  "name": WORKFLOW_TITLE,
  "nodes": [
    {
      "parameters": {},
      "name": "Start",
      "type": "n8n-nodes-base.start",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "url": "https://api.linkedin.com/v2/people",
        "authentication": "headerAuth"
      },
      "name": "HTTP Request",
      "type": "n8n-nodes-base.httpRequest",
      "position": [450, 300]
    },
    {
      "parameters": {
        "model": "gpt-4",
        "messages": [
          {
            "role": "system",
            "content": "Analyze the LinkedIn profile data."
          }
        ]
      },
      "name": "OpenAI Analysis",
      "type": "n8n-nodes-base.openAi",
      "position": [650, 300]
    },
    {
      "parameters": {
        "operation": "append",
        "sheetId": "123456789"
      },
      "name": "Google Sheets",
      "type": "n8n-nodes-base.googleSheets",
      "position": [850, 300]
    }
  ],
  "connections": {
    "Start": {
      "main": [
        [
          {
            "node": "HTTP Request",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "HTTP Request": {
      "main": [
        [
          {
            "node": "OpenAI Analysis",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "OpenAI Analysis": {
      "main": [
        [
          {
            "node": "Google Sheets",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
};

// --- STYLES DES NOEUDS ---
const nodeStyle = {
  background: '#18181b', // zinc-900
  color: '#fff',
  border: '1px solid #3f3f46', // zinc-700
  borderRadius: '12px',
  padding: '10px',
  minWidth: '150px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  fontSize: '12px',
  fontFamily: 'Inter, sans-serif'
};

const initialNodes = [
  { 
    id: '1', 
    type: 'input', 
    data: { label: (
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-brand-purple/20 rounded text-brand-purple"><Play size={14} /></div>
        <span className="font-semibold">Start Trigger</span>
      </div>
    ) }, 
    position: { x: 50, y: 150 },
    style: { ...nodeStyle, border: '1px solid #7c3aed', boxShadow: '0 0 15px rgba(124, 58, 237, 0.2)' }
  },
  { 
    id: '2', 
    data: { label: (
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-blue-500/20 rounded text-blue-400"><Globe size={14} /></div>
        <div>
          <span className="font-semibold block">Scrape Profile</span>
          <span className="text-[10px] text-gray-400">HTTP Request</span>
        </div>
      </div>
    ) }, 
    position: { x: 300, y: 50 },
    style: nodeStyle
  },
  { 
    id: '3', 
    data: { label: (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 flex items-center justify-center bg-transparent"><div className="w-5 h-5"><OpenAIIcon /></div></div>
        <div>
          <span className="font-semibold block">AI Analysis</span>
          <span className="text-[10px] text-gray-400">OpenAI GPT-4</span>
        </div>
      </div>
    ) }, 
    position: { x: 300, y: 250 },
    style: nodeStyle
  },
  { 
    id: '4', 
    type: 'output',
    data: { label: (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 flex items-center justify-center bg-transparent"><div className="w-5 h-5"><GoogleSheetsIcon /></div></div>
        <div>
          <span className="font-semibold block">Save Lead</span>
          <span className="text-[10px] text-gray-400">Google Sheets</span>
        </div>
      </div>
    ) }, 
    position: { x: 550, y: 150 },
    style: nodeStyle
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#52525b' } },
  { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#52525b' } },
  { id: 'e2-4', source: '2', target: '4', animated: true, style: { stroke: '#52525b' } },
  { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#52525b' } },
];

const WorkflowDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [copied, setCopied] = useState(false);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(WORKFLOW_JSON, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    const blob = new Blob([JSON.stringify(WORKFLOW_JSON, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'workflow-fiko-template.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUseTemplate = () => {
    navigate(`/audit?workflow=${encodeURIComponent(WORKFLOW_TITLE)}`);
  };

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col pt-24">
      
      {/* HEADER */}
      <div className="px-6 pb-6 border-b border-white/5 bg-brand-dark/50 backdrop-blur-sm z-20 sticky top-16">
        <div className="max-w-7xl mx-auto w-full">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/bibliotheque" className="hover:text-white transition-colors">Bibliothèque</Link>
            <ChevronRight size={14} />
            <span className="text-white">{WORKFLOW_TITLE}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-3">{WORKFLOW_TITLE}</h1>
              <div className="flex items-center gap-4 text-sm">
                <span className="px-2 py-1 rounded bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 font-medium">Intermédiaire</span>
                <div className="flex items-center gap-1.5 text-brand-glow">
                  <Clock size={16} />
                  <span>Gain: 5h/semaine</span>
                </div>
              </div>
            </div>
            
            {/* Quick Actions (Mobile mainly, or extra desktop) */}
             <div className="flex items-center gap-3">
                <button onClick={handleDownloadJson} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors">
                  <Download size={20} />
                </button>
             </div>
          </div>
        </div>
      </div>

      {/* SPLIT LAYOUT */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 h-[calc(100vh-200px)]">
        
        {/* COL 1 & 2: VISUALIZATION (Interactive) */}
        <div className="lg:col-span-2 relative bg-neutral-950 border-r border-white/5">
           <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur px-3 py-1 rounded text-xs text-gray-400 border border-white/5 pointer-events-none">
             Vue Interactive • Read Only
           </div>
           
           <div className="w-full h-[50vh] lg:h-full">
             <ReactFlow
               nodes={nodes}
               edges={edges}
               onNodesChange={onNodesChange}
               onEdgesChange={onEdgesChange}
               fitView
               proOptions={{ hideAttribution: false }}
               minZoom={0.5}
               maxZoom={1.5}
             >
               <Background color="#333" gap={20} size={1} variant={BackgroundVariant.Dots} />
               <Controls showInteractive={false} />
             </ReactFlow>
           </div>
        </div>

        {/* COL 3: DOCUMENTATION & ACTIONS */}
        <div className="lg:col-span-1 bg-black flex flex-col h-full border-t lg:border-t-0 border-white/5">
          
          <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
            
            {/* Description */}
            <section>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Play size={18} className="text-brand-purple" />
                Comment ça marche ?
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Ce workflow automatise la prospection sur LinkedIn. Il détecte les nouveaux profils, extrait les données publiques via une requête HTTP sécurisée, utilise l'IA pour qualifier le lead selon vos critères, et sauvegarde le tout dans Google Sheets.
              </p>
            </section>

            {/* Steps */}
            <section>
              <h3 className="text-lg font-bold text-white mb-4">Configuration Requise</h3>
              <div className="space-y-4">
                {[
                  "Créez un compte Apollo.io ou Proxycurl pour l'API.",
                  "Récupérez votre clé API OpenAI (GPT-4 recommandé).",
                  "Connectez votre compte Google Sheets et créez une feuille vide.",
                  "Importez le JSON ci-dessous dans votre instance n8n."
                ].map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 text-white flex items-center justify-center text-xs font-bold border border-white/10">
                      {i + 1}
                    </div>
                    <p className="text-sm text-gray-400 pt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* JSON Preview - Scrollable & Full Content */}
            <section>
              <div className="flex items-center justify-between mb-3">
                 <h3 className="text-lg font-bold text-white flex items-center gap-2">
                   <FileJson size={18} className="text-gray-400" />
                   Code du Workflow
                 </h3>
                 <div className="flex gap-2">
                   <button 
                    onClick={handleCopyJson}
                    className="flex items-center gap-1.5 text-xs bg-white/5 hover:bg-white/10 text-gray-300 px-2 py-1 rounded transition-colors"
                   >
                     {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                     {copied ? 'Copié !' : 'Copier'}
                   </button>
                 </div>
              </div>
              
              <div className="bg-[#0f0f11] rounded-lg border border-white/5 font-mono text-xs text-gray-400 overflow-auto max-h-96 shadow-inner">
                <div className="p-4">
                  <pre className="whitespace-pre-wrap break-all">{JSON.stringify(WORKFLOW_JSON, null, 2)}</pre>
                </div>
              </div>
            </section>

          </div>

          {/* Sticky Actions Footer */}
          <div className="p-6 border-t border-white/10 bg-neutral-900/50 backdrop-blur-lg">
            <button 
              onClick={handleUseTemplate}
              className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white font-bold py-3.5 rounded-lg transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] flex items-center justify-center gap-2 group"
            >
              <span>Utiliser ce modèle</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-center text-[10px] text-gray-500 mt-3">
              Compatible avec n8n v1.0+ • Support inclus plan Pro
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default WorkflowDetail;