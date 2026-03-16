import { apiClient } from './client';

// Definimos la estructura de las respuestas esperadas para tener autocompletado y seguridad
export interface DownloadResponse {
  downloadId: string;
  message: string;
}

export interface StatusResponse {
  downloadId: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  downloadUrl?: string;
}

export const downloaderApi = {
  startDownload: async (videoUrl: string): Promise<DownloadResponse> => {
    try {
      const response = await apiClient.post<DownloadResponse>('/download', {
        url: videoUrl,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  checkStatus: async (downloadId: string): Promise<StatusResponse> => {
    try {
      const response = await apiClient.get<StatusResponse>(
        `/status/${downloadId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
