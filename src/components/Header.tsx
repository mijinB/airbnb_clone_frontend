import {
    Box,
    Button,
    HStack,
    IconButton,
    LightMode,
    useColorMode,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { Link } from "react-router-dom";

export default function Header() {
    const { isOpen: isLoginOpen, onClose: onLoginClose, onOpen: onLoginOpen } = useDisclosure();
    const { isOpen: isSignUpOpen, onClose: onSignUpClose, onOpen: onSignUpOpen } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const logoColor = useColorModeValue("red.500", "red.200");
    // color는 상관없지만, 컴포넌트는 대문자로 시작해야된다.
    const Icon = useColorModeValue(FaMoon, FaSun);

    return (
        <HStack justifyContent={"space-between"} py={5} px={10} borderBottomWidth={1}>
            <Box color={logoColor}>
                <Link to={"/"}>
                    <FaAirbnb size={"48"} />
                </Link>
            </Box>
            <HStack spacing={"2.5px"}>
                <IconButton
                    onClick={toggleColorMode}
                    variant={"ghost"}
                    aria-label={"Toggle dark mode"}
                    icon={<Icon />}
                />
                <Button onClick={onLoginOpen}>Log in</Button>
                {/** dark mode일 때, 자동으로 연한 색상으로 변경해주는데 그냥 light mode일 때의 색상을 유지하고 싶다면 LightMode 태그 사용 */}
                <LightMode>
                    <Button onClick={onSignUpOpen} colorScheme={"red"}>
                        Sign up
                    </Button>
                </LightMode>
            </HStack>
            <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
        </HStack>
    );
}
