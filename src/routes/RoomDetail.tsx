import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getRoom, getRoomReviews } from "../api";
import { IReview, IRoomDetail } from "../types";
import { Avatar, Box, Grid, GridItem, Heading, HStack, Image, Skeleton, Text, VStack } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

export default function RoomDetail() {
    const { roomPk } = useParams();
    const { isLoading: isRoomLoading, data: RoomData } = useQuery<IRoomDetail>({
        queryKey: ["rooms", roomPk],
        queryFn: getRoom,
    });
    const { isLoading: isReviewsLoading, data: reviewsData } = useQuery<IReview[]>({
        queryKey: ["rooms", roomPk, "reviews"],
        queryFn: getRoomReviews,
    });

    return (
        <Box
            mt={10}
            px={{
                base: 10,
                lg: 40,
            }}
        >
            <Skeleton isLoaded={!isRoomLoading} w={"25%"} h={"43px"}>
                <Heading>{RoomData?.name}</Heading>
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
                        <Skeleton isLoaded={!isRoomLoading} w={"100%"} h={"100%"}>
                            <Image w={"100%"} h={"100%"} objectFit={"cover"} src={RoomData?.photos[index].file} />
                        </Skeleton>
                    </GridItem>
                ))}
            </Grid>
            <HStack justifyContent={"space-between"} w={"40%"} mt={10}>
                <VStack alignItems={"flex-start"}>
                    <Skeleton isLoaded={!isRoomLoading} h={"30px"}>
                        <Heading fontSize={"2xl"}>House hosted by {RoomData?.owner.name}</Heading>
                    </Skeleton>
                    <Skeleton isLoaded={!isRoomLoading} h={"30px"}>
                        <HStack justifyContent={"flex-start"} w={"100%"}>
                            <Text>
                                {RoomData?.toilets} toliet{RoomData?.toilets === 1 ? "" : "s"}
                            </Text>
                            <Text>·</Text>
                            <Text>
                                {RoomData?.rooms} room{RoomData?.rooms === 1 ? "" : "s"}
                            </Text>
                        </HStack>
                    </Skeleton>
                </VStack>
                <Avatar src={RoomData?.owner.avatar} name={RoomData?.owner.name} size={"xl"} />
            </HStack>
            <Box mt={10}>
                <Heading fontSize={"2xl"}>
                    <HStack>
                        <FaStar />
                        <Text>{RoomData?.rating}</Text>
                        <Text>·</Text>
                        <Text>
                            {reviewsData?.length} Review{reviewsData?.length === 1 ? "" : "s"}
                        </Text>
                    </HStack>
                </Heading>
            </Box>
        </Box>
    );
}
