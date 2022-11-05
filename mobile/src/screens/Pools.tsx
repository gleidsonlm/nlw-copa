import { VStack, Icon } from "native-base";
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { Header } from "../components/Header";
import { Button } from "../components/Button";

export function Pools() {
    const { navigate } = useNavigation();

    return (
        <VStack flex={1} bgColor="gray.900">

            <Header title="My Groups" />


            <VStack mt={6} mx={5} borderBottomColor="gray.600" borderBottomWidth={1} pb={4} mb={4}>
                <Button
                    title='SEARCH GROUP BY CODE'
                    leftIcon={<Icon as ={FontAwesome} name="search" color="black" size="md"/>}
                    onPress={() => navigate('find')}
                />
            </VStack>

        </VStack>
    );
}