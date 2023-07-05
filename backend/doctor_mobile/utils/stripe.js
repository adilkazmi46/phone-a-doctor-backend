"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_URL = void 0;
const react_native_1 = require("react-native");
exports.API_URL = react_native_1.Platform.OS === 'android' ? 'http://10.0.2.2:4242' : 'http://127.0.0.1:4242';
