import { FlatList, useToast } from 'native-base';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { EmptyMyPoolList } from './EmptyMyPoolList';
import { Game, GameProps } from './Game';
import { Loading } from './Loading';

interface Props {
  poolId: string;
  code: string;
  onShare: () => void;
}

export function Guesses({ poolId, code, onShare }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  // useState sets and stores Team Points to create prediction
  const [firstTeamPoints, setFirstTeamPoints] = useState('');
  const [secondTeamPoints, setSecondTeamPoints] = useState('');
  // type Game from component
  const [games, setGames] = useState<GameProps[]>([]);
  // useToast will deliver messages for the UI
  const toast = useToast();

  async function fetchGames() {
    try {
      setIsLoading(true);
      const response = await api.get(`/pools/${poolId}/games`);
      setGames(response.data.games);
    } catch (err) {
      console.log(err);
      toast.show({
        title:
        "Sorry, coun't retrive matchs clientInformation. Please, try again.",
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function hangleGuessConfirm(gameId: string) {
    if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
      return toast.show({
        title: 'Please, write your prediction score.',
        placement: 'top',
        bgColor: 'red.500',
      });
   } 

    try {
      setIsLoading(true);
      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      });

      toast.show({
        title: 'Palpite enviado com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      });

    // callback reloads the screen with updated data
      fetchGames();

    } catch (err) {
      console.log(err);
      toast.show({
        title:
        "Ops, sorry. We couldn't register your prediction. Please, try again",
        placement: 'top',
        bgColor: 'red.500',
      });

    } finally {
      setIsLoading(false);
    }
  }
  // callback when screen render complete
  useEffect(() => { fetchGames(); }
  // screen reloads on useState { poolId }
    ,[poolId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => hangleGuessConfirm(item.id)}
        />
      )}
      _contentContainerStyle={{ pb: 10 }}
      ListEmptyComponent={() => (
      <EmptyMyPoolList code={code} onShare={onShare} />
      )}
    />
  );
}