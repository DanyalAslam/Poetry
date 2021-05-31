echo ".....Patching for admob......."
cp admob/build.gradle ../node_modules/react-native-admob/android/build.gradle
echo ".....Patch completed......."


echo ".....Patching for rbsheet......."
cp RBSheet/index.js ../node_modules/react-native-raw-bottom-sheet/src/index.js
echo ".....Patch completed......."
