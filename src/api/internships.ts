import { supabase } from "../db";
import { QueryFilter } from "./../interfaces";

export async function internships(filters: QueryFilter) {
  let query = supabase.from("internships").select("*");

  if (filters.company) query = query.eq("company", filters.company);
  if (filters.role) query = query.eq("role", filters.role);
  if (filters.citizenship) query = query.eq("citizenship", filters.citizenship);
  if (filters.sponsorship) query = query.eq("sponsorship", filters.sponsorship);
  if (filters.open) query = query.eq("open", filters.open);

  const { data, error } = await query;

  if (error) throw new Error("Error fetching internships");
  return data;
}
