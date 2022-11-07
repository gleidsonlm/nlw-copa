import { VStack } from "native-base";
import { Header } from '../components/Header';
import { useRoute } from '@react-navigation/native';
import { api } from "../services/api";
import { useState } from "react";

interface RouteParams {
    id: string;
}

export async function Details() {
    //useState for Loading
    const [isLoading,setIsLoading] = useState(true);
    // receives pool id in the route params
    const route = useRoute();
    const { id } = route.params as RouteParams;

    // Get the pool title using api
    try {
        setIsLoading(true);
        const pool = await api.get(`/pools/${id}`)
        // data is the response data
        const { title } = pool.data;
        return title
    } catch (error) {
        console.log(error)
    } finally {
        setIsLoading(false);
    }


    return (
        <VStack flex={1} bgColor='gray.900' >
            <Header title={title} showBackButton showShareButton></Header>
        </VStack>
    )
}