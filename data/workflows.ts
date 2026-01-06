import React from 'react';
import { Zap, Mail, FileText, Users, BarChart3, Globe } from 'lucide-react';

export interface Workflow {
  id: number;
  title: string;
  category: string;
  description: string;
  icon: React.ElementType;
  timeSaved: string;
}

export const categories = ["Tout", "Vente", "Productivité", "Juridique", "RH", "Finance", "Marketing"];

export const workflows: Workflow[] = [
  { id: 1, title: "Scraping & Enrichissement LinkedIn", category: "Vente", description: "Extrayez des leads qualifiés et enrichissez automatiquement leurs profils via Apollo.io.", icon: Globe, timeSaved: "5h/semaine" },
  { id: 2, title: "Tri d'Emails Intelligent par IA", category: "Productivité", description: "L'IA analyse vos emails entrants, les classe, et prépare des brouillons de réponse.", icon: Mail, timeSaved: "3h/semaine" },
  { id: 3, title: "Génération de Contrats Auto", category: "Juridique", description: "Créez des contrats PDF personnalisés depuis un formulaire Typeform et envoyez-les pour signature.", icon: FileText, timeSaved: "8h/semaine" },
  { id: 4, title: "Onboarding Employé Automatisé", category: "RH", description: "Création de comptes (Slack, Notion, Gmail) et envoi du matériel de formation au nouvel arrivant.", icon: Users, timeSaved: "4h/recrue" },
  { id: 5, title: "Reporting Financier Hebdomadaire", category: "Finance", description: "Consolidation automatique des données Stripe et factures dans un dashboard Notion.", icon: BarChart3, timeSaved: "2h/semaine" },
  { id: 6, title: "Publication Social Media Cross-Platform", category: "Marketing", description: "Transformez un article de blog en posts LinkedIn, Twitter et Instagram automatiquement.", icon: Zap, timeSaved: "6h/semaine" },
];