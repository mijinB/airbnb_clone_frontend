import { Box, Button, Grid, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";

/** Grid templateColumns의 객체 속성들
 * base : 스마트폰 크기를 위한 value (chakra는 모바일을 우선시 한다.)
 * lg : 스마트폰 크기보다 더 큰 화면을 위한 value
 */
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
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 10].map((index) => (
                <VStack key={index} alignItems={"flex-start"}>
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
            ))}
        </Grid>
    );
}
