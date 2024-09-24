import { Box, Button, Container, FormControl, Heading, Input, useToast, VStack } from "@chakra-ui/react";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createPhoto, getUploadURL, uploadImage } from "../api";

interface IForm {
    file: FileList;
}

interface IUploadURLResponse {
    id: string;
    uploadURL: string;
}

export default function UploadPhotos() {
    const { register, handleSubmit, watch, reset } = useForm<IForm>();
    const { roomPk } = useParams();
    const toast = useToast();
    const createPhotoMutation = useMutation({
        mutationFn: createPhoto,
        onSuccess: () => {
            toast({
                status: "success",
                title: "Image uploaded!",
                description: "Feel Free to upload more images.",
                isClosable: true,
            });
            reset();
        },
    });
    const uploadImageMutation = useMutation({
        mutationFn: uploadImage,
        onSuccess: ({ result }: any) => {
            if (roomPk) {
                createPhotoMutation.mutate({
                    description: "I love react",
                    file: `https://...image url${result.id}/public`,
                    roomPk,
                });
            }
        },
    });
    const uploadURLMutation = useMutation({
        mutationFn: getUploadURL,
        onSuccess: (data: IUploadURLResponse) => {
            uploadImageMutation.mutate({
                file: watch("file"),
                uploadURL: data.uploadURL,
            });
        },
    });
    useHostOnlyPage();
    const onSubmit = (data: any) => {
        uploadURLMutation.mutate();
    };

    return (
        <ProtectedPage>
            <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
                <Container>
                    <Heading textAlign={"center"}>Upload a Photo</Heading>
                    <VStack as={"form"} onSubmit={handleSubmit(onSubmit)} spacing={5} mt={10}>
                        <FormControl>
                            <Input {...register("file")} type="file" accept="image/*" />
                        </FormControl>
                        <Button
                            isLoading={
                                createPhotoMutation.isPending ||
                                uploadImageMutation.isPending ||
                                uploadURLMutation.isPending
                            }
                            type="submit"
                            w="full"
                            colorScheme={"red"}
                        >
                            Upload photos
                        </Button>
                    </VStack>
                </Container>
            </Box>
        </ProtectedPage>
    );
}
