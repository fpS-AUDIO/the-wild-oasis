import supabase from "./supabase";

export async function getCabins() {
  // from supabase clients creating query using from() method
  //   specify name of table and the fields
  //   this returns a promise which is awaited
  const { data, error } = await supabase.from("cabins").select("*");

  //   check for errors
  if (error) {
    console.log(error);
    throw new Error(`Can't load the cabins data...`);
  }

  //   if everything is ok return data
  return data;
}

// REMEMBER to check the row level security rules
export async function deleteCabin(id) {
  // code generated with Supabase API Docs
  // takes supabase client
  // selects "cabins" table
  //  deletes from there
  // where the id column is equal to passed in id
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  //   check for errors
  if (error) {
    console.log(error);
    throw new Error(`Can't delete the cabin...`);
  }

  //   if everything is ok return data
  return data;
}
