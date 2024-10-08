import { Box, Button, Grid, HStack, Image, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { FaCamera, FaRegHeart, FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

interface IRoomProps {
    pk: number;
    imageUrl: string;
    name: string;
    rating: number;
    city: string;
    country: string;
    price: number;
    isOwner: boolean;
}

export default function Room({ pk, imageUrl, name, rating, city, country, price, isOwner }: IRoomProps) {
    const gray = useColorModeValue("gray.600", "gray.300");
    const navigate = useNavigate();
    const onCameraClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate(`/rooms/${pk}/photos`);
    };

    return (
        <Link to={`/rooms/${pk}`}>
            <VStack alignItems={"flex-start"}>
                <Box position={"relative"} w={"100%"} mb={3} rounded={"2xl"} overflow={"hidden"}>
                    <Image h={"380"} w={"100%"} objectFit={"cover"} src={imageUrl} />
                    <Button
                        onClick={onCameraClick}
                        variant={"unstyled"}
                        position={"absolute"}
                        top={2}
                        right={0}
                        color={"white"}
                    >
                        {isOwner ? <FaCamera size={20} /> : <FaRegHeart size={20} />}
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
        </Link>
    );
}
