
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const analyzeNeckWrinkles = async (base64Image: string): Promise<AnalysisResult> => {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image.split(',')[1] || base64Image,
            },
          },
          {
            text: `당신은 유머러스하면서도 실력이 확실한 '스타 피부 분석가' AI입니다. 
제공된 목 사진을 보고 목주름의 깊이를 1~5단계로 분석해주세요. 

재미와 정보를 동시에 주기 위해 다음 형식을 엄격히 지켜주세요:
- level: 1(아기 목결) ~ 5(세월의 마스터) 사이
- nickname: 해당 단계를 표현하는 아주 기발하고 재미있는 별명 (예: "방금 태어난 도자기", "접힌 흔적의 미학", "중력과의 사투" 등)
- skinAge: 이미지 분석을 토대로 추정한 재미있는 '목 피부 나이'
- similarityEmoji: 단계를 잘 표현하는 아이콘/이모지 하나
- description: 전문적이면서도 살짝 위트 섞인 상태 설명
- advice: 지금 바로 실천할 수 있는 꿀팁
- careRoutine: 우리의 비장의 무기인 '펩타이드 크림'과 '히알루론산 패치'를 이 사람의 단계에 맞춰 어떻게 쓰면 '역전'이 가능한지 상세 설명

JSON 응답 필수.`
          },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          level: { type: Type.NUMBER },
          nickname: { type: Type.STRING },
          skinAge: { type: Type.NUMBER },
          similarityEmoji: { type: Type.STRING },
          description: { type: Type.STRING },
          advice: { type: Type.STRING },
          careRoutine: { type: Type.STRING },
        },
        required: ["level", "nickname", "skinAge", "similarityEmoji", "description", "advice", "careRoutine"],
      },
    },
  });

  const response = await model;
  const resultText = response.text;
  try {
    return JSON.parse(resultText);
  } catch (e) {
    throw new Error("AI가 너무 놀라운 사진을 보고 당황했습니다. 다시 시도해볼까요?");
  }
};
