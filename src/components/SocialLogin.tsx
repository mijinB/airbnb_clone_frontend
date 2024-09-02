import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaComment, FaGithub } from "react-icons/fa";

export default function SocialLogin() {
    const kakaoParams = {
        client_id: "9aa992f7ff140cc3dab1c720edc2a4d8",
        redirect_uri: "http://127.0.0.1:3000/social/kakao",
        response_type: "code",
    };
    const params = new URLSearchParams(kakaoParams).toString();

    return (
        <Box mb={4}>
            <HStack my={8}>
                <Divider />
                <Text textTransform={"uppercase"} color={"gray.500"} fontSize={"xs"} as={"b"}>
                    Or
                </Text>
                <Divider />
            </HStack>
            <VStack>
                <Button
                    as="a"
                    href="https://github.com/login/oauth/authorize?client_id=Ov23livOPvsmp7aQC31e&scope=read:user,user:email"
                    leftIcon={<FaGithub />}
                    width={"100%"}
                >
                    Continue with Github
                </Button>
                <Button
                    as="a"
                    href={`https://kauth.kakao.com/oauth/authorize?${params}`}
                    leftIcon={<FaComment />}
                    width={"100%"}
                    colorScheme={"yellow"}
                >
                    Continue with Kakao
                </Button>
            </VStack>
        </Box>
    );
}
