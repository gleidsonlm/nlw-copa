import { Text, Center, Icon } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

import Logo from '../assets/logo.svg';

import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth';

export function SignIn() {
    const { signIn, isUserLoading } = useAuth();
    
    return (
        <Center flex={1} bgColor='gray.900' p={7} >
            {/* <Text color='white' fontSize={24} fontFamily='heading' >SignIn</Text> */}
            <Logo width={212} height={40} />

            <Button
                mt={12}
                title='Sign in with Google'
                leftIcon={ <Icon as={FontAwesome} name="google" color="white" size="xl" /> }
                type='SECONDARY'
                onPress={signIn}
                isLoading={isUserLoading}
                _loading={{_spinner: {color: 'white'}}}
            />

            <Text color='white' textAlign='center' mt={4}>
                We'll not use any other information {'\n'}than your email for the registration.
            </Text>

         </Center>
    )
}