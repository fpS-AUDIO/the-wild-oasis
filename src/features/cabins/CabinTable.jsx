import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";

/* eslint-disable */
const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  /* useQuery() custom React Query hook
  useQuery() accpets an object with 2 things:
    1. queryKey is identifier of that query and it can be an array with a string (or complex array)
      queryKey identifies each query and also you can see it in dev tools
    2. queryFn is the function to make query (fetch data from API).
      This function must return a promise like fetch()
  */
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: [`cabins`],
    queryFn: getCabins,
  });

  // console.log(x); returns a lot of states, but we destructure only some of them like isLoading, status is also important.

  if (isLoading) return <Spinner />;

  // role is just to make html more accessible
  return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>
      {cabins.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))}
    </Table>
  );
}

export default CabinTable;
