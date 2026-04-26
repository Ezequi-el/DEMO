// Mock service for UX/UI phase
export interface AnalysisResult {
  riskScore: number; // 0 to 1
  category: 'safe' | 'toxic' | 'grooming' | 'narco' | 'violent' | 'sexual' | 'scam' | 'hate_speech';
  status: 'safe' | 'warning' | 'blocked';
  message: string;
}

export async function analyzeVideoUrl(url: string): Promise<AnalysisResult> {
  console.log('Analyzing video:', url);
  return new Promise((resolve) => {
    setTimeout(() => {
      // Logic for random "danger" for demo purposes
      const random = Math.random();
      let status: 'safe' | 'warning' | 'blocked' = 'safe';
      let message = 'Video verificado por IA: Seguro';
      let category: AnalysisResult['category'] = 'safe';

      if (random > 0.8) {
        status = 'blocked';
        message = '¡BLOQUEADO POR SEGURIDAD! Contenido inapropiado detectado.';
        category = 'violent';
      } else if (random > 0.5) {
        status = 'warning';
        message = 'Análisis de IA: Neutral / Precaución.';
        category = 'safe';
      }

      resolve({
        riskScore: random,
        category,
        status,
        message
      });
    }, 500);
  });
}
