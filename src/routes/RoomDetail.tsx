import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getRoom } from "../api";
import { IRoomDetail } from "../types";
import { Avatar, Box, Grid, GridItem, Heading, HStack, Image, Skeleton, Text, VStack } from "@chakra-ui/react";

export default function RoomDetail() {
    const { roomPk } = useParams();
    const { isLoading, data } = useQuery<IRoomDetail>({ queryKey: ["rooms", roomPk], queryFn: getRoom });

    return (
        <Box
            mt={10}
            px={{
                base: 10,
                lg: 40,
            }}
        >
            <Skeleton isLoaded={!isLoading} w={"25%"} h={"43px"}>
                <Heading>{data?.name}</Heading>
            </Skeleton>
            <Grid
                templateColumns={"repeat(4, 1fr)"}
                templateRows={"repeat(2, 1fr)"}
                gap={2}
                h={"60vh"}
                mt={8}
                rounded={"xl"}
                overflow={"hidden"}
            >
                {[0, 1, 2, 3, 4].map((index) => (
                    <GridItem
                        key={index}
                        colSpan={index === 0 ? 2 : 1}
                        rowSpan={index === 0 ? 2 : 1}
                        overflow={"hidden"}
                    >
                        <Skeleton isLoaded={!isLoading} w={"100%"} h={"100%"}>
                            <Image w={"100%"} h={"100%"} objectFit={"cover"} src={data?.photos[index].file} />
                        </Skeleton>
                    </GridItem>
                ))}
            </Grid>
            <HStack justifyContent={"space-between"} w={"40%"} mt={10}>
                <VStack alignItems={"flex-start"}>
                    <Skeleton isLoaded={!isLoading} h={"30px"}>
                        <Heading fontSize={"2xl"}>House hosted by {data?.owner.name}</Heading>
                    </Skeleton>
                    <Skeleton isLoaded={!isLoading} h={"30px"}>
                        <HStack justifyContent={"flex-start"} w={"100%"}>
                            <Text>
                                {data?.toilets} toliet{data?.toilets === 1 ? "" : "s"}
                            </Text>
                            <Text>·</Text>
                            <Text>
                                {data?.rooms} room{data?.rooms === 1 ? "" : "s"}
                            </Text>
                        </HStack>
                    </Skeleton>
                </VStack>
                <Avatar src={data?.owner.avatar} name={data?.owner.name} size={"xl"} />
            </HStack>
        </Box>
    );
}
