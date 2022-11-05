import { useNavigation } from '@react-navigation/native';
import { Row, Text, Pressable } from 'native-base';

export function EmptyPoolList() {
  const { navigate } = useNavigation();

  return (
    <Row flexWrap="wrap" justifyContent="center">
      <Text color="white" fontSize="md" textAlign="center">
        How about to {' '}
      </Text>

      <Pressable onPress={() => navigate('find')}>
          <Text fontSize="md" textDecorationLine="underline" color="yellow.500" textDecoration="underline">
          use a code 
          </Text>
      </Pressable>

      <Text color="white" fontSize="md" textAlign="center" >
        {' '} that someone did send you, or {' '}
      </Text>

      <Pressable onPress={() => navigate('new')}>
        <Text fontSize="md" textDecorationLine="underline"  color="yellow.500">
          create a new group
        </Text>
      </Pressable>

      <Text color="white" fontSize="md" textAlign="center">
        ?
      </Text>
    </Row>
  );
}