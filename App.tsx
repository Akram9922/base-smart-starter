import React, { useState } from 'react';
import { Header } from './components/Header';
import { BuilderAssistant } from './components/BuilderAssistant';
import { TransactionDemo } from './components/TransactionDemo';
import { AppTab } from './types';
import { LayoutDashboard, MessageSquareCode, Terminal } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.HOME);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC]">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome to Base</h2>
          <p className="text-slate-600 max-w-2xl">
            This starter kit is pre-configured with Wagmi v2, Tailwind CSS, and Gemini AI. 
            It is designed to fix common build errors related to experimental modules.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar / Navigation */}
          <div className="lg:col-span-3 space-y-2">
            <button
              onClick={() => setActiveTab(AppTab.HOME)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === AppTab.HOME 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-200'
              }`}
            >
              <LayoutDashboard size={20} />
              Overview
            </button>
            <button
              onClick={() => setActiveTab(AppTab.TRANSACTIONS)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === AppTab.TRANSACTIONS 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-200'
              }`}
            >
              <Terminal size={20} />
              Transactions
            </button>
            <button
              onClick={() => setActiveTab(AppTab.ASSISTANT)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === AppTab.ASSISTANT 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-200'
              }`}
            >
              <MessageSquareCode size={20} />
              AI Assistant
            </button>

            <div className="mt-8 p-4 bg-indigo-900 rounded-2xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>
                <div className="relative z-10">
                    <h4 className="font-bold mb-1">Need Help?</h4>
                    <p className="text-xs text-indigo-200 mb-3">Ask the AI Assistant to debug your smart contracts or configuration.</p>
                    <button 
                        onClick={() => setActiveTab(AppTab.ASSISTANT)}
                        className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors"
                    >
                        Open Chat
                    </button>
                </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9">
            {activeTab === AppTab.HOME && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Start</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                        <span className="text-slate-600 text-sm">Connect your Coinbase Wallet or any EOA.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                        <span className="text-slate-600 text-sm">Switch to Base Sepolia for testing or Base Mainnet for production.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                        <span className="text-slate-600 text-sm">Use the Transaction Demo to test standard Wagmi hooks.</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-md text-white">
                    <h3 className="text-lg font-bold mb-2">Build on Base</h3>
                    <p className="text-blue-100 text-sm mb-4">
                        Base is a secure, low-cost, developer-friendly Ethereum L2 built to bring the next billion users onchain.
                    </p>
                    <a href="https://docs.base.org" target="_blank" rel="noreferrer" className="inline-block px-4 py-2 bg-white text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors">
                        Read Docs
                    </a>
                </div>
                
                <div className="col-span-1 md:col-span-2">
                     <TransactionDemo />
                </div>
              </div>
            )}

            {activeTab === AppTab.TRANSACTIONS && (
               <div className="space-y-6">
                 <TransactionDemo />
                 {/* Placeholder for history or more complex interactions */}
               </div>
            )}

            {activeTab === AppTab.ASSISTANT && (
               <BuilderAssistant />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
