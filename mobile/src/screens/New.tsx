import { useState } from "react";
import { VStack, Heading, Text, useToast } from "native-base";

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { api } from "../services/api";

import Logo from "../assets/logo.svg";

export function New() {
    // useToast will deliver messages for the UI
    const toast = useToast();
    // useState will store the value and changes on the title input
    const [title, setTitle] = useState("");
    // useState to change button to isLoading onPress and revert back
    const [isLoading, setIsLoading] = useState(false);
    // handles the pool create using api request
    async function handlePoolCreate(){
        // empty title input generates alert using toast
        if (!title.trim()) {
            return toast.show({
                title: 'Give a name to your group',
                placement: 'top',
                bgColor:'red.500'
            })
        }
        // TryCatch for the api request and through
        try {
            setIsLoading(true);
            const reply = await api.post('/pools', { title })
                .then(
                    response => {
                    toast.show({
                        title: `Pool created, your code is ${response.data.code}`,
                        placement: 'top',
                        bgColor: 'green.500'
                    })
                })
            setTitle('');
        } catch (error) {
            console.log(error)
            toast.show({
                title: 'Sorry, something went wrong. Please try again.',
                placement: 'top',
                bgColor:'red.500'});
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Create a new pool" />

            <VStack mt={8} mx={5} alignItems="center" >
                <Logo />

                <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
                    Create your own predictions and share with friends!
                </Heading>

                <Input mb={2} placeholder="What's your group name?"
                    onChangeText={setTitle}
                    value={title}
                />

                <Button 
                    title="CREATE MY GROUP"
                    onPress={handlePoolCreate}
                    isLoading={isLoading}
                />

                <Text color='gray.200' fontSize='sm' textAlign='center' px={10} mt={4}>
                    After creating your group, share your unique code to invite your guests.
                </Text>
            </VStack>

        </VStack>
    );
}