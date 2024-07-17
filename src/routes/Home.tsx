import { Box, Grid, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

export default function Home() {
    return (
        <Grid templateColumns={"repeat(5, 1fr)"} columnGap={4} rowGap={8} mt={10} px={40}>
            <VStack alignItems={"flex-start"}>
                <Box w={"100%"} mb={3} rounded={"3xl"} overflow={"hidden"}>
                    <Image
                        h={"380"}
                        w={"100%"}
                        objectFit={"cover"}
                        src="https://a0.muscache.com/im/pictures/13ee20e4-8255-4e9b-9252-cf5146fc4599.jpg?im_w=720"
                    />
                </Box>
                <Box w={"100%"}>
                    <Grid templateColumns={"8fr 1fr"} gap={2}>
                        <Text noOfLines={1} fontSize={"md"} as={"b"}>
                            Calaca, 필리핀의 통나무집 전체
                        </Text>
                        <HStack spacing={1}>
                            <FaStar size={15} />
                            <Text>5.0</Text>
                        </HStack>
                    </Grid>
                    <Text color={"gray.600"} fontSize={"sm"}>
                        서울
                    </Text>
                </Box>
                <Text color={"gray.600"} fontSize={"sm"}>
                    <Text as={"b"}>₩689,666</Text> /박
                </Text>
            </VStack>
        </Grid>
    );
}
