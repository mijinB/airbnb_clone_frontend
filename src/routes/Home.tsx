import { Box, Grid, Skeleton, SkeletonText } from "@chakra-ui/react";
import Room from "../components/Room";

export default function Home() {
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
            <Box>
                <Skeleton h={380} mb={7} rounded={"2xl"} />
                <SkeletonText noOfLines={2} w={"50%"} mb={6} spacing={3} />
                <SkeletonText noOfLines={1} w={"20%"} />
            </Box>
            <Room />
        </Grid>
    );
}
