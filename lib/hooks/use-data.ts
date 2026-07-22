import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { Collection } from '@/types';

export function useData<T>(collection: Collection) {
  return useQuery<T[]>({
    queryKey: [collection],
    queryFn: () => api.get<T>(collection),
  });
}

export function useCreateData<T>(collection: Collection) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<T>) => api.insert<T>(collection, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [collection] });
    },
  });
}

export function useUpdateData<T>(collection: Collection) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<T> }) =>
      api.update<T>(collection, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [collection] });
    },
  });
}

export function useDeleteData(collection: Collection) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.delete(collection, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [collection] });
    },
  });
}
