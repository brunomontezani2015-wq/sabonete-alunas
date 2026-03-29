import React, { useState, useEffect } from 'react';
import { X, Plus, Info } from 'lucide-react';

interface Material {
  id: string;
  name: string;
  cost: number;
  quantity: number;
}

interface PricingCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PricingCalculatorModal({ isOpen, onClose }: PricingCalculatorModalProps) {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [newMaterialName, setNewMaterialName] = useState('');
  const [newMaterialCost, setNewMaterialCost] = useState('');
  const [newMaterialQty, setNewMaterialQty] = useState('1');

  const [hourlyRate, setHourlyRate] = useState('10');
  const [hoursWorked, setHoursWorked] = useState('6.5');
  
  const [packagingCost, setPackagingCost] = useState('9.5');
  const [otherCosts, setOtherCosts] = useState('4');
  
  const [profitMargin, setProfitMargin] = useState('50');

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddMaterial = () => {
    if (!newMaterialName || !newMaterialCost || !newMaterialQty) return;
    
    const cost = parseFloat(newMaterialCost.replace(',', '.'));
    const qty = parseFloat(newMaterialQty.replace(',', '.'));
    
    if (isNaN(cost) || isNaN(qty)) return;

    setMaterials([
      ...materials,
      {
        id: Math.random().toString(36).substr(2, 9),
        name: newMaterialName,
        cost,
        quantity: qty
      }
    ]);
    
    setNewMaterialName('');
    setNewMaterialCost('');
    setNewMaterialQty('1');
  };

  const handleRemoveMaterial = (id: string) => {
    setMaterials(materials.filter(m => m.id !== id));
  };

  // Calculations
  const totalMaterials = materials.reduce((acc, curr) => acc + (curr.cost * curr.quantity), 0);
  
  const rate = parseFloat(hourlyRate.replace(',', '.')) || 0;
  const hours = parseFloat(hoursWorked.replace(',', '.')) || 0;
  const totalLabor = rate * hours;
  
  const packCost = parseFloat(packagingCost.replace(',', '.')) || 0;
  const other = parseFloat(otherCosts.replace(',', '.')) || 0;
  const totalExtras = packCost + other;
  
  const totalCost = totalMaterials + totalLabor + totalExtras;
  
