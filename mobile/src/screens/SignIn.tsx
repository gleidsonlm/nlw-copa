import { Text, Center, Icon } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

import Logo from '../assets/logo.svg';

import { Button } from '../components/Button'

export function SignIn() {
    return (
        <Center flex={1} bgColor='gray.900' >
            {/* <Text color='white' fontSize={24} fontFamily='heading' >SignIn</Text> */}
            <Logo width={212} height={40} />

            <Button
                title='Sign in with Google'
                leftIcon={
                    <Icon as={FontAwesome} name="google" color="white" size="md" />
                }
            />
        </Center>
    )
}