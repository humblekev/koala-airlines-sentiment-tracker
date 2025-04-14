
import { SentimentType } from '@/components/SentimentCard';

interface SentimentData {
  'Pre-flight-sentiment'?: string;
  'Pre-flight-feedback'?: string | string[];
  'In-flight-sentiment'?: string;
  'In-flight-feedback'?: string | string[];
  'Post-flight-sentiment'?: string;
  'Post-flight-feedback'?: string | string[];
  'pre-flight-sentiment'?: string;
  'pre-flight-feedback'?: string[];
  'in-flight-sentiment'?: string;
  'in-flight-feedback'?: string[];
  'post-flight-sentiment'?: string;
  'post-flight-feedback'?: string[];
  'Total'?: number | string;
  'total'?: number | string;
}

export async function fetchSentimentData(): Promise<SentimentData> {
  try {
    const response = await fetch('https://mindsmerge.app.n8n.cloud/webhook-test/4c157b62-6a67-4856-a4c9-96d6381c674f', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requestTime: new Date().toISOString()
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const rawData = await response.json();
    console.log('Raw API response:', rawData);
    
    // Normalize the data format
    const normalizedData = {
      'pre-flight-sentiment': rawData['Pre-flight-sentiment'] || rawData['pre-flight-sentiment'] || '',
      'pre-flight-feedback': Array.isArray(rawData['Pre-flight-feedback'] || rawData['pre-flight-feedback']) 
        ? rawData['Pre-flight-feedback'] || rawData['pre-flight-feedback'] 
        : [rawData['Pre-flight-feedback'] || rawData['pre-flight-feedback'] || ''],
      'in-flight-sentiment': rawData['In-flight-sentiment'] || rawData['in-flight-sentiment'] || '',
      'in-flight-feedback': Array.isArray(rawData['In-flight-feedback'] || rawData['in-flight-feedback'])
        ? rawData['In-flight-feedback'] || rawData['in-flight-feedback']
        : [rawData['In-flight-feedback'] || rawData['in-flight-feedback'] || ''],
      'post-flight-sentiment': rawData['Post-flight-sentiment'] || rawData['post-flight-sentiment'] || '',
      'post-flight-feedback': Array.isArray(rawData['Post-flight-feedback'] || rawData['post-flight-feedback'])
        ? rawData['Post-flight-feedback'] || rawData['post-flight-feedback']
        : [rawData['Post-flight-feedback'] || rawData['post-flight-feedback'] || ''],
      'Total': rawData['Total'] || rawData['total'] || 0,
    };

    console.log('Normalized data:', normalizedData);
    return normalizedData;
  } catch (error) {
    console.error('Error fetching sentiment data:', error);
    // Return default empty data on error
    return {
      'pre-flight-sentiment': '',
      'pre-flight-feedback': [],
      'in-flight-sentiment': '',
      'in-flight-feedback': [],
      'post-flight-sentiment': '',
      'post-flight-feedback': [],
      'Total': 0,
    };
  }
}
