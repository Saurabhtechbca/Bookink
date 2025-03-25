import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        error: null,
        message: null,
        user: null,
        isAuthenticated: false,
    },
    reducers: {
        registerRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        registerSuccess(state, action) {
            state.loading = false;
            state.message = action.payload.message;
        },
        registerFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        otpVerificationRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        otpVerificationSuccess(state, action) {
            state.loading = false;
            state.message = action.payload.message;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        otpVerificationFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const register = (data) => async (dispatch) => {
    dispatch(authSlice.actions.registerRequest());
    await axios
        .post("http://localhost:4000/api/v1/auth/register", data, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            dispatch(authSlice.actions.registerSuccess(res.data));
        })
        .catch((error) => {
            dispatch(authSlice.actions.registerFailed(error.response.data.message));
        });
};

export const otpVerification = (email, otp) => async (dispatch) => {
    dispatch(authSlice.actions.otpVerificationRequest());
    await axios
        .post(
            "",
            { email, otp },
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        .then((res) => {
            dispatch(authSlice.actions.otpVerificationSuccess(res.data));
        })
        .catch((error) => {
            dispatch(
                authSlice.actions.otpVerificationFailed(error.response.data.message)
            );
        });
};


