
import React, { useRef } from 'react';

interface ImageUploaderProps {
  onImageSelected: (base64: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelected(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 bg-white rounded-[3rem] shadow-2xl border border-white mb-10 transition-all hover:-translate-y-1 relative">
      <div className="absolute top-0 right-10 -translate-y-1/2 w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center text-white shadow-lg animate-pulse">
        <i className="fa-solid fa-sparkles"></i>
      </div>

      <div className="w-24 h-24 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-full flex items-center justify-center mb-8 text-emerald-500 shadow-inner">
        <i className="fa-solid fa-camera-retro text-4xl"></i>
      </div>
      
      <h2 className="text-2xl font-black text-gray-900 mb-3">목 사진 분석하기</h2>
      <p className="text-gray-400 text-center mb-10 text-sm font-medium leading-relaxed px-4">
        턱을 살짝 들어올린 상태에서 <br/>
        정면의 목주름이 잘 보이게 찍어주세요!
      </p>
      
      <input 
        type="file" 
        accept="image/*" 
        capture="user"
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
      />
      
      <button 
        onClick={triggerUpload}
        className="w-full py-5 bg-emerald-500 text-white rounded-3xl font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-emerald-100 group"
      >
        <i className="fa-solid fa-camera group-hover:scale-110 transition-transform"></i>
        지금 분석 시작하기
      </button>
      
      <p className="mt-8 flex items-center gap-2 text-[10px] text-gray-300 font-bold uppercase tracking-widest">
        <i className="fa-solid fa-lock"></i>
        Your Privacy is Guaranteed
      </p>
    </div>
  );
};

export default ImageUploader;
