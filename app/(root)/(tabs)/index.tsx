import {
  Button,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import { Card, FeatureCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import { useGlobalContext } from "@/app/lib/global-provider";
import { useAppwrite } from "@/app/lib/useAppwrite";
import { getLatestProperties, getProperties } from "@/app/lib/appwrite";
import { useEffect } from "react";

export default function Index() {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({
      fn: getLatestProperties,
    });
  const {
    data: properties,
    refetch,
    loading,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
    skip: true,
  });

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    });
  }, [params.filter, params.query]);

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={[properties]}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.toString()}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="size-12 rounded-full"
              />
              <View className="flex-1 flex-col items-start ml-2 justify-center">
                <Text className="text-xs font-rubik text-black-100">
                  Good morning
                </Text>
                <Text className="text-base font-rubik-medium text-black-300">
                  {user?.name}
                </Text>
              </View>
              <Image source={icons.bell} className="size-6" />
            </View>
            <Search />
            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold">Featured</Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-semibold text-primary-300">
                    See all
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={[latestProperties]}
                renderItem={({ item }) => (
                  <FeatureCard
                    item={item}
                    onPress={() => handleCardPress(item.$id)}
                  />
                )}
                keyExtractor={(item) => item.toString()}
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="flex gap-5 mt-5"
              />
            </View>
            <View className="flex flex-row items-center justify-between mt-2">
              <Text className="text-xl font-rubik-bold">Our recomendation</Text>
              <TouchableOpacity>
                <Text className="text-base font-rubik-semibold text-primary-300">
                  See all
                </Text>
              </TouchableOpacity>
            </View>
            <Filters />
          </View>
        }
      />
    </SafeAreaView>
  );
}
