"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const doctorSchema = new Schema({
    title: {
        type: String,
        enum: ["dr", "consultant", "professor"],
    },
    about: {
        type: String,
    },
    is_personal_profile_created: {
        type: Boolean,
    },
    is_professional_profile_created: {
        type: Boolean,
    },
    likes: {
        type: [Schema.Types.ObjectId],
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    degree: {
        type: String,
    },
    institute: {
        type: String,
    },
    chamberORhospitalAddress: {
        type: String,
    },
    medical_certificate: {
        url: {
            type: String,
        },
        key: {
            type: String,
        },
        name: {
            type: String,
        },
        certificate_number: {
            type: String,
        },
    },
    gov_id: {
        gov_id_number: {
            type: String,
        },
        gov_id_front: {
            url: {
                type: String,
            },
            key: {
                type: String,
            },
            name: {
                type: String,
            },
        },
        gov_id_back: {
            url: {
                type: String,
            },
            key: {
                type: String,
            },
            name: {
                type: String,
            },
        },
    },
    medical_field: {
        type: String,
    },
    medical_speciality: {
        type: String,
    },
    experience: {
        type: Number,
    },
    is_24_7: {
        type: String,
    },
    consultation_fee: {
        type: Number,
    },
    follow_up_fee: {
        type: Number,
    },
    is_availability_details_completed: {
        type: Boolean,
    },
    availability: {
        available_days: {
            type: Array,
        },
        slots: {
            from: {
                type: String,
            },
            to: {
                type: String,
            },
        },
    },
    is_bank_details_completed: {
        type: Boolean,
    },
    bank_details: {
        name: {
            type: String,
        },
        address: {
            type: String,
        },
        branch: {
            type: String,
        },
        swift_code: {
            type: String,
        },
        account_holder_name: {
            type: String,
        },
        account_number: {
            type: String,
        },
        mobile_account: {
            type: String,
        },
    },
});
const Doctor = mongoose_1.default.model("doctor", doctorSchema);
exports.default = Doctor;
