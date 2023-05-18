/* eslint-disable react/jsx-no-bind */
import { Grid, GridItem, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [imgUrlSelected, setImgUrlSelected] = useState('');

  function handleSelectImage(imgUrl: string): void {
    setImgUrlSelected(imgUrl);
    onOpen();
  }

  return (
    <>
      <Grid templateColumns="repeat(5, 1fr)" gap="4">
        {cards.map(card => (
          <GridItem key={card.id} w="240px" h="168px">
            <Card data={card} viewImage={handleSelectImage} />
          </GridItem>
        ))}
      </Grid>

      <ModalViewImage
        isOpen={isOpen}
        imgUrl={imgUrlSelected}
        onClose={onClose}
      />
    </>
  );
}
