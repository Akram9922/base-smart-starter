import React from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { Activity, CheckCircle, XCircle, ArrowRight, Loader2 } from 'lucide-react';

export const TransactionDemo: React.FC = () => {
  const { isConnected, chainId } = useAccount();
  const { data: hash, isPending, writeContract, error: writeError } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const handleMint = () => {
    // This is a demo transaction. In a real app, this would be your contract ABI.
    // For safety in this starter, we won't execute a real transaction unless configured,
    // but this shows the correct pattern to avoid the 'wagmi/experimental' error.
    
    // Example: Sending 0 ETH to self (Self-transfer) as a test
    // In Wagmi v2, we use writeContract with a generic request for ETH transfers or contract calls.
    // NOTE: This demo simulates a contract interaction structure.
    
    if (!isConnected) return;

    alert("This is a demo button. In the code, verify the contract address and ABI.");

    // Uncomment to enable real transaction simulation
    /*
    writeContract({
      address: '0x...', // Your Contract Address
      abi: [...], // Your Contract ABI
      functionName: 'mint',
      args: [],
    })
    */
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
          <Activity size={24} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Transaction Demo</h3>
          <p className="text-sm text-slate-500">Test standard Wagmi v2 hooks</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
            <h4 className="text-sm font-semibold text-amber-800 mb-1">Build Fix Explanation</h4>
            <p className="text-xs text-amber-700 leading-relaxed">
                The error <code>Module not found: Can't resolve 'wagmi/experimental'</code> occurs when using deprecated or moved imports.
                This starter uses <code>useWriteContract</code> from the main <code>wagmi</code> package, which is stable and supported on Vercel deployments.
            </p>
        </div>

        <div className="flex flex-col gap-2">
            <button
                onClick={handleMint}
                disabled={!isConnected || isPending}
                className={`
                    w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all
                    ${!isConnected 
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg active:scale-95'}
                `}
            >
                {isPending ? (
                    <>
                        <Loader2 size={18} className="animate-spin" />
                        Confirm in Wallet...
                    </>
                ) : (
                    <>
                        Execute Transaction
                        <ArrowRight size={18} />
                    </>
                )}
            </button>
            {!isConnected && (
                <p className="text-center text-xs text-red-500 font-medium">Please connect wallet first</p>
            )}
        </div>

        {hash && (
            <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Transaction Hash:</span>
                    <a 
                        href={`https://basescan.org/tx/${hash}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-blue-600 hover:underline font-mono"
                    >
                        {hash.slice(0, 10)}...
                    </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-500">Status:</span>
                    {isConfirming && <span className="text-amber-500 flex items-center gap-1"><Loader2 size={12} className="animate-spin"/> Confirming...</span>}
                    {isConfirmed && <span className="text-emerald-600 flex items-center gap-1"><CheckCircle size={14}/> Confirmed</span>}
                </div>
            </div>
        )}
        
        {writeError && (
             <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2 text-sm text-red-700">
                <XCircle size={16} className="mt-0.5 flex-shrink-0" />
                <span>{writeError.message}</span>
             </div>
        )}
      </div>
    </div>
  );
};
