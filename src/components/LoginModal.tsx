import { useForm } from "react-hook-form";
import {
    Box,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    VStack,
} from "@chakra-ui/react";
import { FaUserNinja, FaLock } from "react-icons/fa";
import SocialLogin from "./SocialLogin";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface IForm {
    username: string;
    password: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IForm>();
    const onSubmit = (data: IForm) => {
        console.log(data);
    };
    console.log(errors);

    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Log in</ModalHeader>
                <ModalCloseButton />
                <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                    <VStack>
                        <InputGroup>
                            <InputLeftElement
                                children={
                                    <Box color={"gray.500"}>
                                        <FaUserNinja />
                                    </Box>
                                }
                            />
                            <Input
                                {...register("username", { required: "Please write a username" })}
                                isInvalid={Boolean(errors.username?.message)}
                                variant={"filled"}
                                placeholder="Username"
                            />
                            <Text fontSize={"sm"} color={"red.500"}>
                                {errors.username?.message}
                            </Text>
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement
                                children={
                                    <Box color={"gray.500"}>
                                        <FaLock />
                                    </Box>
                                }
                            />
                            <Input
                                {...register("password", { required: "Please write a password" })}
                                isInvalid={Boolean(errors.password?.message)}
                                type="password"
                                variant={"filled"}
                                placeholder="Password"
                            />
                            <Text fontSize={"sm"} color={"red.500"}>
                                {errors.password?.message}
                            </Text>
                        </InputGroup>
                    </VStack>
                    <Button type="submit" mt={4} width={"100%"} colorScheme={"red"}>
                        Log in
                    </Button>
                    <SocialLogin />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
