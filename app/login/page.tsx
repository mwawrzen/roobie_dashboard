"use client";

import { useActionState } from "react";
import { loginAction } from "../actions/auth";

export default function LoginPage() {
  const [ state, formAction, isPending ]= useActionState( loginAction, null );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form action={ formAction } className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign in</h1>
        <div className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded text-black"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded text-black"
            required
          />
        </div>
        {
          state?.error&&
          <p className="text-red-500 text-sm mt-4">{ state.error }</p>
        }
        <button
          disabled={ isPending }
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded mt-6 hover:bg-blue-700 disabled:bg-blue-300"
        >
          { isPending? "Singing in...": "Sign in" }
        </button>
      </form>
    </div>
  );
};
