import { Box, Button, Grid, HStack, Image, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";

interface IRoomProps {
    imageUrl: string;
    name: string;
    rating: number;
    city: string;
    country: string;
    price: number;
}

export default function Room({ imageUrl, name, rating, city, country, price }: IRoomProps) {
    const gray = useColorModeValue("gray.600", "gray.300");

    return (
        <VStack alignItems={"flex-start"}>
            <Box position={"relative"} w={"100%"} mb={3} rounded={"2xl"} overflow={"hidden"}>
                <Image h={"380"} w={"100%"} objectFit={"cover"} src={imageUrl} />
                <Button variant={"unstyled"} position={"absolute"} top={2} right={0} color={"white"}>
                    <FaRegHeart size={20} />
                </Button>
            </Box>
            <Box w={"100%"}>
                <Grid templateColumns={"8fr 1fr"} gap={2}>
                    <Text noOfLines={1} fontSize={"md"} as={"b"}>
                        {name}
                    </Text>
                    <HStack
                        _hover={{
                            color: "yellow.400",
                        }}
                        spacing={1}
                    >
                        <FaStar size={15} />
                        <Text>{rating}</Text>
                    </HStack>
                </Grid>
                <Text color={gray} fontSize={"sm"}>
                    {city}, {country}
                </Text>
            </Box>
            <Text color={gray} fontSize={"sm"}>
                <Text as={"b"}>₩{price}</Text> /night
            </Text>
        </VStack>
    );
}
