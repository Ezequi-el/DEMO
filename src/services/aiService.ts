// Mock service for UX/UI phase
export interface AnalysisResult {
  riskScore: number; // 0 to 1
  category: 'safe' | 'toxic' | 'grooming' | 'narco' | 'violent' | 'sexual' | 'scam' | 'hate_speech';
  status: 'safe' | 'warning' | 'blocked';
  message: string;
}

export async function analyzeContent(text: string): Promise<AnalysisResult> {
  console.log('Simulating analysis for:', text);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        riskScore: 0.1,
        category: 'safe',
        status: 'safe',
        message: 'Contenido verificado por el sistema local.'
      });
    }, 300);
  });
}
