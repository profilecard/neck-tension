
import React from 'react';
import { AnalysisResult } from '../types';

interface ResultCardProps {
  result: AnalysisResult;
  onReset: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, onReset }) => {
  const levelColors: Record<number, string> = {
    1: 'bg-gradient-to-br from-green-400 to-emerald-600',
    2: 'bg-gradient-to-br from-cyan-400 to-blue-600',
    3: 'bg-gradient-to-br from-yellow-400 to-orange-500',
    4: 'bg-gradient-to-br from-orange-500 to-red-500',
    5: 'bg-gradient-to-br from-red-600 to-purple-700',
  };

  const levelLabels = ["완벽한 평야", "잔잔한 파도", "눈에 띄는 골", "깊은 골짜기", "대자연의 나이테"];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10">
      {/* Level Visual Card */}
      <div className={`${levelColors[result.level]} rounded-[2.5rem] shadow-2xl p-8 text-white mb-6 relative overflow-hidden`}>
        <div className="absolute -right-10 -top-10 text-[10rem] opacity-20 pointer-events-none">
          {result.similarityEmoji}
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
              Neck Scan Result
            </span>
          </div>
          
          <h2 className="text-4xl font-black mb-1 drop-shadow-md">
            {result.nickname}
          </h2>
          <p className="text-white/80 font-medium mb-6">단계: {result.level}레벨 ({levelLabels[result.level - 1]})</p>
          
          <div className="flex gap-4 items-center bg-black/10 backdrop-blur-sm p-4 rounded-3xl border border-white/10">
            <div className="text-center flex-1">
              <div className="text-[10px] text-white/60 font-bold uppercase">Estimated Skin Age</div>
              <div className="text-2xl font-black">{result.skinAge}세</div>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="text-center flex-1">
              <div className="text-[10px] text-white/60 font-bold uppercase">Status</div>
              <div className="text-sm font-bold">{result.similarityEmoji} 관찰됨</div>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Details */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
          <h3 className="text-xs font-black text-gray-400 mb-3 flex items-center gap-2 uppercase tracking-tighter">
            <i className="fa-solid fa-microscope text-blue-500"></i> AI 분석 리포트
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
            {result.description}
          </p>
        </div>
        
        <div className="bg-amber-50 p-6 rounded-[2rem] border border-amber-100">
          <h3 className="text-xs font-black text-amber-600 mb-3 flex items-center gap-2 uppercase tracking-tighter">
            <i className="fa-solid fa-wand-magic-sparkles"></i> 긴급 처방전
          </h3>
          <p className="text-amber-900 text-sm leading-relaxed">
            {result.advice}
          </p>
        </div>
      </div>

      {/* Product Guide - More Fun & Interactive Visuals */}
      <div className="bg-white rounded-[2.5rem] shadow-xl p-8 border-2 border-emerald-500/20 mb-8 overflow-hidden relative">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-black text-gray-900 leading-tight">
              주름 역전 2단계 루틴 <br/>
              <span className="text-emerald-500 font-black">지금 바로 시작하세요</span>
            </h3>
          </div>
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 animate-bounce">
            <i className="fa-solid fa-arrow-down text-2xl"></i>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 to-emerald-100"></div>
          
          <div className="space-y-8">
            <div className="relative pl-14">
              <div className="absolute left-0 w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200 z-10">
                <i className="fa-solid fa-droplet text-xl"></i>
              </div>
              <h4 className="font-black text-gray-900 mb-1">Step 1: 펩타이드 크림 (기초 공사)</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                {result.careRoutine.includes('1단계') ? result.careRoutine.split('1단계')[1]?.split('2단계')[0] : "주름 깊숙이 펩타이드 성분이 침투하도록 목 아래에서 위로 쓸어올리듯 마사지하며 발라주세요."}
              </p>
            </div>

            <div className="relative pl-14">
              <div className="absolute left-0 w-12 h-12 bg-emerald-300 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-100 z-10">
                <i className="fa-solid fa-layer-group text-xl"></i>
              </div>
              <h4 className="font-black text-gray-900 mb-1">Step 2: 히알루론산 패치 (강력 봉인)</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                {result.careRoutine.includes('2단계') ? result.careRoutine.split('2단계')[1] : "크림 위에 패치를 밀착시켜 수분 증발을 막고 탄력을 꽉 잡아주세요. 밤사이 몰라보게 달라집니다."}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md">
              <img src="https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=200" alt="Product" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Wadiz Exclusive</p>
              <p className="text-gray-900 font-bold text-sm leading-snug">
                와디즈 펀딩 1위 넥케어 세트 <br/> 펩타이드 크림 & 패치 패키지
              </p>
            </div>
          </div>

          <a 
            href="https://www.wadiz.kr/web/wcomingsoon/rwd/362833" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group block w-full py-5 wadiz-bg text-white text-center rounded-3xl font-black text-lg shadow-xl shadow-emerald-100 transition-all hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-3"
          >
            슈퍼 얼리버드 혜택 받기
            <i className="fa-solid fa-chevron-right group-hover:translate-x-1 transition-transform"></i>
          </a>
        </div>
      </div>

      <button 
        onClick={onReset}
        className="w-full py-4 text-gray-400 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:text-gray-600 transition-colors"
      >
        <i className="fa-solid fa-camera-rotate"></i>
        다시 분석하러 가기
      </button>
    </div>
  );
};

export default ResultCard;
