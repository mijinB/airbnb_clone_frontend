import { Grid } from "@chakra-ui/react";
import Room from "../components/Room";
import RoomSkeleton from "../components/RoomSkeleton";
import { getRooms } from "../api";
import { useQuery } from "@tanstack/react-query";
import { IRoomList } from "../types";

export default function Home() {
    // useQuery( ["캐싱되는 key 값"], fetch하는 함수 )
    const { isLoading, data } = useQuery<IRoomList[]>({ queryKey: ["rooms"], queryFn: getRooms });

    return (
        <Grid
            templateColumns={{
                sm: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
                xl: "repeat(4, 1fr)",
                "2xl": "repeat(5, 1fr)",
            }}
            columnGap={4}
            rowGap={8}
            mt={10}
            px={{
                base: 10,
                lg: 40,
            }}
        >
            {isLoading ? <RoomSkeleton /> : null}
            {data?.map((room) => (
                <Room
                    key={room.pk}
                    pk={room.pk}
                    imageUrl={room.photos[0].file}
                    name={room.name}
                    rating={room.rating}
                    city={room.city}
                    country={room.country}
                    price={room.price}
                />
            ))}
        </Grid>
    );
}
