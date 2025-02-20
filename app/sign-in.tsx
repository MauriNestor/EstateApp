import {
  View,
  Text,
  ScrollView,
  Image,
  Touchable,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { login } from "@/app/lib/appwrite";
import { useGlobalContext } from "@/app/lib/global-provider";
import { Redirect } from "expo-router";

const SignIn = () => {
  const { refetch, loading, isLogged } = useGlobalContext();
  if (!loading && isLogged) return <Redirect href="/" />;

  const handleLogin = async () => {
    const result = await login();
    if (result) {
      refetch();
    } else {
      Alert.alert("Failed to login");
    }
  };
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        ></Image>
        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            bienvenidos a la NotAirbnb
          </Text>
          <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
            Hagamos realidad tu {`\n`}
            <Text className="text-primary-300">viaje soñado</Text>
          </Text>
          <Text className="text-lg font font-rubik text-black-200 text-center mt-12">
            Ingresar con Google
          </Text>
          <TouchableOpacity
            onPress={handleLogin}
            className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
          >
            <View className="flex flex-row items-center justify-center">
              <Image
                source={icons.google}
                className="w-5 h-5"
                resizeMode="contain"
              ></Image>
              <Text className="text-lg font-rubik-medium text-black-300 ml-4">
                Continuar con Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
