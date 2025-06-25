import { ApiGateway, ApiConfig } from '../../../../bff/services/gateway';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ApiGateway', () => {
  let gateway: ApiGateway;
  let mockAxiosInstance: any;

  const mockConfig: ApiConfig = {
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    headers: { 'Authorization': 'Bearer token' }
  };

  beforeEach(() => {
    mockAxiosInstance = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      patch: jest.fn(),
      interceptors: {
        response: {
          use: jest.fn()
        }
      }
    };

    mockedAxios.create.mockReturnValue(mockAxiosInstance);
    gateway = new ApiGateway(mockConfig);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create axios instance with correct config', () => {
      expect(mockedAxios.create).toHaveBeenCalledWith({
        baseURL: 'http://localhost:3000',
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer token'
        }
      });
    });

    it('should use default timeout when not provided', () => {
      const configWithoutTimeout: ApiConfig = {
        baseURL: 'http://localhost:3000'
      };
      
      new ApiGateway(configWithoutTimeout);
      
      expect(mockedAxios.create).toHaveBeenCalledWith({
        baseURL: 'http://localhost:3000',
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    });
  });

  describe('GET method', () => {
    it('should make successful GET request', async () => {
      const mockResponse = {
        data: { id: 1, name: 'test' },
        status: 200,
        statusText: 'OK'
      };

      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await gateway.get('/test');

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/test', undefined);
      expect(result).toEqual({
        data: { id: 1, name: 'test' },
        status: 200,
        statusText: 'OK'
      });
    });

    it('should make GET request with config', async () => {
      const mockResponse = {
        data: { id: 1, name: 'test' },
        status: 200,
        statusText: 'OK'
      };

      mockAxiosInstance.get.mockResolvedValue(mockResponse);
      const config = { headers: { 'Custom-Header': 'value' } };

      await gateway.get('/test', config);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/test', config);
    });
  });

  describe('POST method', () => {
    it('should make successful POST request', async () => {
      const mockResponse = {
        data: { id: 1, name: 'created' },
        status: 201,
        statusText: 'Created'
      };

      mockAxiosInstance.post.mockResolvedValue(mockResponse);
      const postData = { name: 'test' };

      const result = await gateway.post('/test', postData);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/test', postData, undefined);
      expect(result).toEqual({
        data: { id: 1, name: 'created' },
        status: 201,
        statusText: 'Created'
      });
    });
  });

  describe('PUT method', () => {
    it('should make successful PUT request', async () => {
      const mockResponse = {
        data: { id: 1, name: 'updated' },
        status: 200,
        statusText: 'OK'
      };

      mockAxiosInstance.put.mockResolvedValue(mockResponse);
      const putData = { name: 'updated' };

      const result = await gateway.put('/test/1', putData);

      expect(mockAxiosInstance.put).toHaveBeenCalledWith('/test/1', putData, undefined);
      expect(result).toEqual({
        data: { id: 1, name: 'updated' },
        status: 200,
        statusText: 'OK'
      });
    });
  });

  describe('DELETE method', () => {
    it('should make successful DELETE request', async () => {
      const mockResponse = {
        data: null,
        status: 204,
        statusText: 'No Content'
      };

      mockAxiosInstance.delete.mockResolvedValue(mockResponse);

      const result = await gateway.delete('/test/1');

      expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/test/1', undefined);
      expect(result).toEqual({
        data: null,
        status: 204,
        statusText: 'No Content'
      });
    });
  });

  describe('PATCH method', () => {
    it('should make successful PATCH request', async () => {
      const mockResponse = {
        data: { id: 1, name: 'patched' },
        status: 200,
        statusText: 'OK'
      };

      mockAxiosInstance.patch.mockResolvedValue(mockResponse);
      const patchData = { name: 'patched' };

      const result = await gateway.patch('/test/1', patchData);

      expect(mockAxiosInstance.patch).toHaveBeenCalledWith('/test/1', patchData, undefined);
      expect(result).toEqual({
        data: { id: 1, name: 'patched' },
        status: 200,
        statusText: 'OK'
      });
    });
  });

  describe('error handling', () => {
    it('should handle axios errors', async () => {
      const error = new Error('Network error');
      
      mockAxiosInstance.get.mockRejectedValue(error);

      await expect(gateway.get('/test')).rejects.toThrow('Network error');
    });

    it('should handle axios errors with response data', async () => {
      const error = {
        response: {
          data: { message: 'Server error' }
        }
      };
      
      mockAxiosInstance.get.mockRejectedValue(error);

      await expect(gateway.get('/test')).rejects.toEqual(error);
    });
  });
}); 