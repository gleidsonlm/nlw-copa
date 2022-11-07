import { VStack, Heading, useToast } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";
import { api } from "../services/api";


export function Find() {
    // navigate
    const { navigate } = useNavigation();
    // useState for Loading feedback
    const [isLoading, setIsLoading] = useState(false);
    // useState for storing input text
    const [code, setCode] = useState('');
    // useToast for messaging UI
    const toast = useToast();
    // handleJoinPool for users input code
    async function handleJoinPool() {
        try {
            setIsLoading(true);
            if(!code.trim()) {
                return toast.show({
                    title: "Please, enter a valid code.",
                    placement: 'top',
                    bgColor: 'yellow.500',
                })
            }
            // request POST /pools/join with group code for make authenticated user a participant.
            
            const response = await api.post('/pools/join',{ code })
                        
            //double check the success by code 201
            if(response.status === 201) {
                toast.show({
                    title: 'Welcome, the group is listed below',
                    bgColor: 'green.500',
                    placement: 'top',
                })
                // navigate the user to the my groups screen
                navigate('pools')
            }

        } catch (error:any) {
            console.log(error);

            setIsLoading(false);

            if(error.response?.status === '404') {
                // pool doesn't exist
                toast.show({
                    title: "We couldn't find an existent group for this code. \nPlease, check the code and try again.",
                    bgColor: 'red.500',
                    placement: 'top',
                })

            } else if (error.response?.status === '409') {
                // participant already in the pool
                toast.show({
                    title: "You are already in this group. \nPlease, check the code and try again.",
                    bgColor: 'red.500',
                    placement: 'top',
                })
            } else {
                toast.show({
                    title: "Ops, sorry! We couldn't get you in the group. \nPlease, check the code and try again.",
                    bgColor: 'red.500',
                    placement: 'top',
                })
            }
        }
    }

    
    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Search your group" showBackButton/>

            <VStack mt={8} mx={5} alignItems="center" >
                <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
                    Use the code to join the group and play with your friends!
                </Heading>

                <Input
                    mb={2}
                    placeholder="What's your group code?"
                    onChangeText={setCode}
                    autoCapitalize={'characters'}
                />

                <Button 
                    title="JOIN MY GROUP"
                    isLoading={isLoading}
                    onPress={handleJoinPool}
                />
            </VStack>

        </VStack>
    );
}