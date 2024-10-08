import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../calendar.css";
import type { Value as Date } from "react-calendar/dist/cjs/shared/types";
import { checkBooking, getRoom, getRoomReviews } from "../api";
import { IReview, IRoomDetail } from "../types";
import {
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    GridItem,
    Heading,
    HStack,
    Image,
    Skeleton,
    Text,
    VStack,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { Helmet } from "react-helmet";

export default function RoomDetail() {
    const { roomPk } = useParams();
    const { isLoading: isRoomLoading, data: RoomData } = useQuery<IRoomDetail>({
        queryKey: ["rooms", roomPk],
        queryFn: getRoom,
    });
    const { data: reviewsData } = useQuery<IReview[]>({
        queryKey: ["rooms", roomPk, "reviews"],
        queryFn: getRoomReviews,
    });
    const [dates, setDates] = useState<Date>();
    const { data: checkBookingData, isLoading: isCheckingBooking } = useQuery({
        queryKey: ["check", roomPk, dates],
        queryFn: checkBooking,
        enabled: dates !== undefined,
    });

    return (
        <Box
            mt={10}
            px={{
                base: 10,
                lg: 40,
            }}
        >
            <Helmet>
                <title>{RoomData ? RoomData.name : "Loading..."}</title>
            </Helmet>
            <Skeleton isLoaded={!isRoomLoading} w={"25%"}>
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
                            {RoomData?.photos && RoomData.photos.length > 0 ? (
                                <Image w={"100%"} h={"100%"} objectFit={"cover"} src={RoomData?.photos[index].file} />
                            ) : null}
                        </Skeleton>
                    </GridItem>
                ))}
            </Grid>
            <Grid gap={20} templateColumns={"2fr 1fr"} w="100%" mb={40}>
                <Box>
                    <HStack justifyContent={"space-between"} mt={10}>
                        <VStack alignItems={"flex-start"}>
                            <Skeleton isLoaded={!isRoomLoading} height={"30px"}>
                                <Heading fontSize={"2xl"}>House hosted by {RoomData?.owner.name}</Heading>
                            </Skeleton>
                            <Skeleton isLoaded={!isRoomLoading} height={"30px"}>
                                <HStack justifyContent={"flex-start"} w="100%">
                                    <Text>
                                        {RoomData?.toilets} toilet{RoomData?.toilets === 1 ? "" : "s"}
                                    </Text>
                                    <Text>ㆍ</Text>
                                    <Text>
                                        {RoomData?.rooms} rooms{RoomData?.rooms === 1 ? "" : "s"}
                                    </Text>
                                </HStack>
                            </Skeleton>
                        </VStack>
                        <Avatar src={RoomData?.owner.avatar} name={RoomData?.owner.name} size={"xl"} />
                    </HStack>
                    <Box mt={10}>
                        <Heading mb={5} fontSize={"2xl"}>
                            <HStack>
                                <FaStar />
                                <Text>{RoomData?.rating}</Text>
                                <Text>ㆍ</Text>
                                <Text>
                                    {reviewsData?.length} review
                                    {reviewsData?.length === 1 ? "" : "s"}
                                </Text>
                            </HStack>
                        </Heading>
                        <Container mt={16} maxW="container.lg" marginX={"none"}>
                            <Grid gap={10} templateColumns={"1fr 1fr"}>
                                {reviewsData?.map((review, index) => (
                                    <VStack key={index} alignItems={"flex-start"}>
                                        <HStack>
                                            <Avatar src={review.user.avatar} name={review.user.name} size={"md"} />
                                            <VStack spacing={0} alignItems={"flex-start"}>
                                                <Heading fontSize={"md"}>{review.user.name}</Heading>
                                                <HStack spacing={1}>
                                                    <FaStar size={"12px"} />
                                                    <Text>{review.rating}</Text>
                                                </HStack>
                                            </VStack>
                                        </HStack>
                                        <Text>{review.payload}</Text>
                                    </VStack>
                                ))}
                            </Grid>
                        </Container>
                    </Box>
                </Box>
                <Box pt={10}>
                    <Calendar
                        goToRangeStartOnSelect
                        onChange={(v) => setDates(v)}
                        prev2Label={null}
                        next2Label={null}
                        minDetail="month"
                        minDate={new Date()}
                        maxDate={new Date(Date.now() + 60 * 60 * 24 * 7 * 4 * 6 * 1000)}
                        selectRange
                    />
                    <Button
                        isLoading={isCheckingBooking && dates !== undefined}
                        isDisabled={!checkBookingData?.ok}
                        w="100%"
                        mt={5}
                        colorScheme={"red"}
                    >
                        Make booking
                    </Button>
                    {!isCheckingBooking && !checkBookingData?.ok ? (
                        <Text color={"red.500"}>Can't book on those dates, sorry</Text>
                    ) : null}
                </Box>
            </Grid>
        </Box>
    );
}
