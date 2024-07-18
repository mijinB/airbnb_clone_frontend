import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getRoom } from "../api";
import { IRoomDetail } from "../types";
import { Box, Grid, GridItem, Heading, Image, Skeleton } from "@chakra-ui/react";

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
        </Box>
    );
}
