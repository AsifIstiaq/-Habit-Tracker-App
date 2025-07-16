import { AuthProvider, useAuth } from "@/lib/auth-context";
import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const { user, isLoadingUser } = useAuth();
  const segment = useSegments();

  useEffect(() => {
    setTimeout(() => {
      const isAuthGroup = segment[0] === "auth";
      if (!user && !isAuthGroup && !isLoadingUser) {
        router.replace("/auth");
      } else if (user && isAuthGroup && !isLoadingUser) {
        router.replace("/");
      }
    }, 1000);
  }, [user, segment, isLoadingUser, router]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <AuthProvider>
        <PaperProvider>
          <SafeAreaProvider>
            <RouteGuard>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              </Stack>
            </RouteGuard>
          </SafeAreaProvider>
        </PaperProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
