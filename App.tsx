import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ResultCard from './components/ResultCard';
import { AnalysisResult, AppState } from './types';
import { analyzeNeckWrinkles } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loadingMsg, setLoadingMsg] = useState("콜라겐 조직 스캔 중...");

  const loadingMessages = [
    "콜라겐 조직 스캔 중...",
    "중력의 흔적 측정 중...",
    "피부 탄력 알고리즘 가동...",
    "전문의 AI 의견 청취 중...",
    "맞춤형 솔루션 조합 중...",
  ];

  useEffect(() => {
    let interval: any;
    if (state === AppState.LOADING) {
      let idx = 0;
      interval = setInterval(() => {
        idx = (idx + 1) % loadingMessages.length;
        setLoadingMsg(loadingMessages[idx]);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [state]);

  const handleImageSelected = async (base64: string) => {
    setSelectedImage(base64);
    setState(AppState.LOADING);
    setError(null);

    try {
      const analysis = await analyzeNeckWrinkles(base64);
      setResult(analysis);
      setState(AppState.RESULT);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "분석 중 예기치 못한 상황이 발생했습니다.");
      setState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setState(AppState.IDLE);
    setResult(null);
    setError(null);
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen gradient-bg pb-20">
      <Header />
      
      <main className="max-w-xl mx-auto px-6 pt-32">
        {state === AppState.IDLE && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-1000">
            <div className="text-center mb-10">
              <div className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-emerald-100 shadow-sm">
                Neck Skin Diagnostic
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-5 leading-tight tracking-tight">
                나의 목주름 단계는? <br/>
                <span className="wadiz-color">전문 진단기</span>
              </h2>
              <p className="text-gray-500 text-sm font-medium">
                단 3초면 끝나는 목 피부 정밀 분석. <br/>
                지금 바로 당신의 '목 나이'를 확인해보세요!
              </p>
            </div>
            
            <ImageUploader onImageSelected={handleImageSelected} />
            
            <div className="mt-12 grid grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm text-emerald-500 transition-transform hover:scale-110">
                  <i className="fa-solid fa-bolt-lightning text-xl"></i>
                </div>
                <div className="text-[10px] font-bold text-gray-400">초고속 분석</div>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm text-blue-500 transition-transform hover:scale-110">
                  <i className="fa-solid fa-fingerprint text-xl"></i>
                </div>
                <div className="text-[10px] font-bold text-gray-400">맞춤 솔루션</div>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm text-amber-500 transition-transform hover:scale-110">
                  <i className="fa-solid fa-shield-halved text-xl"></i>
                </div>
                <div className="text-[10px] font-bold text-gray-400">데이터 보안</div>
              </div>
            </div>
          </div>
        )}

        {state === AppState.LOADING && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative mb-10">
               <div className="w-56 h-56 rounded-[3rem] overflow-hidden border-4 border-white shadow-2xl relative">
                <img 
                  src={selectedImage!} 
                  alt="Analyzing" 
                  className="w-full h-full object-cover grayscale opacity-80" 
                />
                <div className="absolute inset-x-0 h-1 bg-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white animate-bounce">
                <i className="fa-solid fa-dna text-white text-3xl"></i>
              </div>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">{loadingMsg}</h3>
            <p className="text-sm text-gray-500 text-center font-medium">
              당신의 목주름 결을 따라 <br/> 정밀 렌더링을 진행하고 있습니다.
            </p>
            
            <style>{`
              @keyframes scan {
                0%, 100% { top: 0; }
                50% { top: 100%; }
              }
            `}</style>
          </div>
        )}

        {state === AppState.RESULT && result && (
          <ResultCard result={result} onReset={handleReset} />
        )}

        {state === AppState.ERROR && (
          <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl text-center border-4 border-red-50">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <i className="fa-solid fa-face-sad-tear text-4xl"></i>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-3">앗! 문제가 생겼어요</h3>
            <p className="text-gray-500 mb-10 font-medium leading-relaxed">{error}</p>
            <button 
              onClick={handleReset}
              className="w-full py-5 bg-gray-900 text-white rounded-3xl font-black text-lg shadow-xl shadow-gray-200 transition-all active:scale-95"
            >
              다시 시도해볼까요?
            </button>
          </div>
        )}
      </main>
      
      <footer className="mt-8 text-center text-[10px] text-gray-400">
        <p>© 2026 Neck tension home care Lab. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default App;