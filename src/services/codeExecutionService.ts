import axios from 'axios';

const PROXY_API_URL = 'http://localhost:3001/api/execute';

interface CodeRunnerRequest {
  clientId: string;
  clientSecret: string;
  script: string;
  language: string;
  stdin?: string;
}

interface CodeRunnerResponse {
  output: string;
  statusCode: number;
  memory: string;
  cpuTime: string;
}

export const executeCode = async (code: string, language: string, input?: string): Promise<string> => {
  try {

    const response = await axios.post<CodeRunnerResponse>(
      PROXY_API_URL,
      {
        code,
        language,
        input
      },
      {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const result = response.data;
    
    if (result.statusCode !== 200) {
      throw new Error(`Execution failed with status code ${result.statusCode}`);
    }

    return result.output || 'No output generated';
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout: The API server took too long to respond');
      }
      if (!error.response) {
        throw new Error('Network error: Unable to connect to the JDoodle API');
      }
      throw new Error(`API Error: ${error.response?.data?.error || error.message}`);
    }
    throw error;
  }
};