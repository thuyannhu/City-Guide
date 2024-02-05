import { CityInput } from "../inputs/City";
import { City } from "../entities/city";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class CityResolver {
  @Query(() => [City])
  async getAllCities() {
    const result = await City.find({ relations: ["pois"] });
    return result;
  }

  @Query(() => City)
  async getCityById(@Arg("id") id: number): Promise<City> {
    try {
      const result = await City.findOne({
        where: {
          id: id,
        },
        relations: { pois: true },
      });

      if (!result) {
        throw new Error(`City with ID ${id} not found`);
      }

      return result;
    } catch (err) {
      console.error("Error", err);
      throw new Error("An error occurred while reading one city");
    }
  }

  @Query(() => City)
  async getCityByName(@Arg("name") name: string): Promise<City> {
    try {
      const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
      const result = await City.findOne({
        where: {
          name: capitalizedName,
        },
        relations: { pois: true },
      });

      if (!result) {
        throw new Error(`City with name ${name} not found`);
      }

      return result;
    } catch (err) {
      console.error("Error", err);
      throw new Error("An error occurred while searching for a city by name");
    }
  }

  @Mutation(() => City)
  async createNewCity(@Arg("cityData") cityData: CityInput) {
    if (cityData.pois) {
      await City.save({
        ...cityData,
        pois: cityData.pois.map((poi) => ({ id: poi })),
      });
    } else {
      await City.save({
        ...cityData,
        pois: [],
      });
    }
  }
}
