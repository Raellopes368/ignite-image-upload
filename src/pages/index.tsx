import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface ImageData {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface Response {
  data: ImageData[];
  after?: number;
}

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    ({ pageParam = null }) =>
      api.get<Response>('/api/images', {
        params: {
          after: pageParam,
        },
      }),
    {
      getNextPageParam: response => response?.data.after || null,
    }
  );

  const formattedData = useMemo(() => {
    return data?.pages.reduce<ImageData[]>((acc, value) => {
      return [...acc, ...value.data.data];
    }, []);
  }, [data]);

  if (isLoading) return <Loading />;

  if (isError) return <Error />;

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button
            colorScheme="orange"
            onClick={() => fetchNextPage()}
            isLoading={isFetchingNextPage}
          >
            Carregar mais
          </Button>
        )}
      </Box>
    </>
  );
}
