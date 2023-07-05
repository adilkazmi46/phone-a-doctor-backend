"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const appointmentSchema = new Schema({
    relative_patient: {
        _id: {
            type: mongoose_1.default.Types.ObjectId,
        },
    },
    doctor: {
        _id: {
            type: mongoose_1.default.Types.ObjectId,
        },
        user_id: {
            type: mongoose_1.default.Types.ObjectId,
        },
    },
    is_prescription_written: {
        type: Boolean,
    },
    status: {
        type: String,
        enum: [
            "awaiting",
            "rejected",
            "active",
            "cancelled",
            "finished",
            "started",
        ],
    },
    prescription: {
        complains: {
            type: [String],
        },
        dygnoses: {
            type: [String],
        },
        investigation: {
            type: String,
        },
        advice: {
            type: String,
        },
        need_follow_up_consultation: {
            type: Boolean,
        },
        medicines: [
            {
                _id: {
                    type: mongoose_1.default.Types.ObjectId,
                },
                user_id: {
                    type: mongoose_1.default.Types.ObjectId,
                },
                generic_name: {
                    type: String,
                },
                brand_name: {
                    type: String,
                },
                medicineType: {
                    type: String,
                    enum: [
                        "liquid",
                        "tablet",
                        "capsule",
                        "drops",
                        "inhaler",
                        "injection",
                        "patches",
                        "implants",
                        "suppositories",
                        "topical",
                    ],
                },
                dose_frequency: {
                    type: String,
                },
                dose_duration: {
                    type: String,
                },
                duration_unit: {
                    type: String,
                    enum: [
                        "once",
                        "day",
                        "weeks",
                        "months",
                        "years",
                        "continue",
                        "not required",
                    ],
                },
                instructions: {
                    type: String,
                },
            },
        ],
    },
    patient: {
        _id: {
            type: mongoose_1.default.Types.ObjectId,
        },
        user_id: {
            type: mongoose_1.default.Types.ObjectId,
        },
    },
    slot: {
        day: {
            type: String,
        },
        date: {
            type: String,
        },
        from_slot: {
            type: String,
        },
        to_slot: {
            type: String,
        },
        from_time: {
            type: Date,
        },
        to_time: {
            type: Date,
        },
    },
});
const Appointment = mongoose_1.default.model("appointment", appointmentSchema);
exports.default = Appointment;
