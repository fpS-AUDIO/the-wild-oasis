import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  // to get the access to the 'QueryClient' instance you can use 'useQueryClient()' hook
  const queryClient = useQueryClient();

  // useMutation() custom React Query Hook allows to make mutation on remote state and it accepts

  // useMutation() also returns:
  // - 'isLoading' state flag
  // - 'mutate' callback function which can be connected to a button for example

  //  useMutation() accepts an object with:
  // - 'mutationFn' is the function which the React Query will call

  const { isLoading: isLoadingDeleting, mutate } = useMutation({
    // with only this option the mutation will work but it won't trigger any UI updating
    mutationFn: function (id) {
      // calls the imported deleteCabin() function
      return deleteCabin(id);
    },

    // this tell React Query what to do as soon as the mutation was successful
    onSuccess: function () {
      // to update the UI just refetch the data
      // to easly refetch the data in React Query you can just invalidate the cache
      // you need to call 'invalidateQueries()' on the 'QueryClient' returned from 'new QueryClient({...})' in App.js
      // to get the access to the 'QueryClient' instance you can use 'useQueryClient()' hook
      // in 'invalidateQueries' you need to tell which query you want to invalidate, so insert the 'queryKey' specified in 'useQuery()'
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },

    // there is also error handler
    onError: function (err) {
      // this error handler recieve the error thrown inside the deleteCabin() function
      // do something with this error
      alert(err.message);
    },
  });

  return (
    <TableRow>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      {/* using 'mutate' function returned from useMutation() */}
      <button onClick={() => mutate(id)} disabled={isLoadingDeleting}>
        Delete
      </button>
    </TableRow>
  );
}

export default CabinRow;
