import { Text, Center, Icon } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

import Logo from '../assets/logo.svg';

import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth';

export function SignIn() {
    const { signIn, user } = useAuth();
    console.log(user);
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
            />

            <Text color='white' textAlign='center' mt={4}>
                We'll not use any other information {'\n'}than your email for the registration.
            </Text>

{/*             <Text color='lightYellow.100' mt={40}>
                Already have an account?
                &nbsp;<Text color='cyan' fontSize={16} fontFamily='heading'>Sign In</Text>
                &nbsp;or <Text color='cyan' fontSize={16} fontFamily='heading'>Register.</Text>
            </Text>
 */}
         </Center>
    )
}