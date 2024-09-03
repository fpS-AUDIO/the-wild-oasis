import toast from "react-hot-toast";
import supabase, { supabaseUrl } from "./supabase";

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

export async function createCabin(newCabin) {
  // creatin unique image name
  // also remove slashes (/) so supabase won't create folders...
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");

  // creatin image path
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // creating cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([
      {
        ...newCabin,
        image: imagePath,
      },
    ])
    .select();

  //   check for errors
  if (error) {
    console.log(error);
    throw new Error(`Can't insert the new cabin...`);
  }

  //  upload image (if there wasn't errors)
  // need to specify image, image name and path to the bucket
  const { error: storageError } = await supabase.storage
    // from bucket name
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // prevent the creation of cabin if file is not uploaded correctly
  // so delete cabin if 'storageError'
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    throw new Error(
      "cabin image could not be uploaded so the cabin was not created"
    );

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
