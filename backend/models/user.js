"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
    },
    is_verified: {
        type: Boolean,
    },
    otp: {
        type: String,
    },
    userType: {
        enum: ["doctor", "patient", "admin"],
        type: String,
        required: true,
    },
    stripe_account: {
        account: {
            type: mongoose_1.default.Schema.Types.Mixed,
        },
        is_verified: {
            type: Boolean,
        },
    },
    password: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
    full_name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["male", "female"],
    },
    language: {
        type: String,
    },
    city: {
        type: String,
    },
    area: {
        type: String,
    },
    address: {
        type: String,
    },
    dob: {
        type: String,
    },
    division: {
        type: String,
    },
    country: {
        type: String,
    },
    timezone: {
        code: {
            type: String,
        },
        utc: {
            type: String,
        },
    },
    is_profile_created: {
        type: Boolean,
    },
    is_information_completed: {
        type: Boolean,
    },
    forgot_password_otp: {
        type: String,
    },
    verified_forgot_password_otp: {
        type: Boolean,
    },
    profile_pic: {
        url: {
            type: String,
        },
        name: {
            type: String,
        },
    },
    payment_details: {
        setupIntent: {
            type: mongoose_1.default.Schema.Types.Mixed,
        },
        ephemeralKey: {
            type: mongoose_1.default.Schema.Types.Mixed,
        },
        customer: {
            type: mongoose_1.default.Schema.Types.Mixed,
        },
        label: {
            type: String,
        },
        image: {
            type: String,
        },
        is_payment_sheet_completed: {
            type: Boolean,
        },
    },
    patient: {
        name: {
            type: String,
        },
        weight: {
            type: Number,
        },
        height: {
            ft: {
                type: Number,
            },
            inches: {
                type: Number,
            },
        },
        dob: {
            type: String,
        },
        bloodGroup: {
            type: String,
            enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        },
        is_under_doctor_care: {
            type: Boolean,
        },
        diseases_or_conditions: {
            type: Array,
        },
    },
    relative_patients: [
        {
            full_name: {
                type: String,
            },
            gender: {
                type: String,
                enum: ["male", "female"],
            },
            weight: {
                type: Number,
            },
            height: {
                ft: {
                    type: Number,
                },
                inches: {
                    type: Number,
                },
            },
            dob: {
                type: String,
            },
            bloodGroup: {
                type: String,
                enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
            },
            is_under_doctor_care: {
                type: Boolean,
            },
            diseases_or_conditions: {
                type: Array,
            },
        },
    ],
    doctor: {
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
        medical_category: {
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
    },
});
const User = mongoose_1.default.model("user", userSchema);
exports.default = User;
