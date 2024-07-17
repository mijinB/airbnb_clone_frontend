import { Box, Button, Grid, HStack, Image, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";

export default function Room() {
    const gray = useColorModeValue("gray.600", "gray.300");

    return (
        <VStack alignItems={"flex-start"}>
            <Box position={"relative"} w={"100%"} mb={3} rounded={"2xl"} overflow={"hidden"}>
                <Image
                    h={"380"}
                    w={"100%"}
                    objectFit={"cover"}
                    src="https://a0.muscache.com/im/pictures/13ee20e4-8255-4e9b-9252-cf5146fc4599.jpg?im_w=720"
                />
                <Button variant={"unstyled"} position={"absolute"} top={2} right={0} color={"white"}>
                    <FaRegHeart size={20} />
                </Button>
            </Box>
            <Box w={"100%"}>
                <Grid templateColumns={"8fr 1fr"} gap={2}>
                    <Text noOfLines={1} fontSize={"md"} as={"b"}>
                        Calaca, 필리핀의 통나무집 전체
                    </Text>
                    <HStack
                        _hover={{
                            color: "yellow.400",
                        }}
                        spacing={1}
                    >
                        <FaStar size={15} />
                        <Text>5.0</Text>
                    </HStack>
                </Grid>
                <Text color={gray} fontSize={"sm"}>
                    서울
                </Text>
            </Box>
            <Text color={gray} fontSize={"sm"}>
                <Text as={"b"}>₩689,666</Text> /박
            </Text>
        </VStack>
    );
}
