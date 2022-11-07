import { useRoute } from "@react-navigation/native";
import { HStack, useToast, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Share } from "react-native";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Guesses } from "../components/Guesses";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { Option } from "../components/Option";
import { PoolCardProps } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { api } from "../services/api";

interface RouteParams {
    id: string;
}

export function Details() {
    // setState to store poolDetails from api 
    const [poolDetails, setPoolDetails] = useState<PoolCardProps>();
    // setState to show Loading while working
    const [isLoading, setIsLoading] = useState(true);
    // Screen tab showing either the guesses or the ranking
    const [optionSelected, setOptionSelected] = useState<"guesses" | "ranking">("guesses");
    // useRoute will receive pool id in route params
    const route = useRoute();
    const { id } = route.params as RouteParams;
    // toast to deliver messages to UI
    const toast = useToast();
    
async function fetchPoolDetails() {
    try {
        setIsLoading(true);
        const response = await api.get(`/pools/${id}`);
        setPoolDetails(response.data.pool);
    } catch (err) {
        console.log(err);
        toast.show({
            title:
            "Sorry, couldn't get your group details. Please, try again.",
            placement: "top",
            bgColor: "red.500",
        });
    } finally {
        setIsLoading(false);
    }
}

// callback for sharing the group code
async function handleCodeShare() {
    await Share.share({
        message: poolDetails.code,
    });
}

// callback when the screen is redered
useEffect(() => { fetchPoolDetails(); }
    // Route params { id } state will refresh page when different pools are selected
    ,[id]);

if (isLoading) {
    return <Loading />;
}

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header
                title={poolDetails.title}
                showBackButton={true}
                showShareButton
                onShare={handleCodeShare}
                />
            {poolDetails._count?.participants > 0 ? (
                <VStack px={5} flex={1}>

                    <PoolHeader data={poolDetails} />

                    <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
                        <Option
                        title="Your predictions"
                        isSelected={optionSelected === "guesses"}
                        onPress={() => setOptionSelected("guesses")}
                        />
                        <Option
                        title="This group ranking"
                        isSelected={optionSelected === "ranking"}
                        onPress={() => setOptionSelected("ranking")}
                        />
                    </HStack>

                    <Guesses
                        poolId={poolDetails.id}
                        code={poolDetails.code}
                        onShare={handleCodeShare}
                    />
                </VStack>
            ) : (
                <EmptyMyPoolList code={poolDetails.code} onShare={handleCodeShare} />
            )}
        </VStack>
    );
}