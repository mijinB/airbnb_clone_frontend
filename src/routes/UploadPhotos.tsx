import { Box, Button, Container, FormControl, Heading, Input, VStack } from "@chakra-ui/react";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { getUploadURL, uploadImage } from "../api";

interface IForm {
    file: FileList;
}

interface IUploadURLResponse {
    id: string;
    uploadURL: string;
}

export default function UploadPhotos() {
    const { register, handleSubmit, watch } = useForm<IForm>();
    const uploadImageMutation = useMutation({
        mutationFn: uploadImage,
        onSuccess: (data: any) => {
            console.log(data);
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
    const { roomPk } = useParams();
    const onSubmit = (data: any) => {
        uploadURLMutation.mutate();
    };
    useHostOnlyPage();

    return (
        <ProtectedPage>
            <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
                <Container>
                    <Heading textAlign={"center"}>Upload a Photo</Heading>
                    <VStack as={"form"} onSubmit={handleSubmit(onSubmit)} spacing={5} mt={10}>
                        <FormControl>
                            <Input {...register("file")} type="file" accept="image/*" />
                        </FormControl>
                        <Button type="submit" w="full" colorScheme={"red"}>
                            Upload photos
                        </Button>
                    </VStack>
                </Container>
            </Box>
        </ProtectedPage>
    );
}
