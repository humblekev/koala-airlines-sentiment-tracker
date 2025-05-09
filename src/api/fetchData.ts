
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
    const apiUrl = 'https://n8n-1-u40928.vm.elestio.app/webhook/46cf7941-6c47-435b-8711-1f9c83dec351';
    
    // Add a unique timestamp to prevent caching issues
    const timestamp = new Date().getTime();
    const urlWithTimestamp = `${apiUrl}?t=${timestamp}`;
    
    console.log('Sending request to API with timestamp:', urlWithTimestamp);
    
    // Set up request options with stronger cache control
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
      body: JSON.stringify({
        requestTime: new Date().toISOString(),
        deviceInfo: {
          platform: navigator.platform,
          userAgent: navigator.userAgent,
          timestamp: timestamp
        }
      }),
    };
    
    // Using a reasonable timeout - 60 seconds
    const timeoutDuration = 60000;
    
    let timeoutId: NodeJS.Timeout;
    
    // Create a promise for the timeout
    const timeoutPromise = new Promise<never>((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error('API request timed out after 60 seconds'));
      }, timeoutDuration);
    });
    
    // Fetch with proper error handling and ensure it works on mobile
    try {
      // Use AbortController to ensure fetch can be properly aborted on timeout
      const controller = new AbortController();
      const signal = controller.signal;
      
      const fetchOptions = {
        ...options,
        signal,
        // Ensure these settings work on mobile browsers
        mode: 'cors' as RequestMode,
        credentials: 'omit' as RequestCredentials,
      };
      
      console.log('Fetch options:', JSON.stringify(fetchOptions, (key, value) => 
        key === 'signal' ? '[AbortSignal]' : value
      ));
      
      const fetchPromise = fetch(urlWithTimestamp, fetchOptions);
      
      // Clear timeout on successful completion
      const clearTimeoutAndReturn = (response: Response) => {
        clearTimeout(timeoutId);
        console.log('Response received, status:', response.status);
        return response;
      };
      
      const response = await Promise.race([
        fetchPromise.then(clearTimeoutAndReturn),
        timeoutPromise
      ]) as Response;
      
      // When timeout occurs, abort the fetch to free resources
      timeoutPromise.catch(() => {
        controller.abort();
        console.error('Request aborted due to timeout');
      });
      
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
      console.error('Fetch error details:', fetchError);
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
