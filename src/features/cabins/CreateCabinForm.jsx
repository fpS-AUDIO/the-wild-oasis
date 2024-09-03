import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  // useForm() hook is from react-hook-form library
  // 1.   Need to register all input fields with register()
  //      register() works like this: {...register("id")}
  // 2.   Add the to <Form/>  handleSubmit()
  //      handleSubmit() should be called with your own handle submit custom function
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  // formState (from useForm() hook) contains all errors properties
  const { errors } = formState;

  // get access to client
  const queryClient = useQueryClient();

  // useMutation to update remote state with React Query
  const { mutate, isLoading: isLoadingCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin is created");

      // invalidate data so the parent component will refatch the data and show the update data
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });

      // reset the form in the end of success
      reset();
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  function onSubmit(formData) {
    // console.log(formData);
    mutate({
      ...formData,

      image: formData.image[0],
    });
  }

  // this error handler function recieves errors
  function onError(errors) {
    // console.log(errors);
    return;
  }

  // If there is an error during submitting the form the 'handleSubmit' won't call the 'onSubmit'
  // but it will call the error hander function wi pass a seconda argument which we called 'onError'

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        {/* 'register' function accepts and object as second argument for validation */}
        <Input
          type="text"
          id="name"
          disabled={isLoadingCreating}
          {...register("name", {
            required: "This field is required",
            min: {
              value: 1,
              // message in case validation fails
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isLoadingCreating}
          {...register("maxCapacity", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isLoadingCreating}
          {...register("regularPrice", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isLoadingCreating}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",

            // 'validate' accepts the custom callback validation function to validate the input field
            // this callback takes an argument which is currently being input in the field
            // if it returns true the field is validated

            // 'getValues' (from useForm() hook) returns an object withh all the values from the form
            validate: (currentValue) =>
              currentValue < getValues().regularPrice ||
              "Discount should be less that regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isLoadingCreating}
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.name?.message}>
        <FileInput
          id="image"
          accept="image/*"
          // type="file" (fixed in styled component)
          {...register("image", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoadingCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
