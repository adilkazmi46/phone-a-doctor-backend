"use strict";
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
require("react-native-gesture-handler");
const root_1 = __importDefault(require("./routes/root"));
require("react-native-gesture-handler");
const react_native_splash_screen_1 = __importDefault(require("react-native-splash-screen"));
const loadingContext_1 = __importDefault(require("@contexts/loadingContext"));
const redux_1 = require("redux");
const root_2 = __importDefault(require("@reducers/root"));
const react_redux_1 = require("react-redux");
const App = () => {
    const store = (0, redux_1.createStore)(root_2.default);
    (0, react_1.useEffect)(() => {
        react_native_splash_screen_1.default.hide();
        react_native_1.LogBox.ignoreLogs([
            "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
        ]);
    }, []);
    return (<react_redux_1.Provider store={store}>
      <react_native_1.KeyboardAvoidingView behavior="height" style={{ flex: 1 }} enabled={true}>
        <react_native_1.StatusBar barStyle={'dark-content'} translucent={true} backgroundColor="transparent"/>
        <loadingContext_1.default>
          <root_1.default />
        </loadingContext_1.default>
      </react_native_1.KeyboardAvoidingView>
    </react_redux_1.Provider>);
};
const styles = react_native_1.StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        margin: 0,
        padding: 0,
        flex: 1,
    },
});
exports.default = App;
