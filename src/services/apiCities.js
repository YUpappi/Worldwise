import supabase from "./supabase";

async function requireUserId() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  if (!data?.user?.id) throw new Error("You must be logged in.");
  return data.user.id;
}

function mapCityRow(row) {
  if (!row) return row;
  const lat = row.lat ?? row.position?.lat ?? null;
  const lng = row.lng ?? row.position?.lng ?? null;

  return {
    ...row,
    position: {
      lat,
      lng,
    },
  };
}

export const getCities = async () => {
  const userId = await requireUserId();
  const { data: cities, error } = await supabase
    .from("cities")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return (cities || []).map(mapCityRow);
};

export const getCity = async (id) => {
  const userId = await requireUserId();
  const { data: city, error } = await supabase
    .from("cities")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return mapCityRow(city);
};

export const createCity = async (newCity) => {
  const userId = await requireUserId();
  const { position, ...rest } = newCity || {};
  const lat = Number(position?.lat ?? newCity?.lat);
  const lng = Number(position?.lng ?? newCity?.lng);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    throw new Error("Latitude and longitude are required.");
  }

  const payload = {
    ...rest,
    user_id: userId,
    lat,
    lng,
  };

  const { data: city, error } = await supabase
    .from("cities")
    .insert([payload])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return mapCityRow(city);
};

export const deleteCity = async (id) => {
  const userId = await requireUserId();
  const { error } = await supabase
    .from("cities")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }
};
