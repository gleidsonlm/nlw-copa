import { VStack, Heading, Text, Icon } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import Logo from "../assets/logo.svg";
import { ButtonIcon } from "../components/ButtonIcon";
import { FontAwesome } from '@expo/vector-icons'

export function Pools() {
    return (
        <VStack flex={1} bgColor="gray.900">

            <Header title="My Groups" />


            <VStack mt={6} mx={5} borderBottomColor="gray.600" borderBottomWidth={1} pb={4} mb={4}>
                <Button
                    title='SEARCH GROUP BY CODE'
                    leftIcon={<Icon as ={FontAwesome} name="search" color="black" size="md"/>}
                />
            </VStack>

        </VStack>
    );
}