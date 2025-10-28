import React from "react";
import HotUpdate from "react-native-ota-hot-update";
import { requestUpdateBundle } from "./api";
import { Alert, LayoutAnimation } from "react-native";
import ReactNativeBlobUtil from "react-native-blob-util";

// Custom hook to check for and apply OTA updates
export const useUpdateVersion = () => {
    const [progress, setProgress] = React.useState(0);
    // Function to start downloading and applying the update bundle
    const startUpdateBundle = (url: string, version: number) => {
        HotUpdate.downloadBundleUri(ReactNativeBlobUtil, url, version, {
            updateSuccess: () => {
                // Restart the app to apply the update immediately
                HotUpdate.resetApp();
            },
            updateFail: () => {
                // Log or show a message for update failure
            },
            restartAfterInstall: true, // Automatically restart the app after installing the update
            progress: (received: any, total: any) => {
                const percent = Math.round((+received / +total) * 100);
                // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setProgress(percent);
            },
        });
    };

    // Function to check for updates by querying the CMS
    const checkUpdate = async () => {
        const bundle = await requestUpdateBundle();
        const currentVersion = await HotUpdate.getCurrentVersion();

        if (bundle?.data?.length) {
            // Filter the latest enabled bundle from the response
            const [itemVersion] = bundle.data.filter((item: { enable: any; }) => item.enable);
            const latestVersion = itemVersion?.id || 0; // Use the bundle ID as the version number

            // console.log("item", itemVersion)

            if (latestVersion > currentVersion) {
                // Prompt the user to update the app
                Alert.alert(
                    "New version available!",
                    "A new version has been released. Please update.",
                    [
                        { text: "Cancel", style: "cancel" },
                        {
                            text: "Update",
                            onPress: () =>
                                startUpdateBundle(
                                    `https://codePush.vnfite.com.vn${itemVersion?.bundle[0]?.url}`,
                                    latestVersion
                                ),
                        },
                    ]
                );
            }
        }
    };

    React.useEffect(() => {
        if (!__DEV__) {
            // Automatically check for updates when the app starts in production mode
            checkUpdate();
        }
    }, []);
    return {
        data: {
            checkUpdate,
            state: {
                progress
            }
        }
    }
};