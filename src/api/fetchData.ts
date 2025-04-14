
import { SentimentType } from '@/components/SentimentCard';

interface SentimentData {
  'pre-flight-sentiment': string;
  'pre-flight-feedback': string[];
  'in-flight-sentiment': string;
  'in-flight-feedback': string[];
  'post-flight-sentiment': string;
  'post-flight-feedback': string[];
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

    const data = await response.json();
    return data;
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
    };
  }
}
