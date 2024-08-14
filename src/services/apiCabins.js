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
