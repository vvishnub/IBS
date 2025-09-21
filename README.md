# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Getting Started

### 1. Clone the repo

\`\`\`bash
git clone https://github.com/your-username/myshoplite.git
cd myshoplite
\`\`\`

### 2. Install dependencies

\`\`\`bash
npm install
\`\`\`

This installs:

- React Native core packages
- Expo Router and navigation
- Reanimated and gesture handler
- Vector icons and theming
- Testing libraries

### 3. Run the app

#### iOS

\`\`\`bash
npx expo run:ios
\`\`\`

#### Android

\`\`\`bash
npx expo run:android
\`\`\`

#### Web (for layout testing only)

\`\`\`bash
npm run web
\`\`\`

> Deep linking via \`ibscart://\` does **not** work in Expo Go or Web. You must use a development build.

---

## Deep Linking

### URI Format

\`\`\`
ibscart://product/:id
\`\`\`

Example:

\`\`\`
ibscart://product/1
\`\`\`

### Test Deep Link

\`\`\`bash
npx uri-scheme open ibscart://product/1 --ios
npx uri-scheme open ibscart://product/1 --android
\`\`\`

> Make sure the app is installed and opened at least once before testing.

---

## Sharing

Native share logic is located in \`utils/shareProduct.ts\`.

\`\`\`ts
shareProduct(product);
\`\`\`

This shares:

- Product name
- Deep link (\`ibscart://product/:id\`)


## Technical Decisions & Architecture

### State Management

- Local state via React hooks
- Persistent state via AsyncStorage
- No external state libraries for simplicity

### Component Architecture

- Split into reusable atomic components
- Screens use ViewModel + Logic hooks for separation of concerns

###  Data Persistence

- Favorites and cart stored in AsyncStorage
- Future-ready for backend integration

### ⚡ Performance

- Lazy loading of screens
- Reanimated for smooth animations
- Avoids nested VirtualizedLists

###  Security

- No sensitive data stored locally
- URI scheme avoids exposing user data
- Ready for auth integration


In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
