import { useCallback, useEffect, useState } from "react";
import { VStack, Icon, useToast, FlatList } from "native-base";
import { FontAwesome } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { PoolCard, PoolCardProps } from "../components/PoolCard";
import { Loading } from "../components/Loading";
import { EmptyPoolList } from "../components/EmptyPoolList";

import { api } from "../services/api";

export function Pools() {
    // useState for storing PoolCards objects in an array
    const [pools, setPools] = useState<PoolCardProps[]>([]);
    // useState for check if is loading
    const [isLoading, setIsLoading] = useState(true);
    // useToast will deliver messages for the UI
    const toast = useToast();
    // useNavigation bottom tabs
    const { navigate } = useNavigation();

    // request Pools from authenticated user 
    async function fetchPools() {
        try {
            setIsLoading(true);
            const response = await api.get('/pools');
            setPools(response.data);
        } catch (error) {
            console.log(error)
            toast.show({
                title: "Sorry, couldn't get your groups. Please, try again.",
                placement: 'top',
                bgColor: 'red.500'
            })
        } finally {
            setIsLoading(false)
        }
    }

    // callback function when screen is on focus
    useFocusEffect(useCallback(() => {
        fetchPools();
    },[]))


/*     useEffect(() => {
        fetchPools();
    },[]);
 */    

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

            { isLoading ? <Loading /> :
                <FlatList
                data={pools}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <PoolCard
                        data={item}
                        onPress={() => navigate('details', { id: item.id })}
                    />
                )}
                px={5}
                showsVerticalScrollIndicator={false}
                _contentContainerStyle={{ pb: 10 }}
                ListEmptyComponent={() => <EmptyPoolList />}
                />
             }

        </VStack>
    );
}