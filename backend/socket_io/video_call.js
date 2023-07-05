"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports = function (socket, io) {
    return __awaiter(this, void 0, void 0, function* () {
        socket.on('join_room', function ({ room_id, user_id, remote_media_stream }) {
            return __awaiter(this, void 0, void 0, function* () {
                socket.join(room_id);
                io.to(room_id).emit("participant_joined_room", { user_id, remote_media_stream });
            });
        });
        socket.on("participant_joined_room", (user_id) => {
            console.log("participant joined,", user_id);
        });
    });
};
