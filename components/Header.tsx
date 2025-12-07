import React from 'react';
import { useAccount, useDisconnect, useConnect } from 'wagmi';
import { Wallet, LogOut, Zap } from 'lucide-react';

export const Header: React.FC = () => {
  const { address, isConnected, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const { connectors, connect } = useConnect();

  // Prefer Coinbase Wallet
  const handleConnect = () => {
    const connector = connectors.find(c => c.name === 'Coinbase Wallet') || connectors[0];
    connect({ connector });
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
          <Zap size={24} fill="currentColor" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Base Smart Starter</h1>
          <p className="text-xs text-slate-500 font-medium">Build on L2</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {isConnected ? (
          <div className="flex items-center gap-3 bg-slate-100 rounded-full px-4 py-2 border border-slate-200">
             <div className="flex flex-col items-end">
                <span className="text-sm font-semibold text-slate-900">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
                <span className="text-xs text-slate-500">
                    {chain?.name || 'Unknown Chain'}
                </span>
             </div>
             <button 
                onClick={() => disconnect()}
                className="p-2 bg-white rounded-full hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors border border-slate-200"
                title="Disconnect"
             >
                <LogOut size={16} />
             </button>
          </div>
        ) : (
          <button
            onClick={handleConnect}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <Wallet size={18} />
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
};
