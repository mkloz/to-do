import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

export const queryClient = new QueryClient();

function AppProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}> {children} </QueryClientProvider>
  );
}
export default AppProvider;
