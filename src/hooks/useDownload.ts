import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { downloaderApi } from '../api/downloader';

export const useDownload = () => {
  const [downloadId, setDownloadId] = useState<string | null>(null);

  // 1. Mutación para iniciar la descarga
  const startDownloadMutation = useMutation({
    mutationFn: (url: string) => downloaderApi.startDownload(url),
    onSuccess: (data) => {
      setDownloadId(data.downloadId);
    },
  });

  // 2. Query para rastrear el estado (solo se activa si tenemos un ID)
  const statusQuery = useQuery({
    queryKey: ['downloadStatus', downloadId],
    queryFn: () => downloaderApi.checkStatus(downloadId!),
    enabled: !!downloadId, // Solo corre si downloadId no es null
    refetchInterval: (query) => {
      // Si ya terminó o falló, dejamos de preguntar (polling)
      const status = query.state.data?.status;
      return status === 'COMPLETED' || status === 'FAILED' ? false : 3000;
    },
  });

  return {
    startDownload: startDownloadMutation.mutate,
    isStarting: startDownloadMutation.isPending,
    status: statusQuery.data?.status || 'IDLE',
    downloadUrl: statusQuery.data?.downloadUrl,
    error: startDownloadMutation.error || statusQuery.error,
  };
};
