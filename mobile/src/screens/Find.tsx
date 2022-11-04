import { VStack, Heading } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function Find() {
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
                />

                <Button 
                    title="JOIN MY GROUP"
                />
            </VStack>

        </VStack>
    );
}