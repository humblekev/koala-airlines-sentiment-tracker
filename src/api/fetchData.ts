
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
  'Allcomments'?: string;
}

export async function fetchSentimentData(): Promise<SentimentData> {
  try {
    // Define the API URL
    const apiUrl = 'https://n8n-1-u40928.vm.elestio.app/webhook-test/46cf7941-6c47-435b-8711-1f9c83dec351';
    
    // Set up request options with no timeout limit
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify({
        requestTime: new Date().toISOString()
      }),
    };

    console.log('Sending request to API...', apiUrl);
    
    // Using an even longer timeout - 8 minutes to be safe
    const timeoutDuration = 480000; // 8 minutes in milliseconds
    
    let timeoutId: NodeJS.Timeout;
    
    // Create a promise for the timeout
    const timeoutPromise = new Promise<never>((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error('API request timed out after 8 minutes'));
      }, timeoutDuration);
    });
    
    // Fetch with proper error handling
    try {
      const fetchPromise = fetch(apiUrl, options);
      const response = await Promise.race([fetchPromise, timeoutPromise]) as Response;
      
      // Clear the timeout since we got a response
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const rawData = await response.json();
      console.log('Raw API response:', rawData);
      
      // Validate that we actually received data
      if (!rawData || typeof rawData !== 'object') {
        throw new Error('Invalid response format from API');
      }
      
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
        'Allcomments': rawData['Allcomments'] || '',
      };

      console.log('Normalized data:', normalizedData);
      return normalizedData;
    } catch (fetchError) {
      // Make sure to clear the timeout if fetch fails
      clearTimeout(timeoutId);
      throw fetchError;
    }
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
      'Allcomments': '',
    };
  }
}
