import { Box, HStack, Skeleton } from "@chakra-ui/react";

export default function RoomSkeleton() {
    return (
        <Box>
            <Skeleton h={"380px"} mb={7} rounded={"2xl"} />
            <HStack justifyContent={"space-between"} mb={2}>
                <Skeleton w={"60%"} h={3} rounded={"lg"} />
                <Skeleton w={"15%"} h={3} rounded={"lg"} />
            </HStack>
            <Skeleton w={"20%"} h={3} mb={4} rounded={"lg"} />
            <Skeleton w={"25%"} h={3} rounded={"lg"} />
        </Box>
    );
}
