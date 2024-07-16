import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <VStack justifyContent={"center"} minH={"100vh"} bg={"gray.100"}>
            <Heading>Page not found.</Heading>
            <Text>It seems that you're lost.</Text>
            <Link to="/">
                <Button variant={"link"} colorScheme={"red"}>
                    Go home &rarr;
                </Button>
            </Link>
        </VStack>
    );
}
