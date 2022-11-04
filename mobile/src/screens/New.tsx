import { VStack, Heading, Text } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import Logo from "../assets/logo.svg";

export function New() {
    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Create a new pool" />

            <VStack mt={8} mx={5} alignItems="center" >
                <Logo />

                <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
                    Create your own predictions and share with friends!
                </Heading>

                <Input
                    mb={2}
                    placeholder="What's your group name?"
                />

                <Button 
                    title="CREATE MY GROUP"
                />

                <Text color='gray.200' fontSize='sm' textAlign='center' px={10} mt={4}>
                    After creating your group, share your unique code to invite your guests.
                </Text>
            </VStack>

        </VStack>
    );
}