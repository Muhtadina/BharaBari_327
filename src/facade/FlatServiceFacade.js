// Facade -> FlatServiceFacade.js
import supabase from "../config/SupabaseClient.js";

class FlatServiceFacade {
  async createFlat(flatData, images) {
    const client = supabase.getClient();

    const { data: flat } = await client.from("flats").insert(flatData).select();

    for (let img of images) {
      await client.storage.from("flat-images").upload(img.name, img);
    }

    return flat;
  }
}

export default new FlatServiceFacade();
