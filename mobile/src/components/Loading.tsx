import { Center, Spinner } from 'native-base';

export function Loading() {
    return (
    <Center bg='gray.900'>
      <Spinner size='sm' color='yellow.500' />
    </Center>
    )
}