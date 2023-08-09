const headersContent={'Content-Type': 'application/json',}

class HttpClient {
    private baseUrl: string;
  
    constructor(baseUrl: string) {
      this.baseUrl = baseUrl;
    }

  //Get info fetch
    async get<Type>(endpoint: string): Promise<Type> {
      const response = await fetch(`${this.baseUrl}${endpoint}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json() as Promise<Type>;
    }

  //Add new array fetch
    async post<Type>(endpoint: string, data: any): Promise<Type> {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers:headersContent,
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json() as Promise<Type>;
    }

  //Update Fetch
    async put<Type>(endpoint: string, data: any): Promise<Type> {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'PUT',
        headers:headersContent,
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json() as Promise<Type>;
    }

  //Delete fetch
    async delete<Type>(endpoint: string): Promise<Type> {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json() as Promise<Type>;
    }
    
  }
  
  export default HttpClient;