  const margin = parseFloat(profitMargin.replace(',', '.')) || 0;
  // Suggested Price = Total Cost / (1 - Margin/100) or Total Cost * (1 + Margin/100)?
  // Standard markup: Cost * (1 + margin/100)
  // Standard margin: Cost / (1 - margin/100)
  // Let's use markup (Cost + Margin%) as it's more common for simple calculators, but let's check the wording.
  // "Vendendo por este valor, seu lucro líquido será de R$ X (além do valor da sua mão de obra)."
  // If Suggested Price = Total Cost + (Total Cost * Margin/100)
  // Profit = Suggested Price - Total Cost = Total Cost * Margin/100
  const suggestedPrice = totalCost * (1 + margin / 100);
  const netProfit = suggestedPrice - totalCost;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 shrink-0">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
              <span className="text-2xl">📊</span> Calculadora de Precificação
            </h2>
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Calcule o preço ideal para suas peças considerando o custo dos materiais, seu tempo de trabalho e a margem de lucro desejada.
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* Materiais Utilizados */}
          <div className="bg-[#f9f8f6] border border-[#e8e4dc] rounded-2xl p-5">
            <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4 text-sm">
              <span className="text-blue-500">🧵</span> Materiais Utilizados
            </h3>
            
            <div className="flex flex-wrap sm:flex-nowrap gap-2 items-end">
              <div className="flex-1 min-w-[120px]">
                <label className="block text-xs text-gray-500 mb-1.5">Nome do Material</label>
                <input 
                  type="text" 
                  placeholder="Ex"
                  value={newMaterialName}
                  onChange={(e) => setNewMaterialName(e.target.value)}
                  className="w-full bg-transparent border border-[#e0dcd3] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
                />
              </div>
              <div className="w-24">
                <label className="block text-xs text-gray-500 mb-1.5">Custo (R$)</label>
                <input 
                  type="number" 
                  placeholder="0.00"
                  value={newMaterialCost}
                  onChange={(e) => setNewMaterialCost(e.target.value)}
                  className="w-full bg-transparent border border-[#e0dcd3] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
                />
              </div>
              <div className="w-16">
                <label className="block text-xs text-gray-500 mb-1.5">Qtd</label>
                <input 
                  type="number" 
                  value={newMaterialQty}
                  onChange={(e) => setNewMaterialQty(e.target.value)}
                  className="w-full bg-transparent border border-[#e0dcd3] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
                />
              </div>
              <button 
                onClick={handleAddMaterial}
                className="bg-[#2a2a2a] hover:bg-black text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-1 transition-colors h-[38px]"
              >
                <Plus size={16} /> Add
              </button>
            </div>

            {materials.length > 0 && (
              <div className="mt-4 space-y-2">
                {materials.map(material => (
                  <div key={material.id} className="flex justify-between items-center bg-white border border-[#e8e4dc] p-2.5 rounded-lg text-sm">
                    <span className="text-gray-700 font-medium">{material.name} <span className="text-gray-400 font-normal">x{material.quantity}</span></span>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-900 font-bold">{formatCurrency(material.cost * material.quantity)}</span>
                      <button onClick={() => handleRemoveMaterial(material.id)} className="text-red-400 hover:text-red-600">
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Mão de Obra */}
            <div className="bg-[#f9f8f6] border border-[#e8e4dc] rounded-2xl p-5">
              <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4 text-sm">
                <span className="text-gray-500">⏱️</span> Mão de Obra
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Valor da sua Hora (R$)</label>
                  <input 
                    type="number" 
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className="w-full bg-transparent border border-[#e0dcd3] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Horas Trabalhadas na Peça</label>
                  <input 
                    type="number" 
                    value={hoursWorked}
                    onChange={(e) => setHoursWorked(e.target.value)}
                    className="w-full bg-transparent border border-[#e0dcd3] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Custos Extras */}
            <div className="bg-[#f9f8f6] border border-[#e8e4dc] rounded-2xl p-5">
              <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4 text-sm">
                <span className="text-green-500">💲</span> Custos Extras
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Embalagem (R$)</label>
                  <input 
                    type="number" 
                    value={packagingCost}
                    onChange={(e) => setPackagingCost(e.target.value)}
                    className="w-full bg-transparent border border-[#e0dcd3] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Outros Custos (Frete, Taxas) (R$)</label>
                  <input 
                    type="number" 
                    value={otherCosts}
                    onChange={(e) => setOtherCosts(e.target.value)}
                    className="w-full bg-transparent border border-[#e0dcd3] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Resumo da Precificação */}
          <div className="bg-[#2a2a2a] rounded-2xl p-6 text-white mt-2">
            <h3 className="font-bold text-lg mb-4 underline decoration-white underline-offset-4">Resumo da Precificação</h3>
            
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between items-center text-gray-100">
                <span className="font-medium">Materiais:</span>
                <span className="text-white font-bold">{formatCurrency(totalMaterials)}</span>
              </div>
              <div className="flex justify-between items-center text-gray-100">
                <span className="font-medium">Mão de Obra:</span>
                <span className="text-white font-bold">{formatCurrency(totalLabor)}</span>
              </div>
              <div className="flex justify-between items-center text-gray-100">
                <span className="font-medium">Embalagem & Outros:</span>
                <span className="text-white font-bold">{formatCurrency(totalExtras)}</span>
              </div>
            </div>

            <div className="border-t border-gray-600 pt-3 mb-5 flex justify-between items-center">
              <span className="font-bold">Custo Total:</span>
              <span className="font-bold">{formatCurrency(totalCost)}</span>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-bold mb-2">Margem de Lucro (%)</label>
              <input 
                type="number" 
                value={profitMargin}
                onChange={(e) => setProfitMargin(e.target.value)}
                className="w-full bg-[#3a3a3a] border border-gray-600 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-gray-400"
              />
            </div>

            <div className="bg-[#346b45] rounded-xl p-4 text-center mb-4">
              <div className="text-sm font-bold text-green-100 mb-1">Preço Sugerido para Venda</div>
              <div className="text-3xl font-black">{formatCurrency(suggestedPrice)}</div>
            </div>

            <div className="bg-[#3a3a3a] rounded-xl p-3 flex items-start gap-2 text-xs text-gray-200">
              <div className="w-4 h-4 rounded-sm bg-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                <Info size={10} className="text-white" />
              </div>
              <p>
                Vendendo por este valor, seu lucro líquido será de <span className="text-green-400 font-bold">{formatCurrency(netProfit)}</span> (além do valor da sua mão de obra).
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